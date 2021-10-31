import { HStack, Heading, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import AddPhoto from './modals/AddPhoto';

interface Props {
	title: string;
}

export default function Header({ title }: Props) {
	const [showAddModal, setShowAddModal] = useState(false);

	return (
		<>
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
				<Heading fontSize="6xl">{title}</Heading>
				<Button
					leftIcon={<MdAddPhotoAlternate />}
					onClick={() => setShowAddModal(true)}
				>
					Add a photo
				</Button>
			</HStack>
		</>
	);
}
