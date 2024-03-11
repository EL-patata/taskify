import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	users: defineTable({
		userId: v.string(),
		email: v.string(),
		userName: v.string(),
		image: v.optional(v.string()),
	}).index('by_userId', ['userId']),

	boards: defineTable({
		title: v.string(),
		imageUrl: v.string(),
		authorId: v.id('users'),
	}),

	boards_users: defineTable({
		boardId: v.id('boards'),
		userId: v.id('users'),
		role: v.union(v.literal('ADMIN'), v.literal('USER'), v.literal('CREATOR')),
	})
		.index('by_userId', ['userId'])
		.index('by_boardId', ['boardId']),

	lists: defineTable({
		title: v.string(),
		boardId: v.id('boards'),
		authorId: v.id('users'),
	}),

	cards: defineTable({
		title: v.string(),
		description: v.string(),
		order: v.number(),
		authorId: v.id('users'),
		listId: v.id('lists'),
		boardId: v.id('boards'),
	}),

	messages: defineTable({
		text: v.string(),
		boardId: v.id('boards'),
		authorId: v.id('users'),
	}),
});
