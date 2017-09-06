
(function (){
  'use strict';

  angular
    .module('angular-inbox', )
    .component('compose', {
      controller: 'composeController' ,
      templateUrl: 'app/composeForm/composeForm_template.html',
      bindings: {
         formmsgs: '<',
         hidefrm: '<'

       }

    });
})();
