import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/atoms/Layout';
import { theme } from '@/utils/theme';
import { DataProvider } from '@/hooks/useData';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<DataProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</DataProvider>
		</ChakraProvider>
	);
}
export default MyApp;
