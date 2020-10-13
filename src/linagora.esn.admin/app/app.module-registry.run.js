'use strict';

require('./app.constants.js');

angular.module('linagora.esn.admin').run(runBlock);

function runBlock(
  esnModuleRegistry,
  CAL_MODULE_METADATA,
  INBOX_MODULE_METADATA,
  CONTACT_MODULE_METADATA,
  LINSHARE_MODULE_METADATA,
  PROFILE_MODULE_METADATA,
  JAMES_MODULE_METADATA
) {
  esnModuleRegistry.add(CAL_MODULE_METADATA);
  esnModuleRegistry.add(INBOX_MODULE_METADATA);
  esnModuleRegistry.add(CONTACT_MODULE_METADATA);
  esnModuleRegistry.add(LINSHARE_MODULE_METADATA);
  esnModuleRegistry.add(PROFILE_MODULE_METADATA);
  esnModuleRegistry.add(JAMES_MODULE_METADATA);

}
