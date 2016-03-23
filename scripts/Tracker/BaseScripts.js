function BaseScripts () {
	this.props = [];
}
BaseScripts.prototype.setProperty = function setProperty (key, value) {
	this.props['_' + key] = value 
}
BaseScripts.prototype.getProperty = function getProperty (key) {
	return this.props['_' + key]
}
BaseScripts.prototype.bindRobot = function bindRobot (robot) {

}
module.exports = {
	"create": function () {
		return new BaseScripts
	},
	"inherit": function (from, to) {
		var _to = '';
		var _from = '';
		if(typeof to === 'object'){
			_to = to.__proto__ 
		} else {
			_to = to.prototype
		}
		if(typeof from == 'object'){
			_from = from.__proto__
		} else {
			_from = from.prototype
		}
		_to = _from
		return _to		
	}
};