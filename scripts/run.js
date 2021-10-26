const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	// const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
	// const waveContract = await waveContractFactory.deploy();
	// await waveContract.deployed();

	const photosContractFactory = await hre.ethers.getContractFactory(
		'PhotosPortal'
	);
	const photosContract = await photosContractFactory.deploy();
	await photosContract.deployed();

	// console.log('Contract deployed to:', waveContract.address);
	// console.log('Contract deployed by:', owner.address);

	console.log('Contract deployed to:', photosContract.address);
	console.log('Contract deployed by:', owner.address);

	let requests;
	requests = await photosContract.getRequests();
	console.log(requests);

	let requestTxn = await photosContract.processRequest();
	await requestTxn.wait();

	requests = await photosContract.getRequests();
	console.log(requests);

	requestTxn = await photosContract.connect(randomPerson).processRequest();
	await requestTxn.wait();

	requests = await photosContract.getRequests();
	console.log(requests);
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
