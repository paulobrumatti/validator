const crawlr = require('./crawlr.js');

crawlr(
  [
    {
      url: 'https://beta.stage2.drogasil.com.br/',
      handler: async (simulator) => {
        console.log(JSON.stringify(await simulator.getDataLayer('promotionView')));
        console.log(JSON.stringify(await simulator.getDataLayer('impressionViews')));
       // simulator.click('.produtos a')
      },
    },{
      url: 'https://beta.stage2.drogasil.com.br/carmed-protetor-labial-fini-beijos-com-cor-10g.html',
      handler: async (simulator) => {
        console.log(JSON.stringify(await simulator.getDataLayer('promotionView')));
        console.log(JSON.stringify(await simulator.getDataLayer('impressionViews')));
       // simulator.click('.produtos a')
      },
    }
  ],
  { headless: false }
)
  .then(({ duration, results }) => {
    console.log(`A execução levou ${duration / 1000}s`);

    results.forEach(({ url, requests }) => {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@');
      console.log(`${url}: ${requests.length}`);
      requests.forEach((req) => console.log(req));
    });
  })
  .catch(console.error);
