import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { Photo as PhotoType } from 'types';
import Image from 'next/image';
import { format } from 'date-fns';

export default function Photo({
	caption,
	publisher,
	src,
	timestamp,
}: PhotoType): JSX.Element {
	return (
		<Box
			cursor="pointer"
			rounded="lg"
			w="350px"
			p="3"
			transition="all .2s"
			_hover={{ boxShadow: 'dark-lg' }}
			overflow="hidden"
		>
			<Box w="full" h="250px" pos="relative" overflow="hidden" rounded="lg">
				<Image
					src={src}
					layout="fill"
					alt={caption || 'a photo'}
					objectFit="cover"
				/>
				<HStack pos="absolute" bottom={2} left={2}>
					<Text
						backdropFilter="blur(5px)"
						fontWeight="medium"
						fontSize="sm"
						rounded="md"
						py="1"
						px="2"
						bg="rgba(0,0,0,.1)"
						w="fit-content"
					>
						{publisher.slice(0, 4)}...{publisher.slice(-4)}
					</Text>
					<Text
						backdropFilter="blur(5px)"
						fontWeight="medium"
						fontSize="sm"
						rounded="md"
						py="1"
						px="2"
						bg="rgba(0,0,0,.1)"
						w="fit-content"
					>
						{format(timestamp, 'MMM dd, yyyy')}
					</Text>
				</HStack>
			</Box>
			<Text mt="3" fontWeight="medium">
				{caption}
			</Text>
		</Box>
	);
}
