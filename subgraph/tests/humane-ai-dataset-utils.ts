import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CreatorJoined,
  CreatorLeft,
  DataSetItemCreated,
  DataSetItemVoted,
  VerifierJoined,
  VerifierLeft
} from "../generated/HumaneAIDataset/HumaneAIDataset"

export function createCreatorJoinedEvent(
  creatorAddress: Address
): CreatorJoined {
  let creatorJoinedEvent = changetype<CreatorJoined>(newMockEvent())

  creatorJoinedEvent.parameters = new Array()

  creatorJoinedEvent.parameters.push(
    new ethereum.EventParam(
      "creatorAddress",
      ethereum.Value.fromAddress(creatorAddress)
    )
  )

  return creatorJoinedEvent
}

export function createCreatorLeftEvent(creatorAddress: Address): CreatorLeft {
  let creatorLeftEvent = changetype<CreatorLeft>(newMockEvent())

  creatorLeftEvent.parameters = new Array()

  creatorLeftEvent.parameters.push(
    new ethereum.EventParam(
      "creatorAddress",
      ethereum.Value.fromAddress(creatorAddress)
    )
  )

  return creatorLeftEvent
}

export function createDataSetItemCreatedEvent(
  id: BigInt,
  authorAddress: Address
): DataSetItemCreated {
  let dataSetItemCreatedEvent = changetype<DataSetItemCreated>(newMockEvent())

  dataSetItemCreatedEvent.parameters = new Array()

  dataSetItemCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  dataSetItemCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "authorAddress",
      ethereum.Value.fromAddress(authorAddress)
    )
  )

  return dataSetItemCreatedEvent
}

export function createDataSetItemVotedEvent(
  id: BigInt,
  voter: Address,
  vote: boolean
): DataSetItemVoted {
  let dataSetItemVotedEvent = changetype<DataSetItemVoted>(newMockEvent())

  dataSetItemVotedEvent.parameters = new Array()

  dataSetItemVotedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  dataSetItemVotedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  dataSetItemVotedEvent.parameters.push(
    new ethereum.EventParam("vote", ethereum.Value.fromBoolean(vote))
  )

  return dataSetItemVotedEvent
}

export function createVerifierJoinedEvent(
  verifierAddress: Address
): VerifierJoined {
  let verifierJoinedEvent = changetype<VerifierJoined>(newMockEvent())

  verifierJoinedEvent.parameters = new Array()

  verifierJoinedEvent.parameters.push(
    new ethereum.EventParam(
      "verifierAddress",
      ethereum.Value.fromAddress(verifierAddress)
    )
  )

  return verifierJoinedEvent
}

export function createVerifierLeftEvent(
  verifierAddress: Address
): VerifierLeft {
  let verifierLeftEvent = changetype<VerifierLeft>(newMockEvent())

  verifierLeftEvent.parameters = new Array()

  verifierLeftEvent.parameters.push(
    new ethereum.EventParam(
      "verifierAddress",
      ethereum.Value.fromAddress(verifierAddress)
    )
  )

  return verifierLeftEvent
}
