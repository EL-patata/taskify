'use client';
import { useQuery } from 'convex/react';
import { Id } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import Card from './Card';
import CreateCard from './CreateCard';

type Props = {
	title: string;
	boardId: Id<'boards'>;
	listId: Id<'lists'>;
	children?: React.ReactNode;
};

const List = ({ boardId, listId, title, children }: Props) => {
	const cards = useQuery(api.cards.getCards, { listId });

	return (
		<Droppable key={listId} droppableId={`${listId}`}>
			{(provided, snapshot) => (
				<ScrollArea
					ref={provided.innerRef}
					className={cn(
						'bg-gradient-to-br from-accent/50 to-background/20 w-72 flex gap-3 mx-2 p-5 rounded',
						snapshot.isDraggingOver && 'bg-accent/70'
					)}
					{...provided.droppableProps}
				>
					<h2 className="text-sm mb-2 font-semibold">{title}</h2>
					{cards
						?.sort((c1, c2) => c1.order - c2.order)
						.map((item, index) => (
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
											snapshot.isDragging && 'bg-primary'
										)}
									>
										{item.title}
									</div>
								)}
							</Draggable>
						))}
					{snapshot.isDraggingOver ? null : (
						<CreateCard order={8888} boardId={boardId} listId={listId} />
					)}
				</ScrollArea>
			)}
		</Droppable>
	);
};

export default List;
