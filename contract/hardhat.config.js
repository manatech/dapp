require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.27',
  networks: {
    ganache: {
      url: 'http://127.0.0.1:7545', // Ganache RPC URL (make sure Ganache is running on this URL)
      accounts: [
        '0xf63abb8d1db32ee2bbb386a7a3958863cd12ed93a2372f2d36a625582bbe877d',
      ], // Private key for deploying the contract
    },
  },
};
