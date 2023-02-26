CHANGELOG
===

Last ens-contracts sync time: Feb 24, 2023(v0.0.19)

## v0.2.3

1. Add ReverseRecords contract to easily query reverse records.

## v0.2.2

1. Change default coin type to `503`, rename PublicResolver to CNSPublicResolver

## v0.2.1

1. Optimize controller code
2. Add sold out status for `labelStatus` method
3. Add label status check when `register` label

## v0.2.0

Remove label locking in Web3RegistrarController, below methods has been removed:

* `labelCommitments`
* `commitmentLabels`
* `labelAvailable`
* `commitWithName` (use `commit` instead)

## v0.1.4

The first functional version
