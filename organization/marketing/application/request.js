
const { Wallets, Gateway } = require('fabric-network')
const fs = require('fs')
const yaml = require('js-yaml')
const Budget = require('../contract/lib/budget')

const main = async () => {
    const wallet = await Wallets.newFileSystemWallet('../identity/user/isabella/wallet')
    const gateway = new Gateway()

    try {
        const userName = 'isabella'
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/connection-org1.yaml', 'utf8'));
        let connectionOptions = {
            identity: userName,
            wallet,
            discovery: { enabled:true, asLocalhost: true }
        };
        await gateway.connect(connectionProfile, connectionOptions);
        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('budgetingcontract', 'org.budgetnet.budget');
        const requestBudget = await contract.submitTransaction('request', 'Sales', '00001', '2020-10-3', '5000', 'High', 'For Production');
        let budget = Budget.fromBuffer(requestBudget)
        console.log('Department: ', budget.department)
        console.log('Budget #: ', budget.number)
        console.log('Transaction Complete')

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