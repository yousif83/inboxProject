(function() {
  'use strict';
   angular
   .module('angular-inbox', )
   .controller('composeController', composeController )
   function composeController($http){
       var url = "https://young-lake-58938.herokuapp.com/api/messages"
     const vm=this
    vm.$onInit=function(){
      console.log(vm);
    }
    vm.addMessage=function(messages,txtBody,txtSubject,hideform){
      hideform.flag=true
      var mainBody ={
        subject:txtSubject,
        body:txtBody
      }
      console.log(mainBody);
      $http.post(url,JSON.stringify(mainBody))
      .then(function(response){
       console.log(response.data.body);
       messages.push(response.data)
      })
    }

    }
})();
