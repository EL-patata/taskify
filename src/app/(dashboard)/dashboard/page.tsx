import Boards from '@/components/board/Boards';
import { currentUser } from '@clerk/nextjs';

const page = async () => {
	const user = await currentUser();

	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
			<Boards />
		</section>
	);
};

export default page;
