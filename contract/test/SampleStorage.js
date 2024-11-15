const { expect } = require('chai');

describe('SimpleStorage Contract', function () {
  let simpleStorage;
  let owner;

  // Deploy contract before each test
  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const SimpleStorage = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await SimpleStorage.deploy();
  });

  it('should store a value and retrieve it', async function () {
    // Set a value
    await simpleStorage.set(42);

    // Retrieve the stored value and check it
    const storedValue = await simpleStorage.get();
    expect(storedValue).to.equal(42);
  });

  it('should retrieve 0 as the initial value', async function () {
    const storedValue = await simpleStorage.get();
    expect(storedValue).to.equal(0);
  });
});
