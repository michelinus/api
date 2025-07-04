Backend API for my nerdminer status website on IPFS. 

**Web3 site: https://minerstatus.unstoppable**

**IPFS hash resolved:**

https://ipfs.io/ipfs/QmWfv9GotoxaA8VHFyTPjoYzX787X2Vn8CGmc38XxuDCqi/
https://bafybeid3zt5wdpbqikqoddnyyv55dcn5u374a4paqqdxdvpuyybgpv7pcu.ipfs.w3s.link/

Unfortunately, websites on IPFS cannot call external websites except self or other little exceptions because of CORS policies.
*raw.githubusercontent.com is one of them though...* 😉

that's why this repository exists.

It needs a cron job on a server (every 3-to-5 minutes) running the api.sh script.

Replace all calls on IPFS website with raw.githubusercontent.com/-your url- and it should be able to resolve all external calls!
