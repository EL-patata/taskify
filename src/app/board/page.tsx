import { preloadQuery } from 'convex/nextjs';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

const page = () => {
	preloadQuery(api.boards.getLists, { id: '123' as Id<'boards'> });
	return <div>page</div>;
};

export default page;
