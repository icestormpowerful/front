app.controller("MasterEmployeeEditController", ['$scope', '$rootScope','$location','$http','$mdDialog',function($scope, $rootScope,$location,$http,$mdDialog) {
  $rootScope.header_path="html/headers/mastersystem.html";
  $scope.tablearray=[];
  $scope.employeename='';
  $scope.employeeloginid='';
  $scope.employeepassword='';
  $scope.employeepasswordverify='';
  $scope.employeepermission=false;
  $scope.messagestring='新規スタッフを登録しました。';
  $scope.employeeidstring='自動で割り当てる';
  $scope.messagestyleclass="success-msg";
  $scope.messageshowstate="display:none;";
  $scope.buttonstringarray=["登録する","編集する"];
  $scope.buttonstatus=0;
  $scope.permissionstring = ["master","運営者","編集者"];
  var tableclassnamestring = ["","odd"];
  var init = function(){
  	var i=0;
  	$scope.tablearray=[];
  	$http({
        method: 'get',
        url: http_url + "api/admin/master/staff",
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
        	for(i=0;i<response.data.length;i++){
        	$scope.tablearray.push({
        		employeeindex:i,
        		classname:tableclassnamestring[i%2],
        		date:response.data[i].created_date,
        		id:response.data[i].id,
        		name:response.data[i].name,
        		permission:response.data[i].permission,
        		login_id:response.data[i].login_id,
        		login_password:response.data[i].password});
        	}
        });
  }
  init();
  $scope.submitRegister = function() {
    if(($scope.employeename.length>0)&&($scope.employeeloginid.length>7)&&($scope.employeepassword.length>7)
    	&&($scope.employeepasswordverify.length>7)&&($scope.employeepassword==$scope.employeepasswordverify)&&($scope.employeepermission!=false)){
    	if($scope.buttonstatus==0){
		var data = JSON.stringify({name:$scope.employeename, id: $scope.employeeloginid, 
			password:$scope.employeepassword, permission:($scope.employeepermission-1)});
	      $http({
	        method: 'post',
	        url: http_url + "api/admin/master/staff",
	        data:data,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	          if(response.data.result=='success'){
	          	$scope.messagestring='新規スタッフを登録しました。';
				$scope.messagestyleclass="success-msg";
				$scope.messageshowstate="display:block;";
				$scope.employeename='';
				$scope.employeeloginid='';
				$scope.employeepassword='';
				$scope.employeepasswordverify='';
				$scope.employeepermission=false;
				init();
	          }
	          else if(response.data.result=='exist'){
	          	$scope.messagestring='ログインidが既に存在します。';
				$scope.messagestyleclass="failed-msg";
				$scope.messageshowstate="display:block;";
	          }
	          else{
	          	$scope.messagestring='server failed: unknown reason';
				$scope.messagestyleclass="failed-msg";
				$scope.messageshowstate="display:block;";
	          }
	        });
	    }
	    else{
	      var data = JSON.stringify({name:$scope.employeename, id: $scope.employeeidstring, login_id:$scope.employeeloginid,
			password:$scope.employeepassword, permission:($scope.employeepermission-1)});
	      $http({
	        method: 'post',
	        url: http_url + "api/admin/master/staff_edit",
	        data:data,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        	console.log(response.data.result);
	          if(response.data.result=='success'){
	          	$scope.messagestring='スタッフ情報を編集しました。';
				$scope.messagestyleclass="warning-msg";
				$scope.messageshowstate="display:block;";
				$scope.buttonstatus=0;
				$scope.employeeidstring='自動で割り当てる';
				$scope.employeename='';
				$scope.employeeloginid='';
				$scope.employeepassword='';
				$scope.employeepasswordverify='';
				$scope.employeepermission=false;
				init();
	          }
	          else if(response.data.result=='not_change'){
	          	$scope.messagestring='スタッフ情報を編集しました。';
				$scope.messagestyleclass="warning-msg";
				$scope.messageshowstate="display:block;";
				$scope.employeeidstring='自動で割り当てる';
				$scope.buttonstatus=0;
				$scope.employeename='';
				$scope.employeeloginid='';
				$scope.employeepassword='';
				$scope.employeepasswordverify='';
				$scope.employeepermission=false;
				init();
	          }
	          else{
	          	$scope.messagestring='server failed: unknown reason';
				$scope.messagestyleclass="failed-msg";
				$scope.messageshowstate="display:block;";
				$scope.employeeidstring='自動で割り当てる';
				$scope.buttonstatus=0;
				$scope.employeename='';
				$scope.employeeloginid='';
				$scope.employeepassword='';
				$scope.employeepasswordverify='';
				$scope.employeepermission=false;
				init();
	          }
	        });
	    }
    }
    else{
      alert("plz fill correct all field");
    }
  }
  $scope.submitDeleteEmployee = function(ev,index) {
    var confirm = $mdDialog.confirm()
          .title('削除してよろしいですか？')
          .ariaLabel('Delete Employee')
          .targetEvent(ev)
          .ok('はい')
          .cancel('いいえ');

    $mdDialog.show(confirm).then(function() {
      console.log(index);
      $http({
        method: 'get',
        url: http_url + "api/admin/master/staff_del/"+$scope.tablearray[index].id+"/0",
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
        	init();
        });
    }, function() {
    });
  };
  $scope.submitEditEmployee = function(index) {
    $scope.employeeidstring=$scope.tablearray[index].id;
    $scope.employeename=$scope.tablearray[index].name;
	$scope.employeeloginid=$scope.tablearray[index].login_id;
	$scope.employeepermission=false;
	$scope.buttonstatus=1;
  };
}]);