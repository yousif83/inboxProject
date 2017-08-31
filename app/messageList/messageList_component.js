(function() {
  'use strict';
  angular
  .module('angular-inbox')
  .component('messagelist', {
    controller:'messageListController',
    templateUrl:'app/messageList/messageList_template.html',
    bindings: {
       datamsg: '<'
     }
  })

}());
