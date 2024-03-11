import Navbar from '@/components/Navbar';
import Boards from '@/components/board/Boards';
import { currentUser } from '@clerk/nextjs';

const page = async () => {
	const user = await currentUser();
	return (
		<section>
			<Navbar user={user?.id} />
			<Boards />
		</section>
	);
};

export default page;
