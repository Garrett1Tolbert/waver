import { useData } from '@/hooks/useData';
import { Stack, Text } from '@chakra-ui/react';
import { compareDesc, format } from 'date-fns';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function DateList(): JSX.Element {
	const [dates, setDates] = useState<string[]>([]);
	const { photos } = useData();
	const router = useRouter();
	const { date } = router.query;

	const linkBg = 'rgba(255,255,255,.05)';
	const hoverBg = 'rgba(255,255,255,.1)';
	const activeBg = 'rgba(255,255,255,.35)';

	useEffect(() => {
		const _dates = photos?.map((el) => el.timestamp);
		const temp = _dates
			?.sort(compareDesc)
			.map((el) => format(el, 'MM-dd-yyyy'));
		setDates([...new Set(temp)]);
	}, [photos]);

	return (
		<Stack mt="16" overflowY="scroll" pos="relative" h="calc(100% - 189px)">
			<Text
				fontSize="lg"
				color="white"
				pos="sticky"
				top={0}
				bg="#1a202c"
				fontWeight="medium"
			>
				History
			</Text>

			<Link passHref href="/">
				<Text
					py="1"
					px="3"
					rounded="md"
					cursor="pointer"
					bg={!date ? activeBg : linkBg}
					color="white"
					_hover={{ bg: !date ? activeBg : hoverBg }}
				>
					All
				</Text>
			</Link>
			{dates?.map((el, idx) => {
				return (
					<Link key={idx} passHref href={`/history/${el}`}>
						<Text
							py="1"
							px="3"
							rounded="md"
							cursor="pointer"
							bg={date === el ? activeBg : linkBg}
							color="white"
							_hover={{ bg: date === el ? activeBg : hoverBg }}
						>
							{el}
						</Text>
					</Link>
				);
			})}
		</Stack>
	);
}
