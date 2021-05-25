const EEAClient = require("web3-eea");
const Web3 = require("web3");

const fs = require('fs');

const node0PrivateFrom = "Pvoq/2SSAeECW5NWk8HDNw+goyunM4fO6c98Hcb8sWE=" // config/peers/node0/orion/orion.pub 
const node1PrivateFrom = "uTZJh2m639OGGESJ6GAZxHYFttkdVNx9C6OD26B4/SE=" // config/peers/node1/orion/orion.pub
const participants =  [node0PrivateFrom, node1PrivateFrom]
const privateKey = "9e5c50f9c8d81cadcdd53da98ecb466bdeb0e148b7e062b0d673938b3bcddbe8" //Random key
const privacyGroupId = "UVZoQkxVbE9SekF3TURBd01EQXdNREF3TURBd01EQXc=" //blockchain-smartcontracts project, in environment/env_besu.json
const host = "http://127.0.0.1:22001"; //configured in config/peers/node0/docker-compose.yaml
const chainId = 2021; //from config/network/genesis.json

const eea = new EEAClient(new Web3(host),chainId);

//Create privacy group
console.log("Creating privacy group with id",privacyGroupId,"and participants", participants);
eea.privx.createPrivacyGroup(
    {
    participants:participants,
    enclaveKey: node0PrivateFrom,
    privateFrom: node0PrivateFrom,
    privateKey: privateKey,
    privacyGroupId:privacyGroupId
    }
).then(async (onChainPrivacyGroupCreationResult)=>{

    const findResult = await eea.privx.findOnChainPrivacyGroup({
        addresses: [node0PrivateFrom, node1PrivateFrom]
    });
    let currentPrivacyGroup = findResult[0].privacyGroupId;
    if (currentPrivacyGroup === privacyGroupId){
        console.log("Success")
    }
    else{
        console.log("Error creating privacy group: expected id ", privacyGroupId , "actual:",currentPrivacyGroup);
    }
})

