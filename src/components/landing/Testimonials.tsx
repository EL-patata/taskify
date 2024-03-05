import Image from 'next/image';
import { InfiniteMovingCards } from '../ui/animated/moving-cards';

const items = [
	{
		name: 'John Doe',
		quote: `
    Taskify is great for simplifying complex processes. 
    As a manager, I can chunk processes down into bite-sized pieces for my team
    and then delegate that out, but still keep a bird's-eye view.
    `,
		title: (
			<img
				alt="avatar preview"
				className="rounded-full"
				src="https://img.clerk.com/preview.png?size=50&amp;seed=seed&amp;initials=AD&amp;isSquare=true&amp;bgType=marble&amp;bgColor=84cc16%2Ca3e635&amp;fgType=silhouette&amp;fgColor=FFFFFF&amp;type=user"
			/>
		),
	},
	{
		name: 'Jane Doe',
		quote: `
    Whether someone is in the office,
    working from home,
    or working on-site with a client,
    everyone can share context and information through Taskify.
    `,
		title: (
			<img
				alt="avatar preview"
				src="https://img.clerk.com/preview.png?size=50&seed=seed&initials=AD&isSquare=true&bgType=marble&bgColor=c026d3%2Cec4899&fgType=silhouette&fgColor=FFFFFF&type=user"
				className="rounded-full"
			/>
		),
	},
	{
		name: 'James Doe',
		quote: `
    We used Taskify to provide clarity on steps, requirements, and procedures.
    This was exceptional when communicating with teams that had
    deep cultural and language differences. `,
		title: (
			<img
				alt="avatar preview"
				src="https://img.clerk.com/preview.png?size=50&amp;seed=seed&amp;initials=AD&amp;isSquare=true&amp;bgType=marble&amp;bgColor=2563eb%2C4f46e5&amp;fgType=silhouette&amp;fgColor=FFFFFF&amp;type=user"
				className="rounded-full"
			/>
		),
	},
	{
		name: 'Muscle Man',
		quote: `
    Do you know who else uses taskify?
    `,
		title: (
			<Image
				alt="muscle man quote"
				src={`/muscle-man.webp`}
				width={50}
				height={50}
				className="rounded-full"
			/>
		),
	},
];

const Testimonials = () => {
	return (
		<div className="w-full flex items-center justify-center">
			<InfiniteMovingCards speed="normal" items={items} />
		</div>
	);
};

export default Testimonials;
