
// 把URL中的参数转为键值对对象
function url2params(url){
	var params = {};
	((url || '').split('?')[1] || '').split('#')[0].split('&').forEach(function(pair){
		pair = pair.split('=');
		if(pair[0]){
			params[pair[0]] = pair[1] || '';
		}
	});
	return params;
}

// 把键值对转为url
function params2url(params){
	var url = [];
	Object.keys(params || {}).forEach(function(key){
		url.push(key + '=' + params[key]);
	});
	return url.join('&');
}

module.exports = {
    post: function (opt) {
        console.info(opt)
        return fetch(opt.url, {
            method: 'POST',
            form: JSON.stringify(opt.data || {})
        }).then(function (response) {
            return response.json();
        });
    },
    get: function (opt) {
        return fetch(opt.url + '?' + params2url(opt.data), {
            method: 'GET',
        }).then(function (response) {
            return response.json();
        });
    }
}