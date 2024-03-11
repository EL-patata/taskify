import Image from 'next/image';
import { Id } from '../../../convex/_generated/dataModel';
import { format } from 'date-fns';

type Props = {
	id: Id<'messages'>;
	text: string;
	userName: string;
	image: string;
	createdAt: number;
};

const Message = ({ id, image, text, createdAt, userName }: Props) => {
	return (
		<p key={id} className="bg-background/50 w-full flex items-center gap-2 p-2">
			<Image
				src={image}
				alt={`${userName} profile picture`}
				width={36}
				height={36}
				className="rounded-full"
			/>
			<div>
				<div className="text-xs flex gap-1 ">
					<p className=" font-semibold ">{userName}</p>
					<p className="text-muted-foreground ">
						{format(createdAt, 'HH:ii:ss a')} At{' '}
						{format(createdAt, 'dd MMM yyyy')}
					</p>
				</div>
				<p>{text}</p>
			</div>
		</p>
	);
};

export default Message;
