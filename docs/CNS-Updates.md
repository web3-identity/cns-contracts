# Updates

## NameWrapper

1. Add two method `tokenCount`, `label45Count`
2. ETH_NODE change to `web3`
3. Add `initialize` to support proxy upgrade
4. Add `userDomains` (and related methods) to enumerate all domains of one account

## EthRegistrarController

1. Switch Owner to AccessControl
2. eth -> web3
3. New variables: `validLen`, `lanbel45Quota`, `nameWhiteList`
4. Add `initialize` to support upgrade
5. Add `labelStatus`, `rentPriceInFiat`, `renewWithFiat`, `registerWithFiat`
6. Admin methods: `setCommitmentAge`, `setNameWhitelist`, `setPriceOracle`, `setValidLen`, `setLabel45Quota`