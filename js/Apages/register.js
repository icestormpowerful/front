app.controller("RegisterController", ['$scope','$http','$location','$rootScope',function($scope, $http,$location,$rootScope) {
  $rootScope.header_path="html/header.html";
  $scope.formstring =['form-group','form-group has-error has-feedback','form-group has-success has-feedback'];
  $scope.inputtypestring = ['focusedInput','inputError','inputSuccess'];
  $scope.emptydisplaystring = ['display:none;','display:block;'];
  $scope.emptystatearray = [0,0,0,0];
  //email part
  $scope.emailformflag = 0;
  $scope.emailsuccessicon = 'display:none;';
  $scope.emailfailedicon = 'display:none;';
  $scope.useremail = '';
  $scope.loseFocusEmail = function() {
    if ($scope.useremail) {
        var data = JSON.stringify({content:$scope.useremail,type:0});
        $http({
        method: 'post',
        url: http_url + "api/users/check_exist",
        data:data,
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
          if(response.data.result==0){
            $scope.emailformflag = 2;
            $scope.emailsuccessicon = 'display:block;';
            $scope.emailfailedicon = 'display:none;';
          }
          else{
            $scope.emailformflag = 1;
            $scope.emailfailedicon = 'display:block;';
            $scope.emailsuccessicon = 'display:none;';
          }
        });
    }
    else{
        $scope.emailformflag = 1;
        $scope.emailfailedicon = 'display:block;';
        $scope.emailsuccessicon = 'display:none;';
    }
  }

  //password part
  $scope.passwordformflag = 0;
  $scope.passwordsuccessicon = 'display:none;';
  $scope.passwordfailedicon = 'display:none;';
  $scope.userpassword = '';
  $scope.loseFocusPassword = function() {
    if ($scope.userpassword.length>=8) {
        $scope.passwordformflag = 2;
        $scope.passwordsuccessicon = 'display:block;';
        $scope.passwordfailedicon = 'display:none;';
    }
    else{
        $scope.passwordformflag = 1;
        $scope.passwordfailedicon = 'display:block;';
        $scope.passwordsuccessicon = 'display:none;';
    }
  }

  //username part
  $scope.nameformflag = 0;
  $scope.namesuccessicon = 'display:none;';
  $scope.namefailedicon = 'display:none;';
  $scope.recommanddisplay = 'display:none;';
  $scope.recommandstring = '';
  $scope.username = '';
  $scope.loseFocusName = function() {
    if ($scope.username.length>=4) {
        var data = JSON.stringify({content:$scope.username,type:1});
        $http({
        method: 'post',
        url: http_url + "api/users/check_exist",
        data:data,
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
          if(response.data.result==0){
            $scope.nameformflag = 2;
            $scope.namesuccessicon = 'display:block;';
            $scope.namefailedicon = 'display:none;';
            $scope.recommanddisplay = 'display:none;';
          }
          else{
            $scope.nameformflag = 1;
            $scope.namefailedicon = 'display:block;';
            $scope.namesuccessicon = 'display:none;';
            $scope.recommanddisplay = 'display:block;';
            $scope.recommandstring = '' + response.data.recommend[0] + '  ,  ' + response.data.recommend[1];
          }
        });
    }
    else{
        $scope.nameformflag = 1;
        $scope.namefailedicon = 'display:block;';
        $scope.namesuccessicon = 'display:none;';
        $scope.recommanddisplay = 'display:none;';
    }
  }

  //submit
  $scope.submitRegister = function() {
    var sendflag=true;
    if($scope.emailformflag!=2){
      $scope.emptystatearray[0]=1;
      sendflag=false;
    }
    else{
      $scope.emptystatearray[0]=0;
    }

    if($scope.passwordformflag!=2){
      $scope.emptystatearray[1]=1;
      sendflag=false;
    }
    else{
      $scope.emptystatearray[1]=0;
    }

    if($scope.nameformflag!=2){
      $scope.emptystatearray[2]=1;
      sendflag=false;
    }
    else{
      $scope.emptystatearray[2]=0;
    }

    if($scope.wayflag==0||$scope.wayflag==1){
      $scope.emptystatearray[3]=0;
    }
    else{
      $scope.emptystatearray[3]=1;
      sendflag=false;
    }
    if(sendflag){
      var data = JSON.stringify({username:$scope.username,
        displayname:$scope.usernickname,
        e_mail:$scope.useremail,
        password:$scope.userpassword,
        fb_google:0,
        manage_flag:$scope.wayflag});
        $http({
        method: 'post',
        url: http_url + "api/users",
        data:data,
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
          $location.path("/" );
        });
    }
  }
}]);