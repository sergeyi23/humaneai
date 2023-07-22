// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class CreatorJoined extends ethereum.Event {
  get params(): CreatorJoined__Params {
    return new CreatorJoined__Params(this);
  }
}

export class CreatorJoined__Params {
  _event: CreatorJoined;

  constructor(event: CreatorJoined) {
    this._event = event;
  }

  get creatorAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class CreatorLeft extends ethereum.Event {
  get params(): CreatorLeft__Params {
    return new CreatorLeft__Params(this);
  }
}

export class CreatorLeft__Params {
  _event: CreatorLeft;

  constructor(event: CreatorLeft) {
    this._event = event;
  }

  get creatorAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class DataSetItemCreated extends ethereum.Event {
  get params(): DataSetItemCreated__Params {
    return new DataSetItemCreated__Params(this);
  }
}

export class DataSetItemCreated__Params {
  _event: DataSetItemCreated;

  constructor(event: DataSetItemCreated) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get authorAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class DataSetItemVoted extends ethereum.Event {
  get params(): DataSetItemVoted__Params {
    return new DataSetItemVoted__Params(this);
  }
}

export class DataSetItemVoted__Params {
  _event: DataSetItemVoted;

  constructor(event: DataSetItemVoted) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get vote(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class VerifierJoined extends ethereum.Event {
  get params(): VerifierJoined__Params {
    return new VerifierJoined__Params(this);
  }
}

export class VerifierJoined__Params {
  _event: VerifierJoined;

  constructor(event: VerifierJoined) {
    this._event = event;
  }

  get verifierAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class VerifierLeft extends ethereum.Event {
  get params(): VerifierLeft__Params {
    return new VerifierLeft__Params(this);
  }
}

export class VerifierLeft__Params {
  _event: VerifierLeft;

  constructor(event: VerifierLeft) {
    this._event = event;
  }

  get verifierAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class HumaneAIDataset__getCreatorResultValue0Struct extends ethereum.Tuple {
  get owner(): Address {
    return this[0].toAddress();
  }

  get reputation(): i32 {
    return this[1].toI32();
  }

  get isActive(): boolean {
    return this[2].toBoolean();
  }

  get stake(): BigInt {
    return this[3].toBigInt();
  }

  get timestamp(): BigInt {
    return this[4].toBigInt();
  }
}

export class HumaneAIDataset__getDataSetItemResultValue0Struct extends ethereum.Tuple {
  get id(): BigInt {
    return this[0].toBigInt();
  }

  get author(): Address {
    return this[1].toAddress();
  }

  get format(): i32 {
    return this[2].toI32();
  }

  get tags(): Array<i32> {
    return this[3].toI32Array();
  }

  get contentIpfsHash(): string {
    return this[4].toString();
  }

  get rating(): i32 {
    return this[5].toI32();
  }

  get votes(): Array<HumaneAIDataset__getDataSetItemResultValue0VotesStruct> {
    return this[6].toTupleArray<
      HumaneAIDataset__getDataSetItemResultValue0VotesStruct
    >();
  }

  get timestamp(): BigInt {
    return this[7].toBigInt();
  }
}

export class HumaneAIDataset__getDataSetItemResultValue0VotesStruct extends ethereum.Tuple {
  get voter(): Address {
    return this[0].toAddress();
  }

  get vote(): boolean {
    return this[1].toBoolean();
  }

  get timestamp(): BigInt {
    return this[2].toBigInt();
  }
}

export class HumaneAIDataset__getVerifierResultValue0Struct extends ethereum.Tuple {
  get owner(): Address {
    return this[0].toAddress();
  }

  get reputation(): i32 {
    return this[1].toI32();
  }

  get isActive(): boolean {
    return this[2].toBoolean();
  }

  get stake(): BigInt {
    return this[3].toBigInt();
  }

  get timestamp(): BigInt {
    return this[4].toBigInt();
  }
}

export class HumaneAIDataset extends ethereum.SmartContract {
  static bind(address: Address): HumaneAIDataset {
    return new HumaneAIDataset("HumaneAIDataset", address);
  }

  getCreator(
    creatorAddress: Address
  ): HumaneAIDataset__getCreatorResultValue0Struct {
    let result = super.call(
      "getCreator",
      "getCreator(address):((address,int32,bool,uint256,uint256))",
      [ethereum.Value.fromAddress(creatorAddress)]
    );

    return changetype<HumaneAIDataset__getCreatorResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getCreator(
    creatorAddress: Address
  ): ethereum.CallResult<HumaneAIDataset__getCreatorResultValue0Struct> {
    let result = super.tryCall(
      "getCreator",
      "getCreator(address):((address,int32,bool,uint256,uint256))",
      [ethereum.Value.fromAddress(creatorAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<HumaneAIDataset__getCreatorResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getDataSetItem(
    id: BigInt
  ): HumaneAIDataset__getDataSetItemResultValue0Struct {
    let result = super.call(
      "getDataSetItem",
      "getDataSetItem(uint256):((uint256,address,uint8,uint8[],string,int32,(address,bool,uint256)[],uint256))",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );

    return changetype<HumaneAIDataset__getDataSetItemResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getDataSetItem(
    id: BigInt
  ): ethereum.CallResult<HumaneAIDataset__getDataSetItemResultValue0Struct> {
    let result = super.tryCall(
      "getDataSetItem",
      "getDataSetItem(uint256):((uint256,address,uint8,uint8[],string,int32,(address,bool,uint256)[],uint256))",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<HumaneAIDataset__getDataSetItemResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getVerifier(
    verifierAddress: Address
  ): HumaneAIDataset__getVerifierResultValue0Struct {
    let result = super.call(
      "getVerifier",
      "getVerifier(address):((address,int32,bool,uint256,uint256))",
      [ethereum.Value.fromAddress(verifierAddress)]
    );

    return changetype<HumaneAIDataset__getVerifierResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getVerifier(
    verifierAddress: Address
  ): ethereum.CallResult<HumaneAIDataset__getVerifierResultValue0Struct> {
    let result = super.tryCall(
      "getVerifier",
      "getVerifier(address):((address,int32,bool,uint256,uint256))",
      [ethereum.Value.fromAddress(verifierAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<HumaneAIDataset__getVerifierResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }
}

export class CreateDataSetItemCall extends ethereum.Call {
  get inputs(): CreateDataSetItemCall__Inputs {
    return new CreateDataSetItemCall__Inputs(this);
  }

  get outputs(): CreateDataSetItemCall__Outputs {
    return new CreateDataSetItemCall__Outputs(this);
  }
}

export class CreateDataSetItemCall__Inputs {
  _call: CreateDataSetItemCall;

  constructor(call: CreateDataSetItemCall) {
    this._call = call;
  }

  get format(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get tags(): Array<i32> {
    return this._call.inputValues[1].value.toI32Array();
  }

  get ipfsHash(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class CreateDataSetItemCall__Outputs {
  _call: CreateDataSetItemCall;

  constructor(call: CreateDataSetItemCall) {
    this._call = call;
  }
}

export class JoinAsCreatorCall extends ethereum.Call {
  get inputs(): JoinAsCreatorCall__Inputs {
    return new JoinAsCreatorCall__Inputs(this);
  }

  get outputs(): JoinAsCreatorCall__Outputs {
    return new JoinAsCreatorCall__Outputs(this);
  }
}

export class JoinAsCreatorCall__Inputs {
  _call: JoinAsCreatorCall;

  constructor(call: JoinAsCreatorCall) {
    this._call = call;
  }
}

export class JoinAsCreatorCall__Outputs {
  _call: JoinAsCreatorCall;

  constructor(call: JoinAsCreatorCall) {
    this._call = call;
  }
}

export class JoinAsVerifierCall extends ethereum.Call {
  get inputs(): JoinAsVerifierCall__Inputs {
    return new JoinAsVerifierCall__Inputs(this);
  }

  get outputs(): JoinAsVerifierCall__Outputs {
    return new JoinAsVerifierCall__Outputs(this);
  }
}

export class JoinAsVerifierCall__Inputs {
  _call: JoinAsVerifierCall;

  constructor(call: JoinAsVerifierCall) {
    this._call = call;
  }
}

export class JoinAsVerifierCall__Outputs {
  _call: JoinAsVerifierCall;

  constructor(call: JoinAsVerifierCall) {
    this._call = call;
  }
}

export class LeaveAsCreatorCall extends ethereum.Call {
  get inputs(): LeaveAsCreatorCall__Inputs {
    return new LeaveAsCreatorCall__Inputs(this);
  }

  get outputs(): LeaveAsCreatorCall__Outputs {
    return new LeaveAsCreatorCall__Outputs(this);
  }
}

export class LeaveAsCreatorCall__Inputs {
  _call: LeaveAsCreatorCall;

  constructor(call: LeaveAsCreatorCall) {
    this._call = call;
  }
}

export class LeaveAsCreatorCall__Outputs {
  _call: LeaveAsCreatorCall;

  constructor(call: LeaveAsCreatorCall) {
    this._call = call;
  }
}

export class LeaveAsVerifierCall extends ethereum.Call {
  get inputs(): LeaveAsVerifierCall__Inputs {
    return new LeaveAsVerifierCall__Inputs(this);
  }

  get outputs(): LeaveAsVerifierCall__Outputs {
    return new LeaveAsVerifierCall__Outputs(this);
  }
}

export class LeaveAsVerifierCall__Inputs {
  _call: LeaveAsVerifierCall;

  constructor(call: LeaveAsVerifierCall) {
    this._call = call;
  }
}

export class LeaveAsVerifierCall__Outputs {
  _call: LeaveAsVerifierCall;

  constructor(call: LeaveAsVerifierCall) {
    this._call = call;
  }
}

export class VoteDataSetItemCall extends ethereum.Call {
  get inputs(): VoteDataSetItemCall__Inputs {
    return new VoteDataSetItemCall__Inputs(this);
  }

  get outputs(): VoteDataSetItemCall__Outputs {
    return new VoteDataSetItemCall__Outputs(this);
  }
}

export class VoteDataSetItemCall__Inputs {
  _call: VoteDataSetItemCall;

  constructor(call: VoteDataSetItemCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get vote(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class VoteDataSetItemCall__Outputs {
  _call: VoteDataSetItemCall;

  constructor(call: VoteDataSetItemCall) {
    this._call = call;
  }
}
