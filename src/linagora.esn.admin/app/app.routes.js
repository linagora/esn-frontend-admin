'use strict';

angular.module('linagora.esn.admin')

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/admin', function($state, $location, session, adminModeService) {
      session.ready.then(function() {
        if (session.userIsDomainAdministrator()) {
          return adminModeService.goToDomainMode();
        }

        if (session.user.isPlatformAdmin) {
          return adminModeService.goToPlatformMode();
        }

        return $location.path('/');
      });
    });

    $urlRouterProvider.when('/admin/:domainId', function($state, $location, session) {
      session.ready.then(function() {
        $state.go('admin.domain.general');
      });
    });

    $stateProvider
      .state('admin', {
        url: '/admin',
        template: require('./app.pug'),
        resolve: {
          isAdmin: function($location, session) {
            return session.ready.then(function() {
              if (!session.userIsDomainAdministrator() && !session.user.isPlatformAdmin) { $location.path('/'); }
            });
          }
        }
      })
      .state('admin.domain', {
        url: '/:domainId',
        resolve: {
          isAdmin: function($location, session) {
            return session.ready.then(function() {
              if (!session.userIsDomainAdministrator() && !session.user.isPlatformAdmin) { $location.path('/'); }
            });
          }
        }
      })
      .state('admin.domain.mail', {
        url: '/mail',
        views: {
          'root@admin': {
            template: '<admin-mail />'
          }
        }
      })
      .state('admin.domain.users', {
        url: '/users',
        views: {
          'root@admin': {
            template: '<admin-users />'
          }
        }
      })
      .state('admin.domain.technicalusers', {
        url: '/technicalusers',
        views: {
          'root@admin': {
            template: '<admin-technical-users />'
          }
        }
      })
      .state('admin.domain.users.create', {
        url: '/create',
        views: {
          'root@admin': {
            template: '<admin-users-create />'
          }
        },
        resolve: {
          isEnabled: function($location, $stateParams, adminUsersService) {
            return adminUsersService.isUserCreationEnabled($stateParams.domainId).then(function(enabled) {
              if (!enabled) {
                $location.path('/admin');
              }
            });
          }
        },
        params: { user: null }
      })
      .state('admin.domain.dav', {
        url: '/dav',
        views: {
          'root@admin': {
            template: '<admin-dav />'
          }
        }
      })
      .state('admin.domain.ldap', {
        url: '/ldap',
        views: {
          'root@admin': {
            template: '<admin-ldap />'
          }
        }
      })
      .state('admin.domain.modules', {
        url: '/modules',
        views: {
          'root@admin': {
            template: '<admin-modules />'
          }
        }
      })
      .state('admin.domain.roles', {
        url: '/roles',
        views: {
          'root@admin': {
            template: '<admin-roles />'
          }
        }
      })
      .state('admin.domain.resources', {
        url: '/resources',
        views: {
          'root@admin': {
            template: '<admin-resources />'
          }
        }
      })
      .state('admin.domain.web', {
        url: '/web',
        views: {
          'root@admin': {
            template: '<admin-web />'
          }
        }
      })
      .state('admin.domain.webserver', {
        url: '/webserver',
        views: {
          'root@admin': {
            template: '<admin-webserver />'
          }
        }
      })
      .state('admin.domain.jwt', {
        url: '/jwt',
        views: {
          'root@admin': {
            template: '<admin-jwt />'
          }
        }
      })
      .state('admin.domain.general', {
        url: '/general',
        views: {
          'root@admin': {
            template: '<admin-general />'
          }
        }
      })
      .state('admin.domain.oauth', {
        url: '/oauth',
        views: {
          'root@admin': {
            template: '<admin-oauth />'
          }
        }
      })
      .state('admin.domain.autoconf', {
        url: '/autoconf',
        views: {
          'root@admin': {
            template: '<admin-autoconf />'
          }
        }
      })
      .state('admin.domain.domains', {
        url: '/domains',
        views: {
          'root@admin': {
            template: '<admin-domains />'
          }
        }
      })
      .state('admin.domain.features', {
        url: '/features',
        views: {
          'root@admin': {
            template: '<admin-features />'
          }
        }
      })
      .state('admin.domain.maintenance', {
        url: '/maintenance',
        views: {
          'root@admin': {
            template: '<admin-maintenance />'
          }
        }
      })
      .state('admin.domain.login', {
        url: '/login',
        views: {
          'root@admin': {
            template: '<admin-login />'
          }
        }
      })
      .state('admin.domain.theme', {
        url: '/theme',
        views: {
          'root@admin': {
            template: '<admin-themes />'
          }
        }
      })
      .state('admin.domain.elasticsearch', {
        url: '/elasticsearch',
        views: {
          'root@admin': {
            template: '<admin-elasticsearch />'
          }
        }
      })
      .state('admin.domain.session', {
        url: '/session',
        views: {
          'root@admin': {
            template: '<admin-session />'
          }
        }
      });
  });
