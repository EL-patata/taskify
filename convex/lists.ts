import { v } from 'convex/values';
import { mutation } from './_generated/server';
import { getUser } from './users';

export const createList = mutation({
	args: { title: v.string(), boardId: v.id('boards') },
	async handler(ctx, args) {
		const user = await getUser({ ...ctx }, {});

		const authorId = user?._id!;

		const { boardId, title } = args;

		return await ctx.db.insert('lists', { authorId, boardId, title });
	},
});
