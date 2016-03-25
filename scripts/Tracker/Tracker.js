var BaseScripts = require('./BaseScripts')
var _basescripts = BaseScripts.create()

var jsdom = require('jsdom')

function Tracker () {
	BaseScripts.super(this) // inherit constructor
	this.routes = require('./config/route.json')
	this.config_raw = require('./config/data.json')
	this.api_raw = require('./config/api.json')
}

BaseScripts.inherits(Tracker) // inherit basescripts

Tracker.prototype.getDataExpeditionNumber = function getDataExpeditionNumber (number, courier, cb) {
	var doing  = 'tracking'
	var config_courier = this.config_raw.expedition[courier] 
	var config_courier_doing = config_courier[doing]
	var api_config = this.api_raw[config_courier_doing]
	var api_config_doing = api_config.do[doing]
	var opt = {
		"host": api_config['endpoint'],
		"path": api_config_doing["uri"] + courier + "/" + number
	}
	var url = opt.host+opt.path
	jsdom.env({
	  url: url,
	  scripts: ["http://code.jquery.com/jquery.js"],
	  done: function (err, window) {
	  	if(err) {
	  		return cb(err)
	  	}
	    var $ = window.$; // set jquery
	    var error = $('.text-xs-center.tag-error .tag.text-tight').html();
	    if(error){
	    	return cb(null, 'number not valid')
	    }
	    var status = $('.tag.text-tight').html();
	    return cb(null, 'number ' + status.toLowerCase())
	  }
	});
}

Tracker.prototype.getStatusNumber = function getStatusNumber (res, cb) {  
	var self = this
	var number = res.match[1]
	var courier = res.match[2]
	this.getDataExpeditionNumber(number, courier, function (err, data) {
		var response = {
			"status": "success",
			"message": "they told me that your " ,
			"data": [],
			"send": data
		}
	    self.setQue('jne said your ' + data) // set memory
		res.send(response.message + response.send) // send response
	})
	res.send('wait for a sec..')
}

module.exports = {
	'create': function () {
		return new Tracker
	},
	'inherits': function (child) {
		child.prototype = Object.create(Tracker.prototype)
	}
}