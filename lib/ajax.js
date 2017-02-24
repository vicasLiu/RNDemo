import { apiHosts } from '../config.js';
import alert from '../lib/alert.js';

// 把键值对转为url
function params2url(params){
	var url = [];
	Object.keys(params || {}).forEach(function(key){
		url.push(key + '=' + params[key]);
	});
	return url.join('&');
}

function join(host, url){
    return host.replace(/\/$/, '') + '/' + url.replace(/^\//, '');
}

function ajax(opt, method) {
    var promise, cfg, { url, host, data } = opt;
    
    // config host
    if(host && apiHosts[host]){
        url = join(apiHosts[host], url);
    };

    // post || get
    if(method === 'post'){
        cfg = {
            method: 'POST',
            form: JSON.stringify(data || {})
        };
    }else{
        url = url + '?' + params2url(data);
        cfg = {
            method: 'GET',
        };
    };
    
    // 发送请求
    promise = fetch(url, cfg);
    
    // 默认json格式
    if(opt.json !== false){
        promise = promise.then((response) => { return response.json(); });
    };

    // 默认检查json.code
    if(opt.checkCode !== false){
        promise = promise.then((json) => { 
            if(json.code != '0'){
                throw json.message || '网络繁忙，请稍后重试';
            }else{
                return json; 
            };
        });
    };

    return promise;
};

module.exports = {

    post: function (opt) {
        return ajax(opt, 'post');
    },

    get: function(opt){
        return ajax(opt, 'get');
    }
}