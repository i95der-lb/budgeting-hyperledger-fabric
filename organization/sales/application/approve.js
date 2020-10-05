
const { Wallets, Gateway } = require('fabric-network')
const fs = require('fs')
const yaml = require('js-yaml')

const main = async () => {
    const wallet = await Wallets.newFileSystemWallet('../identity/user/isabella/wallet')
    const gateway = new Gateway()

    try {
        const userName = 'isabella'
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/connection-org2.yaml', 'utf8'));
        let connectionOptions = {
            identity: userName,
            wallet,
            discovery: { enabled:true, asLocalhost: true }
        };
        await gateway.connect(connectionProfile, connectionOptions);
        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('budgetingcontract');
        const approveBudget = await contract.submitTransaction('approve' ,'sales', '0001')
        console.log(approveBudget.toString())

    } catch(e) {
        console.log(e)
    } finally {
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();
    }
}

main().then(() => {
    console.log('Request Completed')
}).catch((e) => {
    console.log(e.message)
})