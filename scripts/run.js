const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const bal = await owner.getBalance();
  console.log("Owner address: ", owner.address);
  console.log("Owner balance: ", bal.toString());
  const waveContractFactor = await hre.ethers.getContractFactory("waveportal");
  const waveContract = await waveContractFactor.deploy();
  await waveContract.deployed();
  console.log("Deployed contract ", waveContract.address);
  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
