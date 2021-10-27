import { Flex } from '@chakra-ui/react';
import { LayoutProps } from 'types';
import Sidebar from '../molecules/Sidebar';

export default function Layout({ children }: LayoutProps) {
	return (
		<Flex pos="relative">
			<Sidebar />
			{children}
		</Flex>
	);
}
