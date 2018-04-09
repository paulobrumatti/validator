const crawlr = require('./crawlr.js');

crawlr([{
    url: 'https://www.dp6.com.br/servicos/mesas-salas-de-performance/',
    handler: async simulator => {
      await simulator.click('a[href="https://blog.dp6.com.br/"]');
      await simulator.input('.elementor-form-fields-wrapper > div.elementor-field-group > textarea');
    }
  }, {
    url: 'http://autos.dp6.com.br/',
    handler: async simulator => {
      await simulator.click('.menu-lista-download');
    }
  }, {
    url: 'http://autos.dp6.com.br/analise_setorial.html',
    handler: async simulator => {
      await simulator.click('.card-montadoras[data-name="Volkswagen"]');
    }
  }], { headless: false })
  .then(({ duration, results }) => {
    console.log(`A execução levou ${duration/1000}s`);

    results.forEach(({ url, requests }) => {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@')
      console.log(`${url}: ${requests.length}`);
      requests.forEach(req => console.log(req));
    });
  })
  .catch(console.error);