var phantom = require('node-phantom');
var async = require('async');

async.forever(function (next) {
	/*
		URL de la página de donde se extraen los datos
	*/
	var url = 'http://lightswitch05.github.io/table-to-json';
	phantom.create(function(err,ph) {
		if(!err){
		  return ph.createPage(function(err,page) {
		  	if(!err){
			    return page.open(url, function(err,status) {
			      console.log("status de página", status);
			      
			      page.injectJs(__dirname + '/lib/jquery-2.0.3.min.js', function(err) {

			      	page.injectJs(__dirname + '/lib/table-to-json.min.js', function(err) {	
									        
				      	if(!err){

					        setTimeout(function() {
					          return page.evaluate(function() {
					          	/* 
					          		Selector de la tabla de datos 
					          	*/
											var table = $('#example-table').tableToJSON();

					            return {
					              table: table 
					            };
					          }, function(err,result) {
					          	if(!err){
					          		console.log(result);
					          		next();
					          	}else{
					          		console.log("Error de Lectura de Datos");
					          	}
					            ph.exit();
					          });
					        }, 5000);

				      	}else{
				      		console.log("Error de lib de javascript");
				      	}

				      });	

			      });


			    });
				}else{
					console.log("Error createPage");
				}
		  });
		}else{
			console.log("Error create");
		}
	});
}, function (err) {
	if(err){
		console.log("Error de Lectura de Datos");
	}
});

/* El proceso de actualización cada 15 - 20 seg aproximadamente /*

