'use strict';

var myLogger = require('../main.js');

myLogger('getTest', '', 'loading...');
myLogger('getTest', '', 'requesting get-tracker Shared Module...');
var getTracker = turbine.getSharedModule('adobe-analytics', 'get-tracker');

module.exports = function(settings, event) {
    myLogger('getTest', event.$rule.name, 'exports called');

    if (getTracker) {
      myLogger('getTest', event.$rule.name, 'adding get-tracker handler...');
      getTracker().then(function(tracker) {
          myLogger('getTest', event.$rule.name, 'get-tracker handler function called.');
          tracker.ags055 = tracker.ags055 || {};
          tracker.ags055.timeline = tracker.ags055.timeline || [];
          tracker.ags055.timeline.push({
            'rule': event.$rule.name,
            'time': new Date(),
            'info': {
              'module': 'getTest',
              'type': 'async'
            }
          })
      });
    } else {
      myLogger('getTest', event.$rule.name, 'no Analytics Extension here');
    }
}
