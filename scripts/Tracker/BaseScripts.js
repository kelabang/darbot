function BaseScripts () {
	this.name = 'BaseScripts'
	this.props = []
	this.queSeq = []
	this.queMessage = {}

	this.queInc = 0
	this.lastQue = 0
}
BaseScripts.prototype.setProperty = function setProperty (key, value) {
	this.props['_' + key] = value 
}
BaseScripts.prototype.getProperty = function getProperty (key) {
	return this.props['_' + key]
}
BaseScripts.prototype.setQue = function setQue (value) {
	this.queInc++
	this.queMessage['_' + this.queInc] = value 
	this.lastQue = this.queInc
	return this.queInc
}
BaseScripts.prototype.getQue = function getQue () {
	return this.queMessage['_' + this.lastQue]
}
BaseScripts.prototype.bindRobot = function bindRobot (robot) {
	var self = this
	
	if(!this.routes && typeof this.routes !== 'array') 
		return console.error('routes not defined')

	function curry (func, args) {
		return function () {
			return func.apply(this, args)
		}
	}

	this.routes.map(function(value) {

		var method = value['method'], 
			event = value['event'],
			event_match = value['event_match']

		var args = [
			self, 
			robot,
			method,
			event,
			event_match
		]

		var exec = curry(function (self, robot, method, event, event_match) {
			return robot[event](event_match, function (res) {
				return self[method](res, function (err, data) {
					if(err) {
						return console.error(err)
					}
				})
			})
		}, args)

		exec() // bind route

		console.log(value['name'] + ' command, binded')

	})
	return this
}
module.exports = {
	"create": function () {
		return new BaseScripts
	},
	"inherits": function (child) {
		child.prototype = Object.create(BaseScripts.prototype)
	},
	"super": function (_this) {
		BaseScripts.call(_this)
	}
};