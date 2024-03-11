'use client';
import { Draggable } from '@hello-pangea/dnd';
import React from 'react';
import { Id } from '../../../convex/_generated/dataModel';
import { cn } from '@/lib/utils';

type Props = { id: Id<'cards'>; index: number; title: string };

const Card = ({ id, index, title }: Props) => {
	return (
		<Draggable key={id} draggableId={`${id}`} index={index}>
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
					{title}
				</div>
			)}
		</Draggable>
	);
};

export default Card;
