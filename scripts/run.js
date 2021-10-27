const main = async () => {
	const photosContractFactory = await hre.ethers.getContractFactory(
		'PhotosPortal'
	);
	const photosContract = await photosContractFactory.deploy({
		value: hre.ethers.utils.parseEther('0.1'),
	});
	await photosContract.deployed();
	console.log('Contract deployed to:', photosContract.address);

	let contractBalance = await hre.ethers.provider.getBalance(
		photosContract.address
	);
	console.log(
		'Contract balance:',
		hre.ethers.utils.formatEther(contractBalance)
	);

	let uploadTxn = await photosContract.uploadPhoto(
		'some_photo',
		'best caption'
	);
	await uploadTxn.wait();

	contractBalance = await hre.ethers.provider.getBalance(
		photosContract.address
	);
	console.log(
		'Contract balance:',
		hre.ethers.utils.formatEther(contractBalance)
	);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
