'use client';
import { cn } from '@/lib/utils';
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from '@hello-pangea/dnd';
import { useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

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
	lists:
		| {
				_id: Id<'lists'>;
				_creationTime: number;
				boardId: Id<'boards'>;
				title: string;
				authorId: Id<'users'>;
		  }[]
		| undefined;
	listCards: [{ listId: string; cards: Card[] }];
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
const move = (
	source: any,
	destination: any,
	droppableSource: any,
	droppableDestination: any
) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {} as any;
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

export default function Board({ listCards, lists }: Props) {
	const [state, setState] = useState<typeof listCards>(listCards);

	const mutate = useMutation(api.cards.updateList);

	function onDragEnd(result: DropResult) {
		let newOrderedData = [...state];
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

			setState(newOrderedData as any);

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

			setState(newOrderedData as any);

			console.log(movedCard.order);
		}
	}

	return (
		<ScrollArea color="#ff0000">
			<div className="flex flex-row p-4 w-full h-screen">
				<DragDropContext onDragEnd={onDragEnd}>
					{lists?.map((list, index) => (
						<Droppable key={list._id} droppableId={`${list._id}`}>
							{(provided, snapshot) => (
								<ScrollArea
									ref={provided.innerRef}
									className={cn(
										'bg-gradient-to-br from-accent/50 to-background/20 min-w-72 flex gap-3 mx-2 p-5 rounded',
										snapshot.isDraggingOver && 'bg-accent/70'
									)}
									{...provided.droppableProps}
								>
									<h2 className="text-sm mb-2 font-semibold">{list.title}</h2>
									{state[index]?.cards.map((item, index) => (
										<Draggable
											key={item._id}
											draggableId={`${item._id}`}
											index={index}
										>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													className={cn(
														'p-4 rounded-md bg-background my-1.5',
														snapshot.isDragging && 'bg-lime-600'
													)}
												>
													<div
														style={{
															display: 'flex',
															gap: '4px',
														}}
													>
														{item.title}
													</div>
												</div>
											)}
										</Draggable>
									))}
									{snapshot.isDraggingOver ? null : (
										<Button variant={'outline'} className="w-full gap-1.5">
											Add a Card <Plus />
										</Button>
									)}
								</ScrollArea>
							)}
						</Droppable>
					))}
					<Button variant={'outline'} className="gap-1.5 w-72">
						Add a List <Plus />
					</Button>
				</DragDropContext>
			</div>
			<ScrollBar
				orientation="horizontal"
				className="bg-accent/20 p-1 text-red-500"
			/>
		</ScrollArea>
	);
}
