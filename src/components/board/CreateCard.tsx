'use client';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from 'convex/react';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
	listId: Id<'lists'>;
	boardId: Id<'boards'>;
	order: number;
};

const CreateCard = ({ listId, boardId, order }: Props) => {
	const mutate = useMutation(api.cards.createCard);

	const [isOpen, setIsOpen] = useState(false);

	useQuery(api.boards.getLists, { id: boardId });

	const formSchema = z.object({
		title: z.string().min(3, {
			message: 'title must be at least 3 characters.',
		}),
		description: z.string().min(6, {
			message: 'description must be at least 6 characters.',
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
		},
	});

	async function onSubmit({ title, description }: z.infer<typeof formSchema>) {
		return await mutate({ boardId, listId, title, description, order }).then(
			() => {
				form.reset();
			}
		);
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					onClick={() => setIsOpen(true)}
					variant={'outline'}
					className="w-full"
				>
					Add a card <Plus />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="min-h-[70vh] px-8 mx-auto lg:w-1/2">
				<DrawerHeader>
					<DrawerTitle>Add a card</DrawerTitle>
					<DrawerDescription>
						Create a new card to this board for you to add more todo cards.
					</DrawerDescription>
				</DrawerHeader>
				<form
					{...form}
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid gap-4"
				>
					<Label htmlFor="title" className="w-full flex items-center">
						Title{' '}
						<p className="ml-auto text-rose-500">
							{form.formState.errors.title?.message || ''}
						</p>
					</Label>
					<Input
						{...form.register('title')}
						id="title"
						name="title"
						placeholder="Title"
						className={cn(
							form.formState.errors.title && 'outline outline-rose-500'
						)}
					/>
					<Label htmlFor="description" className="w-full flex items-center">
						Description{' '}
						<p className="ml-auto text-rose-500">
							{form.formState.errors.description?.message || ''}
						</p>
					</Label>
					<Textarea
						{...form.register('description')}
						id="description"
						name="description"
						placeholder="Add a card to todos"
						className={cn(
							'resize-none',
							form.formState.errors.description && 'outline outline-rose-500'
						)}
					/>
					<Button type="submit" className="lg:w-72 max-w-72 mx-auto">
						Add card
					</Button>
				</form>
			</DrawerContent>
		</Drawer>
	);
};

export default CreateCard;
