var Tracker = require('./Tracker/Tracker')
var tracker = Tracker.create()
module.exports = function (robot) {

	// basic conv
	robot.hear(/hey/i, function (res) {
		res.send('yes?')
	})
	robot.respond(/sorry/i, function(res) {
		res.send('no problem.')
	})

	// test memory
	robot.respond("/what you told me last time?/i", function (res) {
		res.send(tracker.getQue())
	})

	// basic control for dev
	robot.hear(/shutdown/i, function(res) {
		res.send('goodbye master.')
		setTimeout(function () {
			process.exit()
		}, 1000)
	})

	// bind route robot
	tracker.bindRobot(robot) // tracker for tracking item 
}