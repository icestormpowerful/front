app.controller("LoginController", ['$scope','$rootScope','$http','$location',function($scope,$rootScope,$http,$location) {
  $rootScope.header_path="html/header.html";
  $scope.userid='';
  $scope.userpassword='';
  $scope.submitLogin = function() {
    var found=true;
    if($scope.userid.length<4){
      found=false;
    }
    if($scope.userpassword.length<8){
      found=false;
    }
    if(found){
      var data = JSON.stringify({id:$scope.userid,password:$scope.userpassword});
      $http({
        method: 'post',
        url: http_url + "api/users/login",
        data:data,
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
          if(response.data.result=='success'){
            console.log(response.data);
            profile={
                  loginstatus:1,
                  permission:response.data.manage_flag,
                  loginid:response.data.id,
                  displayname:response.data.displayname,
                  username:response.data.username,
                  photourl:response.data.image
              };
              sessionStorage.loginstatus=1;
              sessionStorage.permission=response.data.manage_flag;
              sessionStorage.loginid=response.data.id;
              sessionStorage.displayname=response.data.displayname;
              sessionStorage.username=response.data.username;
              sessionStorage.photourl=response.data.image;
            if(response.data.manage_flag==0)
              $location.path("/client/F0" );
            else
              $location.path("/agency/home" );
          }
          else if(response.data.result=='verify'){
            alert("you need to verify your email address");
          }
          else{
            alert("username or password is incorrect");
          }
        });
    }
    else{
      alert('fill all field correct');
    }
  }
}]);