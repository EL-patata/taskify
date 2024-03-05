import Testimonials from '@/components/landing/Testimonials';
import { InfiniteMovingCards } from '@/components/ui/animated/moving-cards';
import { Spotlight } from '@/components/ui/animated/spotlight';

const page = () => {
	return (
		<section>
			<div className="h-[90vh] w-full bg-accent/[.1]  bg-grid-lime-500/10 relative flex items-center justify-center">
				{/* Radial gradient for the container to give a faded look */}
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
				</div>
			</div>
			<Testimonials />
		</section>
	);
};

export default page;
