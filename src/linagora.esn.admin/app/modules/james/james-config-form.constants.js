angular.module('linagora.esn.admin')
  .constant('JAMES_MODULE_METADATA', {
    id: 'linagora.esn.james',
    title: 'James',
    icon: require('!!file-loader!../../../../../assets/james-icon.svg').default,
    config: {
      template: 'james-config-form',
      displayIn: {
        user: false,
        domain: true,
        platform: true
      }
    }
  });
