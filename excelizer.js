const excelizer = function(duration, results, req_params = {v:"",_v:"",a:"",t:"",ni:"",_s:"",dl:"",dp:"",dh:"",ul:"",de:"",dt:"",sd:"",sr:"",
vp:"",je:"",_u:"",jid:"",gjid:"",cid:"",tid:"",_gid:"",_r:"",gtm:"",z:"", ec:"", ea:"", el:""
	}) {
		
	let excel = require('excel4node');
	
	let workbook = new excel.Workbook();
	
	var worksheet = workbook.addWorksheet('Resultado');
	
	var header_style = workbook.createStyle({
		font: {
			color: '#000000',
			size: 12
		},
		fill:{
			type: 'pattern',
			patternType: 'solid',
			fgColor: '#8ea9db'
		}
	});
	
	var custom_text_style = workbook.createStyle({
		font: {
			color: '#000000',
			size: 12
		},
		fill:{
			type: 'pattern',
			patternType: 'solid',
			fgColor: '#f4b084'
		}
	});
	
	var request_type_style = workbook.createStyle({
		font: {
			color: '#000000',
			size: 12
		},
		fill:{
			type: 'pattern',
			patternType: 'solid',
			fgColor: '#d9e1f2'
		}
	});
	
	var cell = 1;
	results.forEach(({ url, requests }) => {	  
	  worksheet.cell(cell, 1, cell, 3, true).string(`${url}: ${requests.length}\n`).style(header_style);
	  
	  cell++;
	  
      requests.forEach(function(reque) { 
		var req = eval(reque);
		if(req.title == undefined){ //não é custom message
			worksheet.cell(cell, 1, cell, 3, true).string(req.t).style(request_type_style);
			cell++;
			for(var prop in req){
				if(req_params[prop] != undefined){
					var name = req_params[prop];
					if(name.length <= 1){
						name = prop;
					}
					worksheet.cell(cell, 2).string(name).style(request_type_style);
					worksheet.cell(cell, 3).string(req[prop]).style(request_type_style);
					cell++;
				}

			}
		  }
		  else{ //é custom message
			  worksheet.cell(cell, 1).string(req.title).style(custom_text_style);
			  worksheet.cell(cell, 2, cell, 3, true).string(req.text).style(custom_text_style);
			  cell++;
		  }
	  });
	  
    });
	
	workbook.write('Result.xlsx');
}

module.exports = excelizer;