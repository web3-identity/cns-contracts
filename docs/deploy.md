# How to deploy

## Steps

1. Registry
2. ReverseRegistrar
3. BaseRegistrar
4. NameWrapper
5. PriceOracle -> ens currently use ExponentialPremiumPriceOracle
6. Web3Controller
7. PublicResolver

## Setup

1. Set .web3's owner to BaseRegistrar
2. minCommitmentAge - 5 min
3. maxCommitmentAge - 1 day
4. Add web3Controller to BaseRegistrar's controller

## ENS-setup

1. addr.reverse owner -> ReverseRegistrar (ADDR_REVERSE_NODE = 0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2)
2. web3 -> BaseRegistrar
3. baseRegistrar addController: controller, namewrapper
4. ReverseRegistrar setDefaultResolver, setController -> web3Controller
5. NameWrapper setController -> web3Controller

### BulkRenewal

1. Set interfaceImplementer
