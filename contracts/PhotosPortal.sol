// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract PhotosPortal {
    struct Photo {
        address publisher;
        string src;
        string caption;
        uint256 timestamp;
    }

    Photo[] photos;

    event NewPhoto(
        address indexed from,
        uint256 timestamp,
        string caption,
        string src
    );

    constructor() {
        console.log("Initializing contract: PhotosPortal");
    }

    function uploadPhoto(string memory _src, string memory _caption) public {
        photos.push(Photo(msg.sender, _src, _caption, block.timestamp));
        emit NewPhoto(msg.sender, block.timestamp, _caption, _src);

        uint256 prizeAmount = 0.0001 ether;
 
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");

    }

    function getPhotos() public view returns (Photo[] memory) {
        return photos;
    }
}
