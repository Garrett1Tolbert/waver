declare let window: any;
import { useEffect, useState } from 'react';

export default function useAuth() {
	const [account, setAccount] = useState('');

	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;
		if (!ethereum) return;

		const accounts = await ethereum.request({ method: 'eth_accounts' });
		accounts.length !== 0 && setAccount(accounts[0]);
	};

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			setAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return { account, connectWallet };
}
