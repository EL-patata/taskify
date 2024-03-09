// 'use client';
import Navbar from '@/components/Navbar';
import ChatGenerator from '@/components/landing/ChatGenerator';
import Testimonials from '@/components/landing/Testimonials';
import { Spotlight } from '@/components/ui/animated/spotlight';
import { TracingBeam } from '@/components/ui/animated/tracing-beam';
import { Button, buttonVariants } from '@/components/ui/button';
import { SignInButton, currentUser } from '@clerk/nextjs';
import Link from 'next/link';

const page = async () => {
	const user = await currentUser();

	return (
		<section className="overflow-x-clip">
			<Navbar user={user?.id} />
			<div className="h-[90vh] w-full bg-accent/[.1]  bg-grid-lime-500/10 relative flex items-center justify-center">
				<div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]" />
				<Spotlight
					className="-top-40 left-0 md:left-60 md:-top-10"
					fill="#f1f5f9"
				/>
				<div className="flex flex-col gap-2 items-center">
					<h1 className="text-4xl sm:text-7xl font-bold relative z-20 text-primary">
						Welcome to Taskify
					</h1>
					<h2 className="text-muted-foreground text-xl font-semibold text-center">
						Taskify brings all your teammates, tasks, and files together.
						<br />
						Keep everything in the same place—even if your team isn’t.
					</h2>
					{user ? (
						<Link className={buttonVariants()} href={`/dashboard`}>
							Go to the dashboard
						</Link>
					) : (
						<SignInButton>
							<Button className="group gap-1.5 px-6">
								Get started{' '}
								<span className="group-hover:translate-x-2 transition-transform">
									&rarr;
								</span>
							</Button>
						</SignInButton>
					)}
				</div>
			</div>
			<section
				className="w-full mx-auto"
				style={{ WebkitOverflowScrolling: 'unset' }}
			>
				<TracingBeam>
					<div className="grid grid-cols-2 min-h-[100vh]">
						<div className="flex items-center justify-center">
							<h2 className="text-3xl text-primary font-bold">
								With realtime chat communication.
							</h2>
							<p>Stay connected with your team through chat</p>
						</div>
						<div className="sticky top-24 h-fit">
							<ChatGenerator />
						</div>
					</div>
				</TracingBeam>
				<Testimonials />
			</section>
		</section>
	);
};

export default page;
