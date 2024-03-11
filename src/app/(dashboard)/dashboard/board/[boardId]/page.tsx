import Board from '@/components/board/Board';
import { fetchQuery } from 'convex/nextjs';
import { api } from '../../../../../../convex/_generated/api';

type Props = {
	params: {
		[key: string]: string | string[] | undefined;
	};
};

export const dynamic = 'force-dynamic';

const page = async ({ params }: Props) => {
	const id = params.boardId as string;

	const query = await fetchQuery(api.cards.getLists, { id: id as any });

	let cardLists = [];

	if (query.lists) {
		for (let i = 0; i < query.lists.length; i++) {
			const listId = query.lists?.at(i)?._id!;
			const boardId = query.lists?.at(i)?.boardId!;
			const cards = await fetchQuery(api.cards.getCards, { listId });

			cardLists.push({ listId, cards: cards });
		}
	}

	return (
		<>
			<Board boardId={id as any} listCards={query.cards as any} />
		</>
	);
};

export default page;
