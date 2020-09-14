'use strict';

angular.module('linagora.esn.admin', [
  'esn.mailto-handler',
  'restangular',
  'colorpicker',
  'material.components.tooltip',
  'ngTagsInput',
  'esn.http',
  'esn.core',
  'esn.session',
  'op.dynamicDirective',
  'esn.subheader',
  'esn.sidebar',
  'esn.async-action',
  'esn.infinite-list',
  'esn.domain',
  'esn.scroll',
  'esn.attendee',
  'esn.user',
  'esn.file-saver',
  'esn.form.helper',
  'esn.module-registry',
  'esn.feature-registry',
  'esn.i18n',
  'esn.datetime',
  'esn.home-page',
  'esn.configuration',
  'esn.availability',
  'esn.themes',
  'esn.technicaluser',
  'linagora.esn.resource',
  'esn.file',
  'esn.member',
  'openpaas-logo',
  'esn.application-menu',
  'esn.router',
  'linagora.esn.group',
  'esn.inbox-james',
  'esn.api-client'
]);

require('./app.constants.js');
require('./app.routes.js');
require('./app.config.js');
require('./app.run.js');

require('esn-frontend-common-libs/src/frontend/js/modules/esn.router.js');
require('esn-frontend-common-libs/src/frontend/js/modules/config/config.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/async-action.js');
require('esn-frontend-common-libs/src/frontend/js/modules/session.js');
require('esn-frontend-common-libs/src/frontend/js/modules/http.js');
require('esn-frontend-common-libs/src/frontend/js/modules/core.js');
require('esn-frontend-common-libs/src/frontend/js/modules/subheader/subheader.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/feature-registry/feature-registry.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/form-helper/form-helper.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/i18n/i18n.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/datetime/datetime.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/domain.js');
require('esn-frontend-common-libs/src/frontend/js/modules/availability/availability.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/infinite-list/infinite-list.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/home-page/home-page.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/file-saver.js');
require('esn-frontend-common-libs/src/frontend/js/modules/scroll.js');
require('esn-frontend-common-libs/src/frontend/js/modules/module-registry/module-registry.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/user/user.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/attendee/attendee.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/themes/themes.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/file.js');
require('esn-frontend-common-libs/src/frontend/js/modules/member.js');
require('esn-frontend-common-libs/src/frontend/js/modules/technicaluser/technicaluser.module.js');
require('esn-frontend-common-libs/src/frontend/components/openpaas-logo/openpaas-logo.js');
require('esn-frontend-common-libs/src/frontend/components/dynamic-directive/src/dynamic-directive.js');
require('esn-frontend-common-libs/src/frontend/js/modules/application-menu.js');
require('esn-frontend-common-libs/src/frontend/js/constants.js');
require('esn-frontend-common-libs/src/frontend/js/modules/esn.api-client');
require('esn-frontend-group/src/app/app.module');
require('esn-frontend-inbox-james/src/app/app.module');

