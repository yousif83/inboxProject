


(function() {
  'use strict';
  angular
  .module('angular-inbox')
  .controller('inboxController',inboxController)
inboxController.$inject = ['$http']
  function inboxController($http){

    const vm=this
    vm.$onInit = function(){
      $http.get('https://young-lake-58938.herokuapp.com/api/messages').then(function(messages){
        vm.messages=messages.data._embedded.messages

      })
    }
    vm.showForm={
       flag:true
       }
  }
}());
