const ENS = require('./build/contracts/ENS')
const BaseRegistrarImplementation = require('./build/contracts/BaseRegistrarImplementation')
const ETHRegistrarController = require('./build/contracts/ETHRegistrarController')
const PublicResolver = require('./build/contracts/PublicResolver')
const ReverseRegistrar = require('./build/contracts/ReverseRegistrar')
const NameWrapper = require('./build/contracts/NameWrapper')

module.exports = {
  BaseRegistrarImplementation,
  ENS,
  CNS: ENS,
  ETHRegistrarController,
  Web3RegistrarController: ETHRegistrarController,
  PublicResolver,
  ReverseRegistrar,
  NameWrapper,
}
