'use strict';

var myLogger = require('../main.js');

myLogger('augmentTest', '', 'loading...');
var Promise = require('@adobe/reactor-promise');
myLogger('augmentTest', '', 'requesting augment-tracker Shared Module...');
var augmentTracker = turbine.getSharedModule('adobe-analytics', 'augment-tracker');

module.exports = function(settings, event) {
    myLogger('augmentTest', event.$rule.name, ' adding augment-tracker functions...');
    augmentTracker(function(tracker) {
        myLogger('augmentTest', event.$rule.name, 'augment-tracker sync function called.');
        tracker.ags055 = tracker.ags055 || {};
        tracker.ags055.timeline = tracker.ags055.timeline || [];
        tracker.ags055.timeline.push({
            'rule': event.$rule.name,
            'time': new Date(),
            'info': {
                'module': 'augmentTest',
                'type': 'sync'
            }
        });
    });
    augmentTracker(function(tracker) {
        return new Promise(function(resolve) {
          var waitTime = 1000 * Math.random();
          myLogger('augmentTest', event.$rule.name, 'augment-tracker async function called. Will wait ' + waitTime);
            setTimeout(function() {
                tracker.ags055 = tracker.ags055 || {};
                tracker.ags055.timeline = tracker.ags055.timeline || [];
                tracker.ags055.timeline.push({
                    'rule': event.$rule.name,
                    'time': new Date(),
                    'info': {
                        'module': 'augmentTest',
                        'type': 'async'
                    }
                });
                myLogger('augmentTest', event.$rule.name, 'augment-tracker async calling resolve...');
                resolve();
            }, waitTime);
        });
    });
}
