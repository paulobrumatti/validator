const crawlr = require('./crawlr.js');

crawlr([{
    url: 'http://reviewr.me/site/',
    handler: async simulator => {
      await simulator.click('.btn-video'); // saiba mais

      await simulator.click('.btn-secondary'); // solicite header
      await simulator.click('header .btn-primary'); // solicite home
      await simulator.click('#avaliacoes .btn-primary'); // solicite avaliacoes
      await simulator.click('.session3 .btn-primary'); //solicite depoimento
      await simulator.click('.list-inline .btn-primary'); // solicite a reviewr

      await simulator.click('.social-logos a'); // botões-sociais
      await simulator.click('.review-us-container .social-logos a'); // botões-sociais
    }
  }, {
    url: 'http://reviewr.me/site/register.html',
    handler: async simulator => {
      await simulator.input('#name', {text: 'teste teste'});
      await simulator.input('#mce-EMAIL', {text: 'teste@gmail.com'});
      await simulator.input('#personal_phone', {text: '11987654321'});
      await simulator.input('#company', {text: 'teste'});
      await simulator.click('.btn-register', { button: 'left' });

      await simulator.click('input[type="checkbox"]', { button: 'left' });
      await simulator.click('input[type="radio"]', { button: 'left' });
      await simulator.click('.sendMailchimpForm');
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