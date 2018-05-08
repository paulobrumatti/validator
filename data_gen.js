const request = require('sync-request');
const Leite = require('leite');
const leite = new Leite();
const CPF = require('gerador-validador-cpf');

ceps = [];

const cep_valido = function(){

	return ceps[getRandomInt(0, ceps.length)];

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


const data_gen = {

init : function(){
	var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('ceps.txt')
	});

	lineReader.on('line', function (line) {
	  ceps.push(line);
	});
},
generate : function(data, formatted = false){
	
	let val = "96200030";
	switch(data.toLowerCase()){
		
		case 'cpf':
			val = CPF.generate();
			if(!formatted){
				val = CPF.format(val, 'digits');
			}
			break;
		case 'rg':
			val = leite.pessoa.rg({formatado : formatted});
			break;
		case 'cep':
			val = cep_valido();
			break;
		case 'datanasc':
			let frm = "DDMMYYYY";
			if(formatted){
				frm = "DD/MM/YYYY";
			}
			val = leite.pessoa.nascimento({formato: frm, string: true, idade: 23});
			break;
	}
	
	return val;
}

}

function removerAcentos( newStringComAcento ) {
  var string = newStringComAcento;
	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		e : /[\xE8-\xEB]/g,
		i : /[\xEC-\xEF]/g,
		o : /[\xF2-\xF6]/g,
		u : /[\xF9-\xFC]/g,
		c : /\xE7/g,
		n : /\xF1/g
	};

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string;
}

module.exports = data_gen;