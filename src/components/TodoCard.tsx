'use client';

import { cn } from '@/lib/utils';
import { Draggable } from '@hello-pangea/dnd';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

type Props = {
	createdAt: number;
	title: number;
	index: number;
};

const TodoCard = ({ title, index, createdAt }: Props) => {
	return (
		<Draggable draggableId={`${createdAt}-card`} key={createdAt} index={index}>
			{(provided, snapshot) => (
				<li
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className={cn(
						`bg-background flex justify-between  max-h-9 items-center border p-2 rounded-lg z-50`,
						snapshot.isDragging ? 'border-primary static' : 'border-accent'
					)}
				>
					<p className="flex-1 overflow-hidden text-ellipsis">{title}</p>
					<Button size={`icon`} className="w-6 h-6 rounded-full">
						<Menu className="w-5 h-5 text-black" />
					</Button>
				</li>
			)}
		</Draggable>
	);
};

export default TodoCard;
