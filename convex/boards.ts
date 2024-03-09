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
		return await ctx.db
			.query('lists')
			.filter((q) => q.eq(q.field('boardId'), args.id))
			.collect();
	},
});
