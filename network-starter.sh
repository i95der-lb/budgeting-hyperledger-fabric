MYPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ORGSPATH="${MYPATH}/../test-network/organizations/peerOrganizations"

select_org1 () {
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_MSPCONFIGPATH="$MYPATH/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp"
    export CORE_PEER_TLS_ROOTCERT_FILE="$MYPATH/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"
    export CORE_PEER_ADDRESS="localhost:7051"
}

select_org2 () {
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE="$MYPATH/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt"
    export CORE_PEER_TLS_ROOTCERT_FILE="$MYPATH/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt"
    export CORE_PEER_MSPCONFIGPATH="$MYPATH/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp"
    export CORE_PEER_ADDRESS="localhost:9051"
}

export PATH="$MYPATH/../bin:$PATH"
export FABRIC_CFG_PATH="$MYPATH/../config/"

cd "${MYPATH}/../test-network/"

# shut down all channels
./network.sh down 
# create new network and join to channel 
./network.sh up createChannel -ca -s couchdb





cp "${ORGSPATH}/org1.example.com/connection-org1.yaml" "${MYPATH}/organization/marketing/gateway/"
cp "${ORGSPATH}/org2.example.com/connection-org2.yaml" "${MYPATH}/organization/sales/gateway/"

cp ${ORGSPATH}/org1.example.com/users/User1@org1.example.com/msp/signcerts/* ${ORGSPATH}/org1.example.com/users/User1@org1.example.com/msp/signcerts/User1@org1.example.com-cert.pem
cp ${ORGSPATH}/org1.example.com/users/User1@org1.example.com/msp/keystore/* ${ORGSPATH}/org1.example.com/users/User1@org1.example.com/msp/keystore/priv_sk

cp ${ORGSPATH}/org2.example.com/users/User1@org2.example.com/msp/signcerts/* ${ORGSPATH}/org2.example.com/users/User1@org2.example.com/msp/signcerts/User1@org2.example.com-cert.pem
cp ${ORGSPATH}/org2.example.com/users/User1@org2.example.com/msp/keystore/* ${ORGSPATH}/org2.example.com/users/User1@org2.example.com/msp/keystore/priv_sk




# create chaincode pkg 
# peer lifecycle chaincode package basic.tar.gz --path ../asset-transfer-basic/chaincode-javascript/ --lang node --label basic_1.0
# sleep 1
# # select Org1 Peer
# select_org1

# sleep 1
# # Install chaincode on Org1 Peer
# peer lifecycle chaincode install basic.tar.gz
# sleep 1
# # select Org2 Peer
# select_org2
# sleep 1
# # install chaincode on Org2 Peer
# peer lifecycle chaincode install basic.tar.gz
# sleep 1
# # save chaincode ID
# CHAINCODE_ID=$(peer lifecycle chaincode queryinstalled | sed -n '2p' | cut -f 2- -d ':' | cut -f 1 -d ',')
# # echo $CHAINCODE_ID

# # save chaincode id as env var
# export CC_PACKAGE_ID=$CHAINCODE_ID
# sleep 1
# # approve chaincode for Org2 
# peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID $channelName --name basic --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
# sleep 1
# # select Org1 Peer
# select_org1
# sleep 1
# # approve chaincode for Org1 
# peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID $channelName --name basic --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
# sleep 1
# # check chaincode commits
# peer lifecycle chaincode checkcommitreadiness --channelID $channelName --name basic --version 1.0 --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --output json
# sleep 1
# # commit chaincode to channel 
# peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID $channelName --name basic --version 1.0 --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
# sleep 1
# # confirm chaincode commitment
# peer lifecycle chaincode querycommitted --channelID $channelName --name basic --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

# sleep 1

# # invoke chaincode
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"InitLedger","Args":[]}'

# sleep 1
# peer chaincode query -C mychannel -n basic -c '{"Args":["GetAllAssets"]}'





cd $MYPATH