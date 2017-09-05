(function() {
  'use strict';
  angular
  .module('angular-inbox', )
  .component('message', {
    controller:'messageController',
    templateUrl:'app/message/message_template.html',
    bindings: {
       data: '<'

     }
  })
}());
