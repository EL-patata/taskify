import { asyncMap } from 'convex-helpers';
import {
	getManyVia,
	getAll,
	getManyFrom,
} from 'convex-helpers/server/relationships';
import { v } from 'convex/values';
import { Doc, Id, TableNames } from './_generated/dataModel';
import { DatabaseReader, query } from './_generated/server';
import { getUser } from './users';

export const getUserBoards = query({
	args: {},
	async handler(ctx) {
		const user = await getUser({ ...ctx }, {});

		const unfilteredBoards = await ctx.db
			.query('boards_users')
			.filter((q) => q.eq(q.field('userId'), user?._id))
			.collect();

		const boards = await getAll(
			ctx.db,
			unfilteredBoards.map((board) => board.boardId)
		);

		return { boards };
	},
});

export const getLists = query({
	args: { id: v.id('boards') },
	async handler(ctx, args) {
		const lists = await ctx.db
			.query('lists')
			.filter((q) => q.eq(q.field('boardId'), args.id))
			.collect();

		let cards: {
			listId: Id<'lists'>;
			cards: {
				_id: Id<'cards'>;
				_creationTime: number;
				title: string;
				authorId: Id<'users'>;
				description: string;
				order: number;
				listId: Id<'lists'>;
			}[];
		}[] = [];

		for (let i = 0; i < lists?.length; i++) {
			const result = await ctx.db
				.query('cards')
				.filter((q) => q.eq(q.field('listId'), lists[i]._id))
				.collect();

			cards.push({
				listId: lists[i]?._id,
				cards: result.sort((c1, c2) => c1.order - c2.order),
			});
		}

		return { lists, cards };
	},
});
