var BaseScripts = require('./BaseScripts')

function Tracker () {

}

BaseScripts.inherit(BaseScripts, Tracker); // tracker inherit tracker

module.exports = {
	'create': function () {
		return new Tracker
	}
	'bindRobot': function (robot) {

	}
}