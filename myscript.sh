DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ORG1_PATH="$DIR/organization/marketing"
ORG2_PATH="$DIR/organization/sales"

docker rm -f $(docker ps -aq) && docker rmi -f $(docker images | grep dev | awk '{print $3}') && docker volume prune -f

rm -rf $ORG1_PATH/identity $ORG1_PATH/bg.tar.gz
rm -rf $ORG2_PATH/identity $ORG2_PATH/bg.tar.gz

./network-starter.sh

cd $ORG2_PATH
source org2.sh
source 1.sh

cd $ORG1_PATH
source org1.sh
source 1.sh

cd $ORG2_PATH
source org2.sh
source 2.sh

cd application

node addToWallet.js

node request.js
node reforecast.js
node approve.js
node issue.js