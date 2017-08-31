(function() {
  'use strict';
  angular
  .module('angular-inbox' )
  .controller('messageController', function messageController  ( ){
    const vm=this
    vm.starMessage=function(message){
      var status=message.starred
    message.starred=!message.starred;
    }
    vm.checkedMessage=function(selected,message){
        message.selected=selected
    }
  })
}());
