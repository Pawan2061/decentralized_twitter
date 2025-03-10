const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("DecentralizedTwitter"); // Replace with your contract name
  const contract = await Contract.deploy({
    gasPrice: ethers.parseUnits("5", "gwei"),
  }); // Deploy the contract

  await contract.waitForDeployment(); // Wait for it to be mined
  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
