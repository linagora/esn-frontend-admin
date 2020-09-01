 
'use strict';

angular.module('linagora.esn.admin')

 .constant('CAL_MODULE_METADATA', {
   id: 'linagora.esn.calendar',
   title: 'Calendar',
   icon: require('!!file-loader!../../../../assets/calendar-icon.svg').default,
   config: {
     template: 'calendar-config-form',
     displayIn: {
       user: false,
       domain: true,
       platform: true
     }
   },
   disableable: true,
   isDisplayedByDefault: true
 })
  .constant('INBOX_MODULE_METADATA', {
    id: 'linagora.esn.unifiedinbox',
    title: 'Unified Inbox',
    icon: require('!!file-loader!../../../../assets/inbox-icon.svg').default,
    homePage: 'unifiedinbox',
    config: {
      template: 'inbox-config-form',
      displayIn: {
        user: false,
        domain: true,
        platform: true
      }
    },
    disableable: true,
    isDisplayedByDefault: true
  })
  .constant('CONTACT_MODULE_METADATA', {
    id: 'linagora.esn.contact',
    title: 'Contact',
    icon: '/contact/images/contacts-icon.svg',
    homePage: 'contact',
    config: {
      template: 'contact-config-form',
      displayIn: {
        user: false,
        domain: true,
        platform: true
      }
    },
    maintenance: {
      template: 'contact-maintenance',
      displayIn: {
        user: false,
        domain: true,
        platform: true
      }
    },
    disableable: true,
    isDisplayedByDefault: true
  })
  .constant('LINSHARE_MODULE_METADATA', {
    id: 'linagora.esn.linshare',
    title: 'LinShare',
    icon: require('!!file-loader!../../../../assets/linshare-icon.svg').default,
    disableable: true,
    isDisplayedByDefault: false,
    config: {
      template: 'linshare-config-form',
      displayIn: {
        user: false,
        domain: false,
        platform: true
      }
    }
  })
  .constant('PROFILE_MODULE_METADATA', {
    id: 'linagora.esn.profile',
    title: 'Profile',
    homePage: 'profile',
    icon: '/images/application.png',
    disableable: false,
    isDisplayedByDefault: false
  })

   .constant('JAMES_MODULE_METADATA', {
     id: 'linagora.esn.james',
     title: 'James',
     icon: require('!!file-loader!../../../../assets/james-icon.svg').default,
     config: {
       template: 'james-config-form',
       displayIn: {
         user: false,
         domain: true,
         platform: true
       }
     }
   });