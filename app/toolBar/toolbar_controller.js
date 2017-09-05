(function() {
  'use strict';
  angular
  .module('angular-inbox', )
  .controller('toolbarController', toolbarController)
  function toolbarController($http){
    const vm=this
    vm.$onInit=function(){

      vm.countUnreadMessages = function(message){
       if (message !==undefined) {
         var count=0
         for (var i = 0; i < message.length; i++) {
         if (message[i].read == false) {
           count++
         }
         }
         return count
       }

      }
      vm.allSelected=function (messages){
        if (messages !==undefined) {

          return status=messages.every(function(data){
            return data.selected == true
          })
        }

      }
      vm.someSelected=function (messages){
        if (messages !==undefined) {
          const someMsgs=messages.some(function(data){
            return data.selected==true
          })
          const allMsgs=messages.every(function(data){
            return data.selected==true
          })
          return  someMsgs && !allMsgs
        }

      }
      vm.allNotSelected=function (messages){
        if (messages !== undefined) {
          return status=messages.every(function(data){
            return data.selected !==true
          })
        }

        }
    }
    vm.markAsRead=function(messages){
      var messageIds=[]
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].selected) {
          messages[i].read=true
          messageIds.push(messages[i].id)
        }
      }
      var body={
        messageIds:messageIds,
        command:'read',
        read:true
      }
      $http.patch(`https://young-lake-58938.herokuapp.com/api/messages`,JSON.stringify(body))
        .then(function(response){
        })

    }
    vm.markAsUnRead=function(messages){
      var UnreadmessageIds=[]
      console.log(messages);
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].selected) {
          messages[i].read=false
          UnreadmessageIds.push(messages[i].id)

        }
      }
      var body={
        messageIds:UnreadmessageIds,
        command:'read',
        read:false
      }
      $http.patch(`https://young-lake-58938.herokuapp.com/api/messages`,JSON.stringify(body))
        .then(function(response){
        })

    }
    vm.addLabel=function(messages,label){
      for (var i = 0; i < messages.length; i++) {
        var labelExist=messages[i].labels.includes(label)
        if (messages[i].selected && !labelExist ) {
          messages[i].labels.push(label)
        var body={ message_id: messages[i].id,
         label: label}
        console.log(body);
        $http.post(`http://localhost:3000/messages/addLabel/`,body).then(function(message){

        })
        }
      }
    }
    vm.removeLabel=function(messages, label){
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].selected) {
          var index=messages[i].labels.indexOf(label)
          console.log(index);
          if (index > -1) {
          messages[i].labels.splice(index, 1);
          var body1={ message_id: messages[i].id,
           label: label}
          console.log(body1);
          $http.delete(`http://localhost:3000/messages/deleteLabel/${messages[i].id}/${label}`).then(function(message){
          })
          }
        }
      }
    }
    vm.changeSelect=function(data){
      if (vm.allSelected(data)) {
        for (var i = 0; i < data.length; i++) {
        data[i].selected=false
        }
      }
      else if (vm.someSelected(data)) {
        for (var i = 0; i < data.length; i++) {
        data[i].selected=true
        }
      }
      else if (vm.allNotSelected(data))  {
        for (var i = 0; i < data.length; i++) {
        data[i].selected=true
        }
      }
    }

    vm.deleteMessage=function(messages){

   var deleteArr =[]
    for (var i = 0; i < messages.length; i++) {
      if (messages[i].selected) {
        deleteArr.push(messages[i].id)
        messages.splice(i, 1);
        i--
      }

    }
    var body={
      messageIds:deleteArr,
      command:'delete'

    }
    $http.patch(`https://young-lake-58938.herokuapp.com/api/messages`,JSON.stringify(body))
      .then(function(response){
      })
    }
  }

}());
