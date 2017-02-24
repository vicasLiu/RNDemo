'use strict';

var Util = {
	cTimestamp : function() {
		//201508061018417065
		var dt = new Date();
		var y = dt.getFullYear();
		var M = dt.getMonth()+1;
		var d = dt.getDate();
		var h = dt.getHours();
		var m = dt.getMinutes();
		var sec = dt.getSeconds();
		var minsec = dt.getMilliseconds();
		var str = y + "";
		if( M < 10 ) {
			str += "0"+M;
		}else{
			str += M;
		}
		if( d < 10 ) {
			str += "0"+d;
		}else{
			str += d;
		}
		if( h < 10 ) {
			str += "0"+h;
		}else{
			str += h;
		}
		if( m < 10 ) {
			str += "0"+m;
		}else{
			str += m;
		}
		if( sec < 10 ) {
			str += "0"+sec;
		}else{
			str += sec;
		}
		if( minsec < 1000 ) {
			str += "0"+minsec;
		}else{
			str += minsec;
		}
		return str;
	},
	generateUUID : function(){
	    var d = new Date().getTime();
	    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    return uuid;
	},
	isInt : function( val ) {
		var patrn = /^[0-9]\d*$/;
		if (!patrn.exec(val)) return false;
		return true;
	},
	isIDCard : function( val ) {
		var patrn = /^\d{15}(\d{2}[A-Za-z0-9])?$/;
		if (!patrn.exec(val)) return false;
		return true;
	},
	isPhone : function( val ) {
		var patrn = /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
		if (!patrn.exec(val)) return false;
		return true;
	},
	isMobile : function( val ) {
		var patrn = /^0?1[2-9]\d{9}$/;
		if (!patrn.exec(val)) return false;
		return true;
	},
	numberFormat : function( value ) {
		value = value.replace(/[^\d.]/g, "");
    	value = value.replace(/^\./g, "").replace(/\.{2,}/g, ".");
    	value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d)*$/, '$1$2');
		return value;
	},
	floatFormat : function( value ) {
		value = value.replace(/[^\d.]/g, "");
    	value = value.replace(/^\./g, "").replace(/\.{2,}/g, ".");
    	value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    	return value;
	},
	// 获取几分钟前、几小时前、几天前等时间差
	timeDifference : function(publishTime){
		var d_seconds
		  , d_minutes
		  , d_hours
		  , d_days
		  , timeNow = Date.parse(new Date())
		  , d = (timeNow - publishTime)/1000
		  ;
		d_days = parseInt(d/86400);   // 天
		d_hours = parseInt(d/3600);   // 时
		d_minutes = parseInt(d/60);   // 分
		d_seconds = parseInt(d);      // 秒

		if(d_days > 0 && d_days < 4) {
			return d_days+"天前";
		}
		else if(d_days <= 0 && d_hours > 0) {
			return d_hours + "小时前";
		}
		else if(d_hours <= 0 && d_minutes > 0) {
			return d_minutes+"分钟前";
		}
		else if(d_minutes <= 0 && d_seconds >= 0) {
			return d_seconds+"秒前";
		}
		else{
			var s = new Date(publishTime);
			return s.getFullYear() + '年' + (s.getMonth() + 1) + "月" + s.getDate() + "日 " + s.getHours() + ':' + ':' + s.getMinutes() + ':' + s.getSeconds();
		}
	},
	formatDate: function (date) {
		var dt = new Date(date);
		var y = dt.getFullYear();
		var M = dt.getMonth() + 1;
		var d = dt.getDate();
		var h = dt.getHours();
		var m = dt.getMinutes();
		var sec = dt.getSeconds();
		var minsec = dt.getMilliseconds();
		var str = y + ".";
		if (M < 10) {
			str += "0" + M;
		} else {
			str += M;
		}
		str += '.';
		if (d < 10) {
			str += "0" + d;
		} else {
			str += d;
		}
		str += ' ';
		if (h < 10) {
			str += "0" + h;
		} else {
			str += h;
		}
		str += ':';
		if (m < 10) {
			str += "0" + m;
		} else {
			str += m;
		}
		str += ':';
		if (sec < 10) {
			str += "0" + sec;
		} else {
			str += sec;
		}
		return str;
	},
	formatUrlParam : function( id ) {
		id = id.split("?")[1];
		if (id == "" || id == null || typeof id == "undefined") {
			id = "";
		}
		var arrayObj = id.match(/([^?=&]+)(=([^&]*))?/g);
		var returnMap = {};
		if (arrayObj == null) return returnMap;
		for (var i = 0; i < arrayObj.length; i++) {
			var conment = arrayObj[i];
			var key = decodeURIComponent(conment.substring(0, conment.indexOf("=")));
			var value = decodeURIComponent(conment.substring(conment.indexOf("=") + 1, conment.length));
			returnMap[key] = value;
		};
		if(id == "undefined") {
			return null;
		}else{
			return returnMap;
		}
	}
};
module.exports = Util;
