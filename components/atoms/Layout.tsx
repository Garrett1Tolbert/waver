import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Sidebar from '../molecules/Sidebar';

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<Flex>
			<Sidebar />
			{children}
		</Flex>
	);
}
