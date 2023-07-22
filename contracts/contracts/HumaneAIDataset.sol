// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract HumaneAIDataset {
  // CONSTANTS

  // Stake amount in wei
  // NOTE: using low value for PoC
  uint256 constant STAKE_AMOUNT_WEI = 10000000000000000;

  // Reputation rewards for content creation and verification
  int32 constant VERIFIER_REPUTATION_REWARD = 1;
  int32 constant CREATOR_REPUTATION_REWARD = 10;
  
  // Reputation at which creator and verifier are banned and loosing stake
  int32 constant MIN_REPUTATION = -100;


  
  // ACTORS

  // Creators are creating datasets
  struct Creator {
    address owner;
    int32 reputation;
    bool isActive;
    uint256 stake;
    uint256 timestamp;
  }

  // Verifiers are verifying that data set items satisfy all of the requirements
  struct Verifier {
    address owner;
    int32 reputation;
    bool isActive;
    uint256 stake;
    uint256 timestamp;
  }

  // CONTENT
  
  // Tags assignable to items of a dataset
  // NOTE: This will be struct in the future and will allow add new tags through a proposal mechanisms
  enum Tag {
    Statement,
    Question,
    VerifiedKnowledge
  }

  // Format of the dataset item
  // NOTE: This will be struct in the future and will allow add new formats through a proposal mechanisms
  enum Format {
    Text,
    QuestionAndAnswer
  }

  // Vote of the verifier on the individual data set item
  struct VerifierVote {
    address voter;
    bool vote;
    uint256 timestamp;
  }

  struct DatasetItem {
    uint256 id;
    address author;
    Format format;
    Tag[] tags;
    string contentIpfsHash;
    int32 rating;
    VerifierVote[] votes;
    uint256 timestamp;
  }

  // EVENTS

  event CreatorJoined(address indexed creatorAddress);
  event CreatorLeft(address indexed creatorAddress);
  event VerifierJoined(address indexed verifierAddress);
  event VerifierLeft(address indexed verifierAddress);
  event DataSetItemCreated(uint256 indexed id, address indexed authorAddress);
  event DataSetItemVoted(uint256 indexed id, address indexed voter, bool vote);

  // All registered creators
  mapping(address => Creator) creators;

  // All registered verifiers
  mapping(address => Verifier) verifiers;

  // All dataset items
  mapping(uint256 => DatasetItem) datasetItems;
  uint256 datasetItemsCount;

  function joinAsCreator() public payable {
    address creatorAddress = msg.sender;
    require(!creators[creatorAddress].isActive, "Creator is already active");
    require(msg.value == STAKE_AMOUNT_WEI, "Wrong stake amount");

    Creator storage creator = creators[creatorAddress];
    creator.owner = creatorAddress;
    creator.stake = msg.value;
    creator.isActive = true;
    creator.timestamp = block.timestamp;

    emit CreatorJoined(creatorAddress);
  }

  function leaveAsCreator() public onlyActiveCreator {
    address creatorAddress = msg.sender;
    creators[creatorAddress].isActive = false;
    payable(creatorAddress).transfer(creators[creatorAddress].stake);

    emit CreatorLeft(creatorAddress);
  }

  function joinAsVerifier() public payable {
    address verifierAddress = msg.sender;
    require(!verifiers[verifierAddress].isActive, "Verifier is already active");
    require(msg.value == STAKE_AMOUNT_WEI, "Wrong stake amount");

    Verifier storage verifier = verifiers[verifierAddress];
    verifier.owner = verifierAddress;
    verifier.stake = msg.value;
    verifier.isActive = true;
    verifier.timestamp = block.timestamp;

    emit VerifierJoined(verifierAddress);
  }

  function leaveAsVerifier() public onlyActiveVerifier {
    address verifierAddress = msg.sender;
    verifiers[verifierAddress].isActive = false;
    payable(verifierAddress).transfer(verifiers[verifierAddress].stake);

    emit VerifierLeft(verifierAddress);
  }

  function createDataSetItem(Format format, Tag[] memory tags, string memory ipfsHash) public onlyActiveCreator {
    uint256 id = datasetItemsCount; 
    DatasetItem storage newItem = datasetItems[id];
    newItem.author = msg.sender;
    newItem.format = format;
    newItem.tags = tags;
    newItem.contentIpfsHash = ipfsHash;
    newItem.timestamp = block.timestamp;

    datasetItemsCount++;

    emit DataSetItemCreated(id, msg.sender);
  }

  function voteDataSetItem(uint256 id, bool vote) public onlyActiveVerifier() {
    DatasetItem storage item = datasetItems[id];
    require(item.timestamp > 0, "Item not found");

    for (uint256 i = 0; i < item.votes.length; i++) {
      VerifierVote memory voteItem = item.votes[i];
      require(voteItem.voter != msg.sender, "Already voted");
    }

    int32 oldRating = item.rating;
    int8 rewardMultiplier = vote ? int8(1) : -1;
    int32 newRating = oldRating + rewardMultiplier;
    
    if(item.votes.length == 0) {
      // the first vote
      
      creators[item.author].reputation += rewardMultiplier * CREATOR_REPUTATION_REWARD;
      verifiers[msg.sender].reputation += VERIFIER_REPUTATION_REWARD;
    } else if ( oldRating !=0 && newRating != 0 ) {
      // current vote does not change reputation of the data set item

      if (vote == oldRating > 0) {
        // if vote for current consensus
        verifiers[msg.sender].reputation += VERIFIER_REPUTATION_REWARD;
      } else {
        // if vote against current consensus
        verifiers[msg.sender].reputation -= VERIFIER_REPUTATION_REWARD;
      }
    
    } else if ( newRating == 0 ) {
      for (uint256 i = 0; i < item.votes.length; i++) {
        VerifierVote memory voteItem = item.votes[i];
        
        if(voteItem.vote == oldRating > 0) {
          verifiers[voteItem.voter].reputation -= VERIFIER_REPUTATION_REWARD;
        } else {
          verifiers[voteItem.voter].reputation += VERIFIER_REPUTATION_REWARD;
        }

        if(oldRating > 0) {
          creators[item.author].reputation -= CREATOR_REPUTATION_REWARD;
        } else {
          creators[item.author].reputation += CREATOR_REPUTATION_REWARD;
        }
      }
    } else if (oldRating == 0) {
      // if rating changes value from positive to negative or opposite

      for (uint256 i = 0; i < item.votes.length; i++) {
        VerifierVote memory voteItem = item.votes[i];
        
        if(voteItem.vote == newRating > 0) {
          verifiers[voteItem.voter].reputation += VERIFIER_REPUTATION_REWARD;
        } else {
          verifiers[voteItem.voter].reputation -= VERIFIER_REPUTATION_REWARD;
        }

        if(vote) {
          creators[item.author].reputation += CREATOR_REPUTATION_REWARD;
        } else {
          creators[item.author].reputation -= CREATOR_REPUTATION_REWARD;
        }
      }
    }

    item.rating = newRating;
    item.votes.push(VerifierVote(msg.sender, vote, block.timestamp));

    emit DataSetItemVoted(id, msg.sender, vote);
  }

  function getCreator(address creatorAddress) public view returns (Creator memory) {
    Creator memory result = creators[creatorAddress];
    return result;
  }

  function getVerifier(address verifierAddress) public view returns (Verifier memory) {
    Verifier memory result = verifiers[verifierAddress];
    return result;
  }

  function getDataSetItem(uint256 id) public view returns (DatasetItem memory) {
    DatasetItem memory result = datasetItems[id];
    return result;
  }

  modifier onlyActiveCreator {
      require(creators[msg.sender].isActive, "Already inactive");
      require(creators[msg.sender].reputation >= MIN_REPUTATION, "Reputation too low");
      _;
   }

  modifier onlyActiveVerifier {
      require(verifiers[msg.sender].isActive, "Already inactive");
      require(verifiers[msg.sender].reputation >= MIN_REPUTATION, "Reputation too low");
      _;
   }
}
