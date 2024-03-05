import { LogOut, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { SignOutButton, currentUser } from '@clerk/nextjs';

const Navbar = async () => {
	const user = await currentUser();

	return (
		<nav className="sticky top-0 z-[9000] flex gap-2 items-center bg-background/10 backdrop-blur-md w-full h-16 px-10 rounded-lg">
			<Link href={`/`} className="flex items-center gap-1 mr-auto">
				<Image width={30} height={30} src={`/taskify.svg`} alt="logo" />
				<h1 className="text-2xl font-bold text-primary">Taskify</h1>
			</Link>
			{user ? (
				<SignOutButton>
					<Button className="rounded-full p-[6px]" variant={'ghost'}>
						<LogOut />
						Signout
					</Button>
				</SignOutButton>
			) : (
				<Link href={`/dashboard`} className={buttonVariants({ size: 'lg' })}>
					Dashboard
				</Link>
			)}
		</nav>
	);
};

export default Navbar;
