(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.RedMantis = factory());
}(this, (function () { 'use strict';

  var target = typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
      ? global
      : {};

  if (typeof target.axios === 'undefined') {
  	return {
  		error: true
  	}
  } else {
  	var ax = target.axios
  }


	function forEachValue (obj, fn) {
    Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
  }

  function isObject (obj) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
  }

  function isPromise (val) {
    return val && typeof val.then === 'function'
  }

  function assert (condition, msg) {
    if (!condition) { throw new Error(("[red-mantis] " + msg)) }
  }

  function partial (fn, arg) {
    return function () {
      return fn(arg)
    }
  }
  function isString(str){
  	if (typeof str === 'string') {
  		return true
  	}
  	return false;
  }
	function rand(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function delay(seconds) {
	  return new Promise((resolve, reject) => {
	    setTimeout(function () {
	      resolve(seconds * 1000);
	    }, seconds * 1000);
	  });
	}
	function imageChecker(str) {
	  var regex = /(\.jpg|\.png|\.gif|\.jpeg|\.img)/gm;
	  if (regex.exec(str)) {
	    return true;
	  }
	  return false;
	}
	function objectsAreSame(x, y) {
	  var objectsAreSame = true;
	  for (var propertyName in x) {
	    if (x[propertyName] !== y[propertyName]) {
	      objectsAreSame = false;
	      break;
	    }
	  }
	  return objectsAreSame;
	}
	function shuffleArray(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;
	  while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}
  async function getJsonFromUrl(url){
  	var res;

  	try {
  		res = await ax.get(url)
  		return typeof res.data === 'object' ? res.data : null
  	} catch(e) {
  		return null
  	}
  }

  function isOnline(){
  	if (typeof navigator.onLine === 'boolean') {
  		return navigator.onLine;
  	}
  	return true;
  }
  /*
		{
			main: ["https://src.com/1","https://src.com/2","https://src.com/3"],
			backup: ["api/src/1","api/src/2","api/src/3"]
		}
  */
	async function getFromSource({main,backup}){

  	var blm = Array.isArray(main) ? main.every(isString) : false;
  	var blb = Array.isArray(backup) ? backup.every(isString) : false;

  	if (blm) {
  		for (var i = 0; i < main.length ; i++) {
  			var xres = await getJsonFromUrl(main[i])
  			if (xres) {
  				localStorage.setItem('source',JSON.stringify(xres))
  				return xres;
  			}
  		}
  		if (blb) {
	  		for (var i = 0; i < backup.length ; i++) {
	  			var xres = await getJsonFromUrl(backup[i])
	  			if (xres) {
            localStorage.setItem('source',JSON.stringify(xres))
	  				return xres;
	  			}
	  		}
	  	} else if (typeof localStorage.getItem('source') === 'string') {
	  		return JSON.parse(localStorage.getItem('source'))
	  	} else {
	  		return null
	  	}
  	}
  }
  function getAppDataList(source){
  	if (!isObject(source)) {
  		return []
  	}

  	var res = [];
  	forEachValue(source, function(v,k){
  		forEachValue(v,async function(vv,kk){
  			res.push(vv)
  		})
  	})
  	return res
  }
  async function getAppData(source){
  	if (!isObject(source)) {
  		return {}
  	}
  	var fs = getAppDataList(source)
  	var res = {};
  	var cnt = 0
  	forEachValue(fs,async function(v,k){
  		res[v] = await getJsonFromUrl(v)
  			.then(e => {
  				cnt++
  				if (e) {
  					localStorage.setItem(v,JSON.stringify(e))
  					return e
  				} else {
  					return JSON.parse(localStorage.getItem(v))
  				}
  			})
  	});

  	while(cnt !== fs.length){
  		await delay(.1)
  	}

  	return res;
  }
  function getFileNameFromUrl(url){
    if (typeof url === 'string') {
      var spl = url.split("/")
      return spl.pop()
    }
    return url
  }
  function greet() {
    var hours = (new Date).getHours();
    var res = "Day"
    if (hours <= 11) {
      res = "Morning"
    } else if (hours == 12) {
      res = "Noon"
    } else if (hours <= 17) {
      res = "Afternoon"
    } else if (hours <= 20) {
      res = "Evening"
    } else if (hours > 20) {
      res = "Night"
    } else {
      res = "Day"
    }
    return "Good " + res;
  }
	return {
		online: isOnline,
    foreach: forEachValue,
		source: getFromSource,
		data: getAppData,
    imgChk: imageChecker,
    getFileName: getFileNameFromUrl,
    shuffleArray: shuffleArray,
    greet: greet
	}
})));