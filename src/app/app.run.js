angular.module('esnApp')
  // don't remove $state from here or ui-router won't route...
  .run(function (session, ioConnectionManager, $state) { // eslint-disable-line
    session.ready.then(function() {
      ioConnectionManager.connect();
    });
  })
  .run(addTemplateCache);

function addTemplateCache($templateCache) {
  $templateCache.put('/views/commons/loading.html', require('./app-loading.pug'));
}
