import { useData } from '@/hooks/useData';
import { Grid } from '@chakra-ui/react';
import { Photo as PhotoType } from '../../types';
import Photo from '@/components/atoms/Photo';
import { compareDesc } from 'date-fns';

interface Props {
	filtereredPhotos?: PhotoType[];
}

export default function PhotoGrid({ filtereredPhotos }: Props): JSX.Element {
	const { photos } = useData();
	return (
		<Grid
			w="full"
			mt="16"
			pb="16"
			px="16"
			templateColumns=" repeat(auto-fill, minmax(350px, 1fr))"
			gap={12}
			overflowY="scroll"
		>
			{(filtereredPhotos || photos)
				?.sort((a, b) => compareDesc(a.timestamp, b.timestamp))
				.map((el, idx) => (
					<Photo key={idx} {...el} />
				))}
		</Grid>
	);
}
