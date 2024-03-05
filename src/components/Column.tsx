'use client';
import TodoCard from '@/components/TodoCard';
import { cn } from '@/lib/utils';
import { Droppable } from '@hello-pangea/dnd';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '../../convex/_generated/api';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

type Todo = {
	createdAt: number;
	createdBy: string;
	description: string;
	title: string;
};

type Props = { id: string; title: string; items: Todo[]; index: number };

const Column = ({ id, title, items, index }: Props) => {
	const params = useParams();

	const boardId = params.boardId as string;

	// const addTodo = useMutation(api.columns.addTodo);

	// function handleAddTodo() {
	// 	addTodo({ title: 'hi', description: 'hello', id: id as any });
	// }

	return (
		<section className="p-2 min-w-72 max-w-72 bg-secondary/50 mb-3 flex flex-col rounded">
			<h2 className="text-lg font-semibold p-1">{title}</h2>
			<Droppable droppableId={`${id}`} key={id}>
				{(provided, snapshot) => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className={cn(
							'   transition-all flex flex-col flex-1 gap-2 p-2 relative',
							snapshot.isDraggingOver ? 'todo-column' : null
						)}
					>
						{items?.map((item, index) => (
							<>
								<TodoCard
									createdAt={item.createdAt}
									key={item.createdAt}
									index={index}
									title={item.title as any}
								/>
							</>
						))}
						<Button
							variant={'outline'}
							className="gap-2"
							// onClick={handleAddTodo}
						>
							<Plus />
							Add new todo
							{}
						</Button>
					</ol>
				)}
			</Droppable>
		</section>
	);
};

export default Column;
