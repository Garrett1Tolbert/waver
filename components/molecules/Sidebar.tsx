import useAuth from '@/hooks/useAuth';
import useContract from '@/hooks/useContract';
import { useData } from '@/hooks/useData';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Account from '../atoms/Account';

interface UIProps {
	dates: string[];
}

const SidebarUI = ({ dates }: UIProps) => {
	return (
		<Box
			h="100vh"
			minW="180px"
			transition="all .2s"
			px="4"
			shadow="dark-lg"
			pos="relative"
		>
			<Account />
		</Box>
	);
};

export default function Sidebar(): JSX.Element {
	const { getContract } = useContract();
	const { account } = useAuth();
	const { updatePhotos } = useData();
	const [dates, setDates] = useState([]);

	const getPhotos = async () => {
		const photosPortalContract = getContract('PhotosPortal');
		const photos = await photosPortalContract?.getPhotos();

		updatePhotos(
			photos?.map((photo: any) => ({
				src: photo.src,
				publisher: photo.publisher,
				caption: photo.caption,
				timestamp: new Date(photo.timestamp * 1000),
			}))
		);
	};

	useEffect(() => {
		getPhotos();
	}, [account]);
	return <SidebarUI dates={dates} />;
}
