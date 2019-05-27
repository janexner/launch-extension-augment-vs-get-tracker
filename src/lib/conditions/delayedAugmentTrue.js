'use strict';

var myLogger = require('../main.js');

var Promise = require('@adobe/reactor-promise');
myLogger('delayedAugmentTrue', '', 'requesting augment-tracker Shared Module...');
var augmentTracker = turbine.getSharedModule('adobe-analytics', 'augment-tracker');

module.exports = function(settings, event) {
    myLogger('delayedAugmentTrue', event.$rule.name, ' adding augment-tracker functions...');
    augmentTracker(function(tracker) {
        return new Promise(function(resolve) {
            var waitTime = 1000 * Math.random();
            myLogger('delayedAugmentTrue', event.$rule.name, 'augment-tracker async function called. Will wait ' + waitTime);
                setTimeout(function() {
                    tracker.ags055 = tracker.ags055 || {};
                    tracker.ags055.timeline = tracker.ags055.timeline || [];
                    tracker.ags055.timeline.push({
                        'rule': event.$rule.name,
                        'time': new Date(),
                        'info': {
                            'module': 'delayedAugmentTrue',
                            'type': 'async'
                        }
                    });
                    myLogger('delayedAugmentTrue', event.$rule.name, 'augment-tracker async calling resolve...');
                    resolve();
                }, waitTime);
            });
    });
    myLogger('delayedAugmentTrue', event.$rule.name, 'returning true.');
    return true;
}
