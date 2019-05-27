'use strict';

var myLogger = require('../main.js');

myLogger('immediateGetTrue', '', 'requesting get-tracker Shared Module...');
var getTracker = turbine.getSharedModule('adobe-analytics', 'get-tracker');

module.exports = function(settings, event) {
    if (getTracker) {
        myLogger('immediateGetTrue', event.$rule.name, 'adding get-tracker handler...');
        getTracker().then(function(tracker) {
            myLogger('immediateGetTrue', event.$rule.name, 'get-tracker handler function called.');
            tracker.ags055 = tracker.ags055 || {};
            tracker.ags055.timeline = tracker.ags055.timeline || [];
            tracker.ags055.timeline.push({
              'rule': event.$rule.name,
              'time': new Date(),
              'info': {
                'module': 'immediateGetTrue',
                'type': 'async'
              }
            })
        });
    } else {
        myLogger('immediateGetTrue', event.$rule.name, 'no Analytics Extension here');
    }
    myLogger('immediateGetTrue', event.$rule.name, 'returning true.');
    return true;
}
