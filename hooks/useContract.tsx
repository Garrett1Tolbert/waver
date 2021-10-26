declare let window: any;
import { ethers } from 'ethers';
import { photosContractAddress, waveContractAddress } from '../constants';
import photosAbi from '@/constants/PhotosPortal.json';
import wavesAbi from '@/constants/WavePortal.json';
import useAuth from './useAuth';

export default function useContract() {
	const { account } = useAuth();

	const getAddress = (contract: string) => {
		switch (contract) {
			case 'PhotosPortal':
				return { address: photosContractAddress, abi: photosAbi };
			default:
				return { address: waveContractAddress, abi: wavesAbi };
		}
	};

	const getContract = (contract: string) => {
		if (!account) return null;
		const { ethereum } = window;
		const provider = new ethers.providers.Web3Provider(ethereum);

		const signer = provider.getSigner();
		const { abi, address } = getAddress(contract);
		const _contract = new ethers.Contract(
			address as string,
			abi.abi as ethers.ContractInterface,
			signer
		);

		return _contract;
	};

	return { getContract };
}
