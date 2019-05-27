'use strict';

var myLogger = require('../main.js');

myLogger('immediateAugmentTrue', '', 'requesting augment-tracker Shared Module...');
var augmentTracker = turbine.getSharedModule('adobe-analytics', 'augment-tracker');

module.exports = function(settings, event) {
    myLogger('immediateAugmentTrue', event.$rule.name, ' adding augment-tracker functions...');
    augmentTracker(function(tracker) {
        myLogger('immediateAugmentTrue', event.$rule.name, 'augment-tracker sync function called.');
        tracker.ags055 = tracker.ags055 || {};
        tracker.ags055.timeline = tracker.ags055.timeline || [];
        tracker.ags055.timeline.push({
            'rule': event.$rule.name,
            'time': new Date(),
            'info': {
                'module': 'immediateAugmentTrue',
                'type': 'sync'
            }
        });
    });
    myLogger('immediateAugmentTrue', event.$rule.name, 'returning true.');
    return true;
  }
