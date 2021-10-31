import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import PhotoGrid from '@/components/molecules/PhotoGrid';
import useContract from '@/hooks/useContract';
import Header from '@/components/molecules/Header';

const Home: NextPage = () => {
	const toast = useToast();
	const { getContract } = useContract();

	const handleWinner = () => {
		toast({
			title: '🥳 Someone just received ETH!',
			status: 'success',
			position: 'top',
			duration: 3000,
			isClosable: true,
		});
	};

	useEffect(() => {
		const contract = getContract('PhotosPortal');
		contract?.on('NewETHWinner', handleWinner);

		return () => {
			contract?.off('NewWave', handleWinner);
		};
	}, []);

	return (
		<>
			<Head>
				<title>Waver</title>
				<meta
					name="description"
					content="A decentralized photo sharing app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box h="100vh" w="100vw" pos="relative" overflowY="scroll">
				<Header title="Waver" />
				<PhotoGrid />
			</Box>
		</>
	);
};

export default Home;
