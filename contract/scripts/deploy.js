const hre = require("hardhat");

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  console.log("Deploying to network:", network.name || network.chainId);

  const Contract = await hre.ethers.getContractFactory("DecentralizedTwitter");

  const gasPrice =
    network.chainId === 17000
      ? hre.ethers.parseUnits("3", "gwei")
      : hre.ethers.parseUnits("5", "gwei");

  console.log("Starting deployment with gas price:", gasPrice.toString());

  const contract = await Contract.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Contract deployed to:", address);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
