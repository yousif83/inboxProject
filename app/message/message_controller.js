(function() {
  'use strict';
  angular
  .module('angular-inbox' )
  .controller('messageController', function messageController  ( $http){
    const vm=this
    console.log(vm);


    vm.starMessage=function(message){
      // var status=message.starred
      var body ={
        messageIds: [message.id],
        command: 'star',
        star: !message.starred
      }

      $http.patch(`https://young-lake-58938.herokuapp.com/api/messages`,JSON.stringify(body))
        .then(function(response){
          console.log(message);
          message.starred = !message.starred;
        })
      console.log(vm);
    }
    vm.checkedMessage=function(selected,message){
        message.selected=selected
        console.log(vm);
    }

  })
}());
