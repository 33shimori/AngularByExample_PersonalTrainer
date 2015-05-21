angular.module('main')
				.provider('apikeyAppender', function ()
{
	var apiKey = null;
	this.setApiKey = function (key){
		apiKey = key;
	}
	this.$get = function ($q){
		return{
			'request' : function (config){
				if (apiKey && config && config.url.toLowerCase().indexOf("https://api.mongolab.com") >=0){
					config.params = config.params || {};
					config.params.apiKey = apiKey;
				}
				return config || $q.when(config);
			}
		};
	};
})
