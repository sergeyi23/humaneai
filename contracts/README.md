# Humane AI Smart Contracts

## Deployment

To deploy to Gnosis Chiado

```
npm i
npm run compile
npm run test
npm run deploy:test
```

## Actions

You can run actions to smart contract with HardHat tasks in the repository.

### 1. Join As Creator
```
npm run test:joinAsCreator <signer index>
```
`signer index` is index of signer account from `hardhat.config.ts`.

### 2. Join As Verifier
```
npm run test:joinAsVerifier <signer index>
```
`signer index` is index of signer account from `hardhat.config.ts`.

### 3. Create Data Set Item

```
npm run test:createDataSetItem <signer index> <format> <tags> "<content>"
```

`signer index` is index of signer account from `hardhat.config.ts`.

`Format` is integer that has one of the following values:
- `0` - Text
- `1` - Question and Answer

`Tags` a string with comma separated integer values with ids of tags. Ids can have following values:
- `0` - Statement
- `1` - Question
- `2` - Verified Knowledge

Example:
```
npm run test:createDataSetItem 0 0 "1" "What time is it?"
```

### 2. Verifier Vote
```
npm run test:voteDataSetItem <signer index> <post id> <vote>
```

`signer index` is index of signer account from `hardhat.config.ts`.

`post id` is id of post that is being voted

`vote`: 
- `1` for upvote
- `0` for downvote

