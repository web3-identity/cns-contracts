const ENS = require('./build/contracts/ENS')
const BaseRegistrarImplementation = require('./build/contracts/BaseRegistrarImplementation')
const Web3RegistrarController = require('./build/contracts/Web3RegistrarController')
const PublicResolver = require('./build/contracts/PublicResolver')
const CNSPublicResolver = require('./build/contracts/CNSPublicResolver')
const ReverseRegistrar = require('./build/contracts/ReverseRegistrar')
const NameWrapper = require('./build/contracts/NameWrapper')

module.exports = {
  BaseRegistrarImplementation,
  ENS,
  CNS: ENS,
  Web3RegistrarController,
  PublicResolver,
  ReverseRegistrar,
  NameWrapper,
  CNSPublicResolver,
}
