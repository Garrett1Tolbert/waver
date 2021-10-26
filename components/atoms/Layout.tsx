import { Flex } from '@chakra-ui/react';
import { LayoutProps } from 'types';
import Sidebar from '../molecules/Sidebar';

export default function Layout({ children }: LayoutProps) {
	return (
		<Flex>
			<Sidebar />
			{children}
		</Flex>
	);
}
