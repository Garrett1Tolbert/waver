import { useData } from '@/hooks/useData';
import { Stack, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export default function DateList(): JSX.Element {
	const [dates, setDates] = useState<string[]>([]);
	const { photos } = useData();

	useEffect(() => {
		const temp = photos?.map((photo: any) =>
			format(photo.timestamp, 'MM-dd-yyyy')
		);
		setDates([...new Set(temp)]);
	}, [photos]);

	return (
		<Stack mt="6">
			{dates?.map((date, index) => {
				return (
					<Text
						py="1"
						px="3"
						rounded="md"
						cursor="pointer"
						bg="rgba(255,255,255,.05)"
						color="white"
						key={index}
						_hover={{ bg: 'rgba(255,255,255,.1)' }}
					>
						{date}
					</Text>
				);
			})}
		</Stack>
	);
}
