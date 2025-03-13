const hre = require("hardhat");

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  console.log("Deploying to network:", network.name);

  const Contract = await hre.ethers.getContractFactory("DecentralizedTwitter");

  const deployOptions = {
    gasPrice:
      network.name === "holesky"
        ? hre.ethers.parseUnits("3", "gwei")
        : hre.ethers.parseUnits("5", "gwei"),
  };

  console.log("Starting deployment with options:", deployOptions);
  const contract = await Contract.deploy(deployOptions);

  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log("Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
