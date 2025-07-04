let getJSON = function (url, callback) {
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'json';
    req.onload = function () {
        if (req.status == 200) callback(null, req.response);
        else callback(req.status, req.response);
    };
    req.send();
};

async function run() {
    getJSON('https://raw.githubusercontent.com/michelinus/api/refs/heads/main/pooljson.json', async function (err, data) {
        if (err != null) console.error(err);
        else {
            const today = new Date(), dd = String(today.getDate()).padStart(2, '0'), mm = String(today.getMonth() + 1).padStart(2, '0'); //Gennaio è 0!
            let btc = 0, usd = 0, blockdiff = 0, lastblock = 0, probability = 0, bcperblock = 0, color = '#';

            for (let i = 0; i < 6; i++) color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
            document.querySelector('meta[name="theme-color"]').setAttribute('content', color);

            getJSON('https://raw.githubusercontent.com/michelinus/api/refs/heads/main/value.json', function (err, resp) {
                if (err != null) console.error(err);
                else {
                    if (resp != 0) {
                        btc = resp;
                        getJSON('https://raw.githubusercontent.com/michelinus/api/refs/heads/main/valueusd.json' + resp, function (err, resp) {
                            if (err != null) console.error(err);
                            else usd = resp.USD;
                        });
                    }

                    getJSON('https://raw.githubusercontent.com/michelinus/api/refs/heads/main/difficulty.json', function (err, resp) {
                        if (err != null) console.error(err);
                        else blockdiff = resp;
                    });

                    getJSON('https://raw.githubusercontent.com/michelinus/api/refs/heads/main/blockcount.json', function (err, resp) {
                        if (err != null) console.error(err);
                        else lastblock = resp;
                    });

                    getJSON('https://raw.githubusercontent.com/michelinus/api/refs/heads/main/probability.json', function (err, resp) {
                        if (err != null) console.error(err);
                        else probability = resp.toFixed(28);
                    });

                    getJSON('https://raw.githubusercontent.com/michelinus/api/refs/heads/main/bcperblock.json', function (err, resp) {
                        if (err != null) console.error(err);
                        else bcperblock = resp;
                    });
                }
            });

           await new Promise((resolve) => setTimeout(resolve, 650));

            document.getElementById("app").innerHTML = `
            <h1 class="app-title" title="ESP32-S3 Development Board With Screen 0.96 inch ST7735 LCD Display">LILYGO T-DONGLE S3 Bitcoin Lottery Miner</h1>
            <div class="data">
             <img class="photo" alt="Foto reale del miner al lavoro!" title="Foto reale del miner al lavoro!" src="miner.jpg">
             <div align="right">
              <h2 class="stats"><b>Bitcoin minati:</b> ${btc} BTC <span class="small">(${usd}$)</span></h2>
              <p><b>Share totali:</b> ${data.worker[0].shares}</p> 
              <p><b>Ultimo share:</b> ${new Date(data.worker[0].lastshare * 1000).toLocaleString('it-IT')}</p> 
              <p><b>Share migliore:</b> ${data.worker[0].bestever}</p>
              <h2 class="stats">Statistiche:</h2>
              <p><b>Ultimo minuto:</b> ${data.hashrate1m}</p> 
              <p><b>Ultimi 5 minuti:</b> ${data.hashrate5m}</p> 
              <p><b>Ultima ora:</b> ${data.hashrate1hr}</p> 
              <p><b>Ultimo giorno:</b> ${data.hashrate1d}</p> 
              <p><b>Ultimi 7 giorni:</b> ${data.hashrate7d}</p>
              <h2 class="stats">Info Rete:</h2>
              <p><b>Probabilità:</b> ${probability}%</p>
              <p><b>BTC per blocco:</b> ${bcperblock}, <b>Ultimo blocco:</b> ${lastblock}, <b>Share vincente:</b> ${blockdiff}</p>
             </div>
            </div>
            <p class="footer" title="Data avvio: 12 Dicembre 2024\nVersione Software: NerdMinerV2 v1.6.3">Bitcoin miner 24/7 avviato ${Math.round(Math.abs((new Date(2024, 12, 12) - new Date(today.getFullYear(), mm, dd)) / 86400000))} giorni fa.</p>
            <p class="footer">La pagina si aggiorna automaticamente ogni 60 secondi.</p>
            <p class="footer">Tempi di caricamento: ${window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart} ms. Dati aggiornati al ${new Date().toLocaleString('it-IT')}</p>
        `;
        }
    });
}

run();
setInterval(async function () { run(); }, 60000);