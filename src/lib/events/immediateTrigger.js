'use strict';

turbine.logger.info('Event ImmediateTrigger module loading...');

module.exports = function(settings, trigger) {
  turbine.logger.info('Event ImmediateTrigger triggering...');
  trigger();
};
