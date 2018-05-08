const crawlr = require('./crawlr.js');
const excelizer = require('./excelizer.js');

crawlr([{
    url: 'https://m.vestibular.unoparead.com.br',
    handler: async simulator => {
		//pagina 1
    await simulator.click('.btn_main_red', { button: 'left', msg: "clicou no botao da home"}); //Parametro opcional para texto (bem util para SPA)
		//pagina 2
    await simulator.input('input[name="cpf"]', {text: '90509214002'});
	await simulator.delay(2000);
	await simulator.input('input[name="nome"]', {text: 'Monark'});
	await simulator.input('input[name="sobrenome"]', {text: 'Teste'});
    await simulator.input('input[name="celular"]', {text: '11111111111'});
    await simulator.input('input[name="email"]', {text: 'monark@memes.com'});
	await simulator.click('button.btn_main_red', { button: 'left', msg: "clicou no botao dos inputs" }); 
		//pagina 3
	await simulator.delay(1000);
	await simulator.click('.choice_option_block div:nth-child(2)', { button: 'left', msg: "clicou no botao da segunda graduacao"}); 
		//pagina 4
	await simulator.selectt('.default_select', {value: '19'}); //seleciona o option 19 do select
	await simulator.click('#cidades-selectized', {button: 'left'}); //outro tipo de select, clique manual (não é um select de verdade)
	await simulator.delay(500);
	await simulator.click('[data-value="01190333"]', {button: 'left'});//seleciona essa opção do segundo select
	await simulator.waitForSelector('[data-id="4135218"]'); //espera carregar a parte de polos
	await simulator.click('[data-id="4135218"]', {button: 'left'}); 
	await simulator.delay(500);
    await simulator.click('.btn_main_red', { button: 'left', msg: "clicou no botao terminando a seleção de polo"});
		//pagina 5
	await simulator.click('.choose_course_not_selected', { button: 'left' });	
	await simulator.delay(500);
	await simulator.selectt('.default_select', { value: '6'});
	await simulator.click('[data-id="10147"]', {button: 'left'});
    await simulator.click('.btn_main_blue', { button: 'left', msg: "clicou no botao 'quero este curso'"}); 
		//pagina 6
	await simulator.input('#nascimento', { text: '23121956' });
	await simulator.input('[name="rg"]', { text: '341290609' });
	await simulator.input('#cep', { text: '59012194' });
	await simulator.input('[name="numero"]', { text: '134' });
	await simulator.input('#telefone', { text: '11222222222' });
	await simulator.selectt('[name="comoConheceu"]', {value: '11'});
	await simulator.click('#checkbox_termos', { button: 'left'});
	await simulator.click('.btn_main_red', { button: 'left', msg: "clicou no botao após aceitar os termos"});

		//TODO: terminar inscrição
    }
  }], { headless: false })
  .then(({ duration, results }) => {
    console.log(`A execução levou ${duration/1000}s`);
	excelizer(duration, results, {dl: "URL", dp: "Virtual Pageview", ec: "Category", ea: "Action", el: "Label"}); //o terceiro parametro é um objeto com os values que são importantes para ver no request (opcional)
  })
  .catch(console.error);