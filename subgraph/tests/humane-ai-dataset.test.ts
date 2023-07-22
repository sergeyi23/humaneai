import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CreatorJoined } from "../generated/schema"
import { CreatorJoined as CreatorJoinedEvent } from "../generated/HumaneAIDataset/HumaneAIDataset"
import { handleCreatorJoined } from "../src/humane-ai-dataset"
import { createCreatorJoinedEvent } from "./humane-ai-dataset-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let creatorAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newCreatorJoinedEvent = createCreatorJoinedEvent(creatorAddress)
    handleCreatorJoined(newCreatorJoinedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CreatorJoined created and stored", () => {
    assert.entityCount("CreatorJoined", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CreatorJoined",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creatorAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
