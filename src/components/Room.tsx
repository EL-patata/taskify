'use client';
import { PropsWithChildren } from 'react';
import { RoomProvider } from '../../liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';

type Props = { children: React.ReactNode; roomId: string };

const Room = ({ children, roomId }: Props) => {
	return (
		<RoomProvider id={roomId} initialPresence={{}}>
			<ClientSideSuspense fallback={<p>Loading...</p>}>
				{() => children}
			</ClientSideSuspense>
		</RoomProvider>
	);
};

export default Room;
