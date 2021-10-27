import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Heading, Stack, Button, HStack } from '@chakra-ui/react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useState } from 'react';
import AddPhoto from '@/components/molecules/modals/AddPhoto';
import PhotoGrid from '@/components/molecules/PhotoGrid';

const Home: NextPage = () => {
	const [showAddModal, setShowAddModal] = useState(false);

	return (
		<>
			<Head>
				<title>Waver</title>
				<meta name="description" content="Wave at me" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box h="100vh" w="100vw" pos="relative" overflowY="scroll">
				<AddPhoto
					show={showAddModal}
					onClose={() => setShowAddModal(false)}
				/>
				<HStack
					justifyContent="space-between"
					alignItems="center"
					pos="sticky"
					top="0"
					pt="16"
					px="16"
					zIndex="5"
					bg="#1a202c"
				>
					<Heading fontSize="6xl">Waver</Heading>
					<Button
						leftIcon={<MdAddPhotoAlternate />}
						onClick={() => setShowAddModal(true)}
					>
						Add a photo
					</Button>
				</HStack>
				<PhotoGrid />
			</Box>
		</>
	);
};

export default Home;
