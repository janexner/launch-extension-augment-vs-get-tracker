'use strict';

turbine.logger.info('Main module loading...');
var Promise = require('@adobe/reactor-promise');
turbine.logger.info('Main module requesting augment-tracker Shared Module...');
var augmentTracker = turbine.getSharedModule('adobe-analytics', 'augment-tracker');

turbine.logger.info('Main module adding augment-tracker functions...');
augmentTracker(function(tracker) {
    turbine.logger.info('Main - augment-tracker sync function called.');
    tracker.ags055 = tracker.ags055 || {};
    tracker.ags055.timeline = tracker.ags055.timeline || [];
    tracker.ags055.timeline.push({
        'rule': 'none / main',
        'time': new Date(),
        'info': {
            'module': 'main - aug',
            'type': 'sync'
        }
    });
});
augmentTracker(function(tracker) {
    return new Promise(function(resolve) {
        var waitTime = 1000 * Math.random();
        turbine.logger.info('Main - augment-tracker async function called. Will wait ' + waitTime);
        setTimeout(function() {
            tracker.ags055 = tracker.ags055 || {};
            tracker.ags055.timeline = tracker.ags055.timeline || [];
            tracker.ags055.timeline.push({
                'rule': 'none / main',
                'time': new Date(),
                'info': {
                    'module': 'main - aug',
                    'type': 'async'
                }
            });
            turbine.logger.info('Main - augment-tracker async calling resolve...');
            resolve();
        }, waitTime);
    });
});

turbine.logger.info('Main module requesting get-tracker Shared Module...');
var getTracker = turbine.getSharedModule('adobe-analytics', 'get-tracker');
if (getTracker) {
    turbine.logger.info('Main module adding get-tracker handler');
    getTracker().then(function(tracker) {
        turbine.logger.info('Main module - get-tracker handler function called.');
        tracker.ags055 = tracker.ags055 || {};
        tracker.ags055.timeline = tracker.ags055.timeline || [];
        tracker.ags055.timeline.push({
            'rule': 'none / main',
            'time': new Date(),
            'info': {
                'module': 'main - get',
                'type': 'async'
            }
        });
    });
} else {
    turbine.logger.error('Get Test module - no Analytics Extension here');
}

module.exports = function(module, ruleName, message) {
    var infoString = module + " - ";
    // add ruleName is there is one
    if ('undefined' !== typeof ruleName && ruleName) {
        infoString += "Rule " + ruleName + " - ";
    }
    infoString += message;
    turbine.logger.info(infoString);
}
