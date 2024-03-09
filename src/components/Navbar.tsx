'use client';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { LogIn, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { redirect } from 'next/navigation';

type Props = {
	user: string | null | undefined;
};

const Navbar = ({ user }: Props) => {
	return (
		<nav className="sticky top-0 z-[9000] flex gap-2 items-center bg-background/10 backdrop-blur-md w-7xl mx-auto h-16 px-10 rounded-lg">
			<Link href={`/`} className="flex items-center gap-1 mr-auto">
				<Image width={30} height={30} src={`/taskify.svg`} alt="logo" />
				<h1 className="text-2xl font-bold text-primary">Taskify</h1>
			</Link>
			{!user ? (
				<SignInButton>
					<Button variant={`ghost`} className="gap-2">
						<LogIn />
						Sign in
					</Button>
				</SignInButton>
			) : (
				<>
					<SignOutButton signOutCallback={() => redirect(`/`)}>
						<Button variant={`ghost`} className="gap-2">
							<LogOut />
							Sign Out
						</Button>
					</SignOutButton>
					<Link href={`/dashboard`} className={buttonVariants({ size: 'lg' })}>
						Dashboard
					</Link>
				</>
			)}
		</nav>
	);
};

export default Navbar;
