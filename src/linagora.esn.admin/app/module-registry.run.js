angular.module('linagora.esn.admin')
  .run(registerModules);

function registerModules(
  esnModuleRegistry,
  JAMES_MODULE_METADATA
) {
  esnModuleRegistry.add(JAMES_MODULE_METADATA);
}
