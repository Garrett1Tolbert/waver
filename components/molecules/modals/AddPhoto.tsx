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
	useToast,
	FormControl,
	Text,
	FormLabel,
	VisuallyHidden,
	HStack,
	Link,
} from '@chakra-ui/react';
import Image from 'next/image';
import { ethers } from 'ethers';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { contractAddress } from '@/constants/index';
import abi from '@/constants/PhotosPortal.json';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Cloudinary } from '@/utils/cloudinary';
import { useEffect } from 'react';

interface UIProps extends Props {
	photo: File | undefined;
	loadingText: string;
	hash: string;
	handleClick: () => Promise<void>;
	setPhoto: Dispatch<SetStateAction<File | undefined>>;
	setCaption: Dispatch<SetStateAction<string>>;
}

const AddPhotoUI = ({
	onClose,
	show,
	photo,
	hash,
	loadingText,
	setCaption,
	setPhoto,
	handleClick,
}: UIProps) => {
	const ethScan = `https://rinkeby.etherscan.io/tx/${hash}`;
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
										name="upload"
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
					{hash && (
						<Link isExternal href={ethScan} mr="4">
							View Progess
						</Link>
					)}

					<Button variant="ghost" mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button
						onClick={handleClick}
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
	const [hash, setHash] = useState('');
	const [loadingText, setLoadingText] = useState('');
	const toast = useToast();
	let uploadedPhoto: string;

	const handleUpload = async () => {
		try {
			const id = uuidv4();
			const formData = new FormData();
			formData.append('upload', photo!);

			const { data } = await axios.post(
				`/api/upload?id=photos/${id}`,
				formData,
				{
					headers: { 'content-type': 'multipart/form-data' },
				}
			);
			uploadedPhoto = data.path;
		} catch (error) {
			console.log(error);
		}
	};

	const handleClick = async () => {
		if (!photo) return;
		try {
			const { ethereum } = window;
			const provider = new ethers.providers.Web3Provider(ethereum);

			const signer = provider.getSigner();
			const photosPortalContract = new ethers.Contract(
				contractAddress,
				abi.abi,
				signer
			);

			// upload photo here
			setLoadingText('Uploading...');
			await handleUpload();

			// create a new transaction to send the photo to the blockchain
			setLoadingText('Awaiting confirmation...');
			const photoTxn = await photosPortalContract.uploadPhoto(
				uploadedPhoto,
				caption
			);
			setHash(photoTxn.hash);
			setLoadingText('Processing...');

			await photoTxn.wait();
			setHash('');

			setPhoto(undefined);
			toast({
				position: 'top-right',
				title: 'Successful upload',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			props.onClose();
		} catch (error: any) {
			console.error(error);
			await axios.post('/api/delete', { path: uploadedPhoto });
			if (error.code === 4001) {
				setPhoto(undefined);
				props.onClose();
				toast({
					position: 'top-right',
					title: 'You rejected the transaction',
					status: 'error',
					duration: 3000,
					isClosable: true,
				});
			}
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
			hash={hash}
			setPhoto={setPhoto}
			setCaption={setCaption}
			loadingText={loadingText}
			handleClick={handleClick}
		/>
	);
}
