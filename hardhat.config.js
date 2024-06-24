require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},

  },
  ignition: {
    modules: [
      require("./ignition/modules/Lock.js"),
    ],
  },
};