require('./autoconf/subheader/admin-autoconf-subheader.component.js');
require('./autoconf/admin-autoconf.service.js');
require('./autoconf/admin-autoconf.component.js');
require('./autoconf/admin-autoconf.constants.js');
require('./autoconf/admin-autoconf.controller.js');
require('./common/admin-restangular.service.js');
require('./common/config/admin-config-api.service.js');
require('./common/config/admin-domain-config.service.js');
require('./common/config/admin-test-config.service.js');
require('./common/empty-message/admin-empty-message.component.js');
require('./common/empty-message/admin-empty-message.controller.js');
require('./common/form/admin-form-input-bytes.directive.js');
require('./common/form/admin-form-multi-input.controller.js');
require('./common/form/admin-form-multi-input.directive.js');
require('./common/form/admin-form.constant.js');
require('./common/mode/admin-mode.service.js');
require('./common/mode/switch/admin-mode-switch.js');
require('./common/status-indicator/loading-status.directive.js');
require('./dav/admin-dav-subheader.component.js');
require('./dav/admin-dav.component.js');
require('./dav/admin-dav.controller.js');
require('./domains/admin-domains.component.js');
require('./domains/admin-domains.constant.js');
require('./domains/admin-domains.controller.js');
require('./domains/admin-domains.service.js');
require('./domains/create/admin-domains-create.controller.js');
require('./domains/form/admin-domains-form.component.js');
require('./domains/form/admin-domains-form.controller.js');
require('./domains/form/hostnames/admin-domains-form-hostnames.component.js');
require('./domains/form/hostnames/admin-domains-form-hostnames.controller.js');
require('./domains/item/admin-domains-item.component.js');
require('./domains/list/admin-domains-list.component.js');
require('./domains/list/admin-domains-list.controller.js');
require('./domains/subheader/admin-domains-subheader.component.js');
require('./domains/update/admin-domains-update.controller.js');
require('./elasticsearch/admin-elasticsearch-subheader.component.js');
require('./elasticsearch/admin-elasticsearch.component.js');
require('./elasticsearch/admin-elasticsearch.controller.js');
require('./features/admin-features-subheader.component.js');
require('./features/admin-features.component.js');
require('./features/admin-features.controller.js');
require('./features/admin-features.service.js');
require('./features/item/admin-features-item.component.js');
require('./general/admin-general-subheader.component.js');
require('./general/admin-general.component.js');
require('./general/admin-general.controller.js');
require('./jwt/admin-jwt-subheader.component.js');
require('./jwt/admin-jwt.component.js');
require('./jwt/admin-jwt.constant.js');
require('./jwt/admin-jwt.controller.js');
require('./ldap/admin-ldap-form.component.js');
require('./ldap/admin-ldap-form.constant.js');
require('./ldap/admin-ldap-form.controller.js');
require('./ldap/admin-ldap-subheader.component.js');
require('./ldap/admin-ldap.component.js');
require('./ldap/admin-ldap.controller.js');
require('./ldap/test/admin-ldap-test.component.js');
require('./ldap/test/admin-ldap-test.controller.js');
require('./login/admin-login-subheader.component.js');
require('./login/admin-login.component.js');
require('./login/admin-login.controller.js');
require('./mail/admin-mail-subheader.component.js');
require('./mail/admin-mail.component.js');
require('./mail/admin-mail.constant.js');
require('./mail/admin-mail.controller.js');
require('./mail/admin-mail.service.js');
require('./mail/test/admin-mail-test.component.js');
require('./mail/test/admin-mail-test.controller.js');
require('./mail/transport/admin-mail-gmail.component.js');
require('./mail/transport/admin-mail-local.component.js');
require('./mail/transport/admin-mail-smtp.component.js');
require('./maintenance/admin-maintenance.component.js');
require('./maintenance/admin-maintenance.controller.js');
require('./maintenance/elasticsearch/admin-maintenance-elasticsearch.component.js');
require('./maintenance/elasticsearch/admin-maintenance-elasticsearch.controller.js');
require('./maintenance/elasticsearch/admin-maintenance-elasticsearch.service.js');
require('./maintenance/elasticsearch/resource/admin-maintenance-elasticsearch-resource.component.js');
require('./maintenance/module/admin-maintenance-module.directive.js');
require('./maintenance/subheader/admin-maintenance-subheader.component.js');
require('./maintenance/contact/admin-maintenance-contact.component');
require('./maintenance/contact/domain-members/admin-maintenance-contact-domain-members.component');
require('./maintenance/contact/domain-members/admin-maintenance-contact-domain-members.controller');
require('./modules/admin-modules.component.js');
require('./modules/admin-modules.controller.js');
require('./modules/admin-modules.service.js');
require('./modules/displayer/admin-modules-displayer.component.js');
require('./modules/displayer/admin-modules-displayer.controller.js');
require('./modules/form/admin-modules-form.component');
require('./modules/form/admin-modules-save-button.component.js');
require('./modules/form/admin-modules-save-button.controller.js');
require('./modules/subheader/admin-modules-subheader.component.js');
require('./oauth/admin-oauth-subheader.js');
require('./oauth/admin-oauth.component.js');
require('./oauth/admin-oauth.controller.js');
require('./oauth/facebook/admin-oauth-facebook.js');
require('./oauth/github/admin-oauth-github.js');
require('./oauth/google/admin-oauth-google.js');
require('./oauth/twitter/admin-oauth-twitter.js');
require('./oauth/usage-options/admin-oauth-usage-options.component.js');
require('./resources/admin-resources-subheader.component.js');
require('./resources/admin-resources.component.js');
require('./roles/add/admin-roles-add.controller.js');
require('./roles/add/admin-roles-auto-complete.component.js');
require('./roles/add/admin-roles-auto-complete.controller.js');
require('./roles/admin-roles-subheader.component.js');
require('./roles/admin-roles.component.js');
require('./roles/admin-roles.constant.js');
require('./roles/admin-roles.controller.js');
require('./roles/admin-roles.service.js');
require('./roles/list/admin-roles-administrator-list-item.component.js');
require('./roles/list/admin-roles-administrator-list-item.controller.js');
require('./roles/list/admin-roles-list-item.directive.js');
require('./roles/list/admin-roles-list.component.js');
require('./session/admin-session-subheader.component.js');
require('./session/admin-session.component.js');
require('./session/admin-session.controller.js');
require('./sidebar/admin-sidebar.js');
require('./sidebar/items/admin-sidebar-items.js');
require('./subheader/admin-subheader-burger-button.component.js');
require('./subheader/admin-subheader-close-button.component.js');
require('./subheader/admin-subheader-save-button.component.js');
require('./technical-users/add/admin-technical-users-add.controller.js');
require('./technical-users/admin-technical-users-subheader.component.js');
require('./technical-users/admin-technical-users.component.js');
require('./technical-users/admin-technical-users.constants.js');
require('./technical-users/admin-technical-users.controller.js');
require('./technical-users/admin-technical-users.service.js');
require('./technical-users/form/admin-technical-users-form.component.js');
require('./technical-users/form/admin-technical-users-form.controller.js');
require('./technical-users/form/admin-technicalusers-form.constants.js');
require('./technical-users/list/admin-technical-users-list.component.js');
require('./technical-users/list/admin-technical-users-list.controller.js');
require('./technical-users/remove/admin-technical-users-remove.controller.js');
require('./technical-users/update/admin-technical-users-update.controller.js');
require('./themes/admin-themes-subheader.component.js');
require('./themes/admin-themes.component.js');
require('./themes/admin-themes.constants.js');
require('./themes/admin-themes.controller.js');
require('./themes/preview/admin-themes-preview.component.js');
require('./themes/preview/desktop/admin-themes-preview-desktop.component.js');
require('./themes/preview/mobile/admin-themes-preview-mobile.component.js');
require('./users/admin-users-subheader.component.js');
require('./users/admin-users.component.js');
require('./users/admin-users.constant.js');
require('./users/admin-users.controller.js');
require('./users/admin-users.service.js');
require('./users/configuration/admin-users-configuration.component.js');
require('./users/configuration/admin-users-configuration.controller.js');
require('./users/create/admin-users-create-subheader.component.js');
require('./users/create/admin-users-create.component.js');
require('./users/create/admin-users-create.controller.js');
require('./users/form/admin-users-form.service.js');
require('./users/form/admin-users-full-form.component.js');
require('./users/form/admin-users-full-form.controller.js');
require('./users/form/admin-users-quick-form.component.js');
require('./users/form/admin-users-quick-form.controller.js');
require('./users/list/admin-users-list.component.js');
require('./users/list/admin-users-list.controller.js');
require('./users/states/admin-users-states.component.js');
require('./users/states/admin-users-states.constants.js');
require('./users/states/admin-users-states.controller.js');
require('./users/states/admin-users-states.run.js');
require('./users/states/admin-users-states.service.js');
require('./web/admin-subheader.component.js');
require('./web/admin-web.component.js');
require('./web/admin-web.controller.js');
require('./webserver/admin-webserver-subheader.component.js');
require('./webserver/admin-webserver.component.js');
require('./webserver/admin-webserver.controller.js');
