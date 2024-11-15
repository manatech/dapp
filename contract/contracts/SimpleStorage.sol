// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract SimpleStorage {
    uint256 private storedValue;

    // Store a value
    function set(uint256 value) public {
        storedValue = value;
    }

    // Retrive the stored value
    function get() public view returns (uint256) {
        return storedValue;
    }
}
