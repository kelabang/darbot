var Tracker = require('./Tracker/Tracker')
var tracker = Tracker.create();
module.exports = function (robot) {
	tracker.bindRobot(robot)
}