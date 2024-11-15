const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('SimpleStorageModule', (m) => {
  // Deploy the SimpleStorage contract with the initial value (constructor argument)
  const simpleStorage = m.contract('SimpleStorage');

  return { simpleStorage }; // Return the deployed contract
});
