'use strict';
var routeConfig = null;
var requestParaMap = function(url) {
	if (url == "" || url == null || typeof url == "undefined") {
		url = "";
	}
	var arrayObj = url.match(/([^?=&]+)(=([^&]*))?/g);
	var returnMap = {};
	if (arrayObj == null) return returnMap;
	for (var i = 0; i < arrayObj.length; i++) {
		var conment = arrayObj[i];
		var key = decodeURIComponent(conment.substring(0, conment.indexOf("=")));
		var value = decodeURIComponent(conment.substring(conment.indexOf("=") + 1, conment.length));
		returnMap[key] = value;
	};
	if(url == "undefined") {
		return null;
	}else{
		return returnMap;
	}
};
var Core = {
    nextPage : function( page, param, navigator ) {
		var rt = routeConfig[page];
		var Page = rt.Page;
		var title = rt.title;
        navigator.push({
            title: title,
            component : Page,
            passProps : param
        });
    },
	backPage : function( page, param, navigator ) {
		var rt = routeConfig[page];
		var Page = rt.Page;
		var title = rt.title;
		navigator.popToRoute(page);
	},
	setRoute : function( cof ) {
		routeConfig = cof;
	},
    getUrlParam : function( url ) {
        return requestParaMap(url);
    }
};
module.exports = Core;
