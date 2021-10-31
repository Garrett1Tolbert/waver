import useAuth from '@/hooks/useAuth';
import useContract from '@/hooks/useContract';
import { useData } from '@/hooks/useData';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import Account from '../atoms/Account';
import DateList from './DateList';

const SidebarUI = () => {
	return (
		<Box
			h="100vh"
			minW="180px"
			transition="all .2s"
			px="4"
			zIndex="10"
			shadow="dark-lg"
			pos="sticky"
			top="0"
		>
			<DateList />
			<Account />
		</Box>
	);
};

export default function Sidebar(): JSX.Element {
	const { getContract } = useContract();
	const { account } = useAuth();
	const { updatePhotos } = useData();

	const photosPortalContract = getContract('PhotosPortal');
	const getPhotos = async () => {
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
	}, [account, photosPortalContract]);

	return <SidebarUI />;
}
