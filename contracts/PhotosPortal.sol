// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'hardhat/console.sol';

contract PhotosPortal {
	struct Photo {
		address publisher;
		string src;
		string caption;
		uint256 timestamp;
	}

	uint256 private seed;
	Photo[] photos;

	event NewPhoto(
		address indexed from,
		uint256 timestamp,
		string caption,
		string src
	);

	event NewETHWinner(address indexed from);

	mapping(address => uint256) public lastUploaded;

	constructor() payable {
		console.log('Initializing contract: PhotosPortal');
		seed = (block.timestamp + block.difficulty) % 100;
	}

	function uploadPhoto(string memory _src, string memory _caption) public {
		require(
			lastUploaded[msg.sender] + 30 seconds < block.timestamp,
			'Must wait 30 seconds before uploading another photo.'
		);

		lastUploaded[msg.sender] = block.timestamp;
		photos.push(Photo(msg.sender, _src, _caption, block.timestamp));
		emit NewPhoto(msg.sender, block.timestamp, _caption, _src);

		seed = (block.difficulty + block.timestamp + seed) % 100;

		if (seed <= 7) {
			uint256 prizeAmount = 0.0001 ether;
			console.log('%s won!', msg.sender);
			emit NewETHWinner(msg.sender);

			require(
				prizeAmount <= address(this).balance,
				'Trying to withdraw more money than the contract has.'
			);
			(bool success, ) = (msg.sender).call{value: prizeAmount}('');
			require(success, 'Failed to withdraw money from contract.');
		}
	}

	function getPhotos() public view returns (Photo[] memory) {
		return photos;
	}
}
