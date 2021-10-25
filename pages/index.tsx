declare let window: any;
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Heading, Stack, Button, HStack } from '@chakra-ui/react';
import { ethers } from 'ethers';
import abi from '@/constants/WavePortal.json';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { useState } from 'react';
import AddPhoto from '@/components/molecules/modals/AddPhoto';
import { contractAddress } from '@/constants/index';

const Home: NextPage = () => {
	const [showAddModal, setShowAddModal] = useState(false);
	const contractABI = abi.abi;

	const wave = async () => {
		try {
			const { ethereum } = window;

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);

				const signer = provider.getSigner();
				const wavePortalContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				);

				let count = await wavePortalContract.getTotalWaves();
				console.log('Retrieved total wave count...', count.toNumber());

				const waveTxn = await wavePortalContract.wave();
				console.log({ waveTxn });

				console.log('Mining...', waveTxn.hash);

				await waveTxn.wait();
				console.log('Mined -- ', waveTxn.hash);

				count = await wavePortalContract.getTotalWaves();
				console.log('Retrieved total wave count...', count.toNumber());
			} else {
				console.log("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Head>
				<title>Waver</title>
				<meta name="description" content="Wave at me" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box h="100vh" w="100vw" pos="relative" p="16">
				<AddPhoto show={showAddModal} onClose={() => setShowAddModal(false)} />
				<Stack spacing={4}>
					<HStack justifyContent="space-between" alignItems="center">
						<Heading fontSize="6xl">Waver</Heading>
						<Button
							leftIcon={<MdAddPhotoAlternate />}
							onClick={() => setShowAddModal(true)}
						>
							Add a photo
						</Button>
					</HStack>
				</Stack>
			</Box>
		</>
	);
};

export default Home;
