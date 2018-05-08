const crawlr = require('./crawlr.js');
const excelizer = require('./excelizer.js');
const data_gen = require('./data_gen');

data_gen.init();

crawlr([{
    url: 'https://m.vestibular.unoparead.com.br',
    handler: async simulator => {
		//pagina 1
    await simulator.click('.btn_main_red', { button: 'left', msg: "clicou no botao da home"});
		//pagina 2
    await simulator.input('input[name="cpf"]', {text: data_gen.generate("cpf")}); //Gera um cpf aleatório
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
	await simulator.selectt('.default_select', {value: '19'}); 
	await simulator.click('#cidades-selectized', {button: 'left'}); 
	await simulator.delay(500);
	await simulator.click('[data-value="01190333"]', {button: 'left'});
	await simulator.waitForSelector('[data-id="4135218"]'); 
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
	await simulator.input('#nascimento', { text: data_gen.generate("datanasc") }); // gera uma data de nascimento aleatorio (18+ anos)
	await simulator.input('[name="rg"]', { text: data_gen.generate("rg") }); // gera um rg aleatorio
	await simulator.input('#cep', { text: data_gen.generate("cep") }); //gera um cep aleatório
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