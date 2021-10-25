import { FaWallet } from 'react-icons/fa';
import { Button, Center, Text } from '@chakra-ui/react';
import useAuth from '@/hooks/useAuth';

export default function Account(): JSX.Element {
	const { account, connectWallet } = useAuth();

	return !account ? (
		<Button pos="sticky" top="calc(100vh - 56px)" onClick={connectWallet}>
			Connect Wallet
		</Button>
	) : (
		<Center
			pos="sticky"
			top="calc(100vh - 47px)"
			userSelect="none"
			border="1px"
			rounded="full"
			px="2"
			py="1"
			color="#ee6002"
			bg="#fff2df"
		>
			<FaWallet />
			<Text ml="2" fontSize="sm" textAlign="center">
				{account.slice(0, 4)}...{account.slice(-4)}
			</Text>
		</Center>
	);
}
