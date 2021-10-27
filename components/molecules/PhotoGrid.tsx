import { useData } from '@/hooks/useData';
import { Grid } from '@chakra-ui/react';
import Photo from '@/components/atoms/Photo';

export default function PhotoGrid(): JSX.Element {
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
			{photos?.map((el, idx) => (
				<Photo key={idx} {...el} />
			))}
		</Grid>
	);
}
