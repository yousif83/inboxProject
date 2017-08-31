(function() {
  'use strict';
  angular
  .module('angular-inbox', )
  .component('toolbar', {
    controller:'toolbarController',
    templateUrl:'app/toolBar/toolbar_template.html',
    bindings: {
       datamsgs: '<'
     }
  })
}());
