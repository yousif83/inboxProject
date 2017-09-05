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
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].selected) {
          messages[i].read=true
          var body ={
            read:true
          }
          // $http.put(`http://localhost:3000/messages/edit/${messages[i].id}`,body).then(function(message){
          //
          // })
        }
      }
    }
    vm.markAsUnRead=function(messages){
      console.log(messages);
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].selected) {

          messages[i].read=false
          var body ={
            read:false
          }
          // $http.put(`http://localhost:3000/messages/edit/${messages[i].id}`,body).then(function(message){
          //
          // })
        }
      }
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

    for (var i = 0; i < messages.length; i++) {
      if (messages[i].selected) {

        messages.splice(i, 1);
        i--
      }

    }
    }
  }

}());
