cd api-build
rm -rf api/*.json
curl https://pool.nerdminers.org/users/[btcaddress] -o pooljson.json
curl https://blockchain.info/q/addressbalance/[btcaddress] -o value.json
cat value.json | { read value; if [value -ne 0]; then curl https://api.coinconvert.net/convert/btc/usd?amount=$value -o valueusd.json; fi }
curl https://blockchain.info/q/getdifficulty -o difficulty.json
curl https://blockchain.info/q/getblockcount -o blockcount.json
curl https://blockchain.info/q/probability -o probability.json
curl https://blockchain.info/q/bcperblock -o bcperblock.json
mv *.json api
cd api
git remote set-url origin git@github.com:michelinus/api.git
git add .
git commit -a -m "updated api"
git push -u origin main
