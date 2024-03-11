import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getUser } from './users';
import { getAll } from 'convex-helpers/server/relationships';

export const getMessages = query({
	args: { boardId: v.id('boards') },
	async handler(ctx, args) {
		const messages = await ctx.db
			.query('messages')
			.filter((q) => q.eq(q.field('boardId'), args.boardId))
			.order('desc')
			.collect();

		let fullMessages = [];

		for (let i = 0; i < messages.length; i++) {
			const author = await ctx.db.get(messages[i].authorId);

			fullMessages.push({ author, message: messages[i] });
		}

		return fullMessages;
	},
});

export const addMessage = mutation({
	args: { text: v.string(), boardId: v.id('boards') },
	async handler(ctx, args) {
		const user = await getUser(ctx, {});
		return await ctx.db.insert('messages', {
			authorId: user?._id!,
			boardId: args.boardId,
			text: args.text,
		});
	},
});
