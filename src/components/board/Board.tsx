'use client';
import { cn } from '@/lib/utils';
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from '@hello-pangea/dnd';
import { useMutation, useQuery } from 'convex/react';
import { useEffect, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import CreateCard from './CreateCard';
import CreateList from './CreateList';
import { Button } from '../ui/button';
import List from './List';

type Card = {
	_id: Id<'cards'>;
	_creationTime: number;
	title: string;
	authorId: Id<'users'>;
	description: string;
	order: number;
	listId: Id<'lists'>;
};

type Props = {
	lists?:
		| {
				_id: Id<'lists'>;
				_creationTime: number;
				boardId: Id<'boards'>;
				title: string;
				authorId: Id<'users'>;
		  }[]
		| undefined;
	listCards?: [{ listId: string; cards: Card[] }];
	boardId: Id<'boards'>;
};

const reorder = (list: any, startIndex: any, endIndex: any) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

/**
 * Moves an item from one list to another list.
 */

export default function Board({ boardId, listCards: state }: Props) {
	const query = useQuery(api.boards.getLists, { id: boardId });

	const lists = query?.lists;

	const mutate = useMutation(api.cards.updateList);

	function onDragEnd(result: DropResult) {
		let newOrderedData = [...state!];
		const { source, destination } = result;
		if (!destination) {
			return;
		}
		const destId = destination.droppableId!;

		const srcId = source.droppableId;

		// Source and destination list
		const sourceList = newOrderedData.find((list) => list.listId === srcId);
		const destList = newOrderedData.find((list) => list.listId === destId);

		if (!sourceList || !destList) {
			return;
		}

		// Check if cards exists on the sourceList
		if (!sourceList.cards) {
			sourceList.cards = [];
		}

		// Check if cards exists on the destList
		if (!destList.cards) {
			destList.cards = [];
		}

		// Moving the card in the same list
		if (srcId === destId) {
			const reorderedCards = reorder(
				sourceList.cards,
				source.index,
				destination.index
			) as Card[];

			reorderedCards.forEach((card, index) => {
				card.order = index;
				mutate({ cardId: card._id, listId: card.listId, order: card.order });
			});

			sourceList.cards = reorderedCards;

			// setState(newOrderedData as any);

			console.log(newOrderedData);

			// User moves the card to another list
		} else {
			// Remove card from the source list
			const [movedCard] = sourceList.cards.splice(source.index, 1);

			// Assign the new listId to the moved card
			movedCard.listId = destId as any;

			// Add card to the destination list
			destList.cards.splice(destination.index, 0, movedCard);

			sourceList.cards.forEach((card, index) => {
				card.order = index;
				mutate({ cardId: card._id, listId: card.listId, order: card.order });
			});

			for (let i = 0; i < sourceList.cards.length; i++) {
				mutate({
					cardId: sourceList.cards[i]._id,
					listId: sourceList.cards[i].listId,
					order: i,
				});
			}

			// Update the order for each card in the destination list
			destList.cards.forEach((card, index) => {
				card.order = index;
				mutate({ cardId: card._id, listId: card.listId, order: card.order });
			});

			// setState(newOrderedData as any);

			console.log(movedCard.order);
		}
	}

	return (
		<ScrollArea>
			<div className="flex flex-row p-4 w-full h-screen">
				<DragDropContext onDragEnd={onDragEnd}>
					{lists?.map((list) => (
						<List
							key={list._id}
							boardId={list.boardId}
							listId={list._id}
							title={list.title}
						/>
					))}
					<CreateList boardId={boardId} />
				</DragDropContext>
			</div>

			<ScrollBar orientation="horizontal" className="bg-accent/20 p-1" />
		</ScrollArea>
	);
}
