import { Address, BigInt, JSONValue, JSONValueKind } from "@graphprotocol/graph-ts";
import {
  CreatorJoined as CreatorJoinedEvent,
  CreatorLeft as CreatorLeftEvent,
  DataSetItemCreated as DataSetItemCreatedEvent,
  DataSetItemVoted as DataSetItemVotedEvent,
  HumaneAIDataset,
  VerifierJoined as VerifierJoinedEvent,
  VerifierLeft as VerifierLeftEvent
} from "../generated/HumaneAIDataset/HumaneAIDataset"
import {
  Creator,
  DataSetItem,
  DataSetItemVoted,
  Verifier,
} from "../generated/schema"


function updateCreatorEntity(contractAddress: Address, entity: Creator, address: Address): void {
  const creator = HumaneAIDataset.bind(contractAddress).getCreator(address);
  entity.owner = creator.owner;
  entity.reputation = creator.reputation;
  entity.isActive = creator.isActive;
  entity.stake = creator.stake;
  entity.timestamp = creator.timestamp;

  entity.save();
}

export function handleCreatorJoined(event: CreatorJoinedEvent): void {
  let entity = new Creator(event.params.creatorAddress.toHexString());
  updateCreatorEntity(event.address, entity, event.params.creatorAddress);
}

export function handleCreatorLeft(event: CreatorLeftEvent): void {
  let entity = Creator.load(event.params.creatorAddress.toHexString());
  if(entity != null) {
    updateCreatorEntity(event.address, entity, event.params.creatorAddress);
  }
}

export function isValidIPFS(ipfsData: JSONValue): boolean {
  return !ipfsData.isNull() && ipfsData.kind == JSONValueKind.OBJECT
}

function updateDataSetItem(contractAddress: Address, entity: DataSetItem, id: BigInt, updateCreator: bool): void {
  const dataSetItem = HumaneAIDataset.bind(contractAddress).getDataSetItem(id);
  entity.dataSetItemId = dataSetItem.id;
  entity.author = dataSetItem.author;
  entity.format = dataSetItem.format;
  entity.tags = dataSetItem.tags;
  entity.contentIpfsHash = dataSetItem.contentIpfsHash;
  entity.rating = dataSetItem.rating;
  entity.timestamp = dataSetItem.timestamp;

  // TODO: fix strange build error
  // const ipfsContent = ipfs.cat(entity.contentIpfsHash);
  // if(ipfsContent != null) {
  //   entity.content = ipfsContent.toString();
  // }  

  entity.save();

  if(updateCreator) {
    const creatorEntity = Creator.load(dataSetItem.author.toHexString());
    if(creatorEntity != null) {
      updateCreatorEntity(contractAddress, creatorEntity, dataSetItem.author);
    }
  }
}

export function handleDataSetItemCreated(event: DataSetItemCreatedEvent): void {
  let entity = new DataSetItem(event.params.id.toString());
  updateDataSetItem(event.address, entity, event.params.id, false);
}

export function handleDataSetItemVoted(event: DataSetItemVotedEvent): void {
  let entity = new DataSetItemVoted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.dataSetItemId = event.params.id
  entity.voter = event.params.voter
  entity.vote = event.params.vote

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save();

  let dataSetItemEntity = DataSetItem.load(event.params.id.toString());
  if(dataSetItemEntity != null) {
    updateDataSetItem(event.address, dataSetItemEntity, event.params.id, true);
  }

  let verifierEntity = Verifier.load(event.params.voter.toHexString());
  if(verifierEntity != null) {
    updateVerifierEntity(event.address, verifierEntity, event.params.voter);
  }
}

function updateVerifierEntity(contractAddress: Address, entity: Verifier, address: Address): void {
  
  const verifier = HumaneAIDataset.bind(contractAddress).getVerifier(address);
  entity.owner = verifier.owner;
  entity.reputation = verifier.reputation;
  entity.isActive = verifier.isActive;
  entity.stake = verifier.stake;
  entity.timestamp = verifier.timestamp;

  entity.save();
}

export function handleVerifierJoined(event: VerifierJoinedEvent): void {
  let entity = new Verifier(event.params.verifierAddress.toHexString());
  updateVerifierEntity(event.address, entity, event.params.verifierAddress);
}

export function handleVerifierLeft(event: VerifierLeftEvent): void {
  let entity = Verifier.load(event.params.verifierAddress.toHexString());
  if(entity != null) {
    updateVerifierEntity(event.address, entity, event.params.verifierAddress);
  }
}
