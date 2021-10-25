declare let window: any;
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Input,
	Stack,
	Box,
	FormControl,
	Text,
	FormLabel,
	VisuallyHidden,
	HStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { ethers } from 'ethers';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { contractAddress } from '@/constants/index';
import abi from '@/constants/WavePortal.json';

interface UIProps extends Props {
	photo: File | undefined;
	loadingText: string;
	handleUpload: () => Promise<void>;
	setPhoto: Dispatch<SetStateAction<File | undefined>>;
	setCaption: Dispatch<SetStateAction<string>>;
}

const AddPhotoUI = ({
	onClose,
	show,
	photo,
	loadingText,
	setCaption,
	setPhoto,
	handleUpload,
}: UIProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) {
			e.target.value = '';
			return;
		}
		setPhoto(e.target.files[0]);
	};

	return (
		<Modal isOpen={show} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Choose a photo</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack spacing={4}>
						<HStack
							mr="16"
							minH="85px"
							justifyContent="space-between"
							alignItems="center"
						>
							<Box
								as="button"
								type="button"
								border="1px"
								borderColor="#555b69"
								rounded="md"
								px="4"
								w="fit-content"
								onClick={() => inputRef.current?.click()}
							>
								<Text textAlign="start" lineHeight="38px">
									Choose File
								</Text>
								<VisuallyHidden>
									<Input
										ref={inputRef}
										accept="image/*"
										type="file"
										onChange={handleChange}
									/>
								</VisuallyHidden>
							</Box>
							{photo && (
								<Box
									rounded="md"
									pos="relative"
									minH="75px"
									minW="75px"
									overflow="hidden"
								>
									<Image
										src={URL.createObjectURL(photo)}
										alt="your photo"
										objectFit="cover"
										layout="fill"
									/>
								</Box>
							)}
						</HStack>
						<FormControl id="caption">
							<FormLabel>
								Caption{' '}
								<Text as="span" opacity={0.5} fontSize="sm" fontStyle="italic">
									(optional)
								</Text>
							</FormLabel>
							<Input
								placeholder="Add a cool caption"
								onChange={(e) => setCaption(e.target.value)}
							/>
						</FormControl>
					</Stack>
				</ModalBody>
				<ModalFooter>
					<Button variant="ghost" mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button
						onClick={handleUpload}
						isLoading={Boolean(loadingText)}
						loadingText={loadingText}
					>
						Upload
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

interface Props {
	show: boolean;
	onClose: () => void;
}
export default function AddPhoto(props: Props): JSX.Element {
	const [photo, setPhoto] = useState<File>();
	const [caption, setCaption] = useState('');
	const [loadingText, setLoadingText] = useState('');

	const handleUpload = async () => {
		if (!photo) return;
		try {
			setLoadingText('Processing...');
			const { ethereum } = window;
			const provider = new ethers.providers.Web3Provider(ethereum);

			const signer = provider.getSigner();
			const wavePortalContract = new ethers.Contract(
				contractAddress,
				abi.abi,
				signer
			);
			let count = await wavePortalContract.getTotalWaves();
			console.log('Retrieved total wave count...', count.toNumber());

			const waveTxn = await wavePortalContract.wave();
			console.log({ waveTxn });

			setLoadingText('Mining...');
			console.log('Mining...', waveTxn.hash);

			await waveTxn.wait();
			console.log('Mined -- ', waveTxn.hash);

			setLoadingText('Uploading...');

			count = await wavePortalContract.getTotalWaves();
			console.log('Retrieved total wave count...', count.toNumber());
		} catch (error) {
			console.log(error);
		} finally {
			setLoadingText('');
		}
	};

	const handleClose = () => {
		setPhoto(undefined);
		setCaption('');
		props.onClose();
	};

	return (
		<AddPhotoUI
			{...props}
			onClose={handleClose}
			photo={photo}
			setPhoto={setPhoto}
			setCaption={setCaption}
			loadingText={loadingText}
			handleUpload={handleUpload}
		/>
	);
}
