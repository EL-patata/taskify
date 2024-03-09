'use client';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Id } from '../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

type Props = {
	boardId: Id<'boards'>;
};

const CreateList = ({ boardId }: Props) => {
	const mutate = useMutation(api.lists.createList);

	const formSchema = z.object({
		title: z.string().min(3, {
			message: 'title must be at least 3 characters.',
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
		},
	});

	function onSubmit({ title }: z.infer<typeof formSchema>) {
		return mutate({ boardId, title });
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant={'outline'} className="w-72">
					Add a list <Plus />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="min-h-[70vh] px-8 mx-auto lg:w-1/2">
				<DrawerHeader>
					<DrawerTitle>Add a list</DrawerTitle>
					<DrawerDescription>
						Create a new list to this board for you to add more todo cards.
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
						placeholder="Done todos list"
						className={cn(
							form.formState.errors.title && 'outline outline-rose-500'
						)}
					/>
					<Button type="submit" className="lg:w-72 max-w-72 mx-auto">
						Add list
					</Button>
				</form>
			</DrawerContent>
		</Drawer>
	);
};

export default CreateList;
