import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Header from '@/components/molecules/Header';
import PhotoGrid from '@/components/molecules/PhotoGrid';
import { useData } from '@/hooks/useData';
import { format } from 'date-fns';
import { Photo } from 'types';

interface Props {
	date: string;
	filtered: Photo[];
}

const HistoricDateUI = ({ filtered, date }: Props) => {
	return (
		<>
			<Head>
				<title>Waver</title>
				<meta name="description" content="Wave at me" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box h="100vh" w="100vw" pos="relative" overflowY="scroll">
				{!filtered?.length ? (
					<Text p="16">No photos</Text>
				) : (
					<>
						<Header title={date} />
						<PhotoGrid filtereredPhotos={filtered} />
					</>
				)}
			</Box>
		</>
	);
};

export default function HistoricDate(): JSX.Element {
	const router = useRouter();
	const { photos } = useData();
	const { date } = router.query;
	const [filtered, setFiltered] = useState<Photo[]>([]);

	useEffect(() => {
		setFiltered(
			photos?.filter(
				(photo) => format(photo.timestamp, 'MM-dd-yyyy') === date
			)
		);
	}, [photos]);

	return <HistoricDateUI filtered={filtered} date={date as string} />;
}
