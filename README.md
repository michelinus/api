Backend API for my nerdminer status website on IPFS. 

**Web3 site: https://minerstatus.unstoppable**

Unfortunately, websites on IPFS cannot call external websites because of CORS policies.

They can call *.githubusercontent.com though...
that's why this repository exists.

It needs a cron job on a server (every 3-to-5 minutes) running the api.sh script.

Replace all calls on IPFS website with raw.githubusercontent.com/-your url- and it should be able to resolve all external calls!
