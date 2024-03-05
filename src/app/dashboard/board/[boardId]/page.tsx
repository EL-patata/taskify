import { fetchQuery } from 'convex/nextjs';
import Board from '@/components/board/Board';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

type Props = {
	params: {
		[key: string]: string | string[] | undefined;
	};
};

const page = async ({ params }: Props) => {
	const id = params.boardId as string;

	const lists = await fetchQuery(api.boards.getLists, {
		id: id as Id<'boards'>,
	});

	let cards: any = [];

	for (let i = 0; i < lists.length; i++) {
		const result = await fetchQuery(api.lists.getCards, {
			id: lists[i]._id as Id<'lists'>,
		});

		cards.push({ listId: lists[i]._id, cards: result });
	}

	return (
		<>
			<Board lists={lists} listCards={cards} />
		</>
	);
};

export default page;
