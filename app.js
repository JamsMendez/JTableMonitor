var phantom = require('phantom');
var async = require('async');

async.forever(function (next) {

//URL public
var url = 'http://lightswitch05.github.io/table-to-json';

phantom.create(function (ph) {
	ph.createPage(function (page) {
		page.open(url, function (status) {
			if(status == 'success'){
				page.injectJs('lib/jquery-2.0.3.min.js', function (status) {
					if(status){
						page.injectJs('lib/table-to-json.min.js', function(status) {
							if(status){
								setTimeout(function() {
									return page.evaluate(function() {
										// selector of table
										var table = $('#example-table').tableToJSON();
										return {
											table: table
										};
									}, function(err,result) {
										if(!err){
											console.log(result);
											next();
										}else{
											console.log("Error, reader data");
										}
										ph.exit();
									});
								}, 5000);
							}else{
								console.log('Error, loader lib table-to-json');
							}
						});
					}else{
						console.log('Error, loader lib jquery');
					}
				});
			}else{
				console.log('Error, URL request');
			}
		});
	});
});

}, function (err) {
	console.log('Error, forever');
});
