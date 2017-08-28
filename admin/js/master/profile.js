app.controller("MasterProfileController", ['$scope', '$rootScope','$location','$http',function($scope, $rootScope,$location,$http) {
  $rootScope.header_path="html/headers/mastersystem.html";
  $scope.messagestring='ログイン設定を登録しました。';
  $scope.messagestyleclass="success-msg";
  $scope.messageshowstate="display:none;";
  $scope.beforeid='';
  $scope.beforepassword='';
  $scope.nextid='';
  $scope.nextpassword='';
  $scope.nextpasswordverify='';
  $scope.submitChange = function() {
    if(($scope.beforeid.length>0)&&($scope.beforepassword.length>0)&&($scope.nextid.length>7)
    	&&($scope.nextpassword.length>7)&&($scope.nextpasswordverify.length>7)&&($scope.nextpasswordverify==$scope.nextpassword)){
		var data = JSON.stringify({id:$scope.beforeid, password:$scope.beforepassword, new_id:$scope.nextid,new_password:$scope.nextpassword});
	      $http({
	        method: 'post',
	        url: http_url + "api/admin/master",
	        data:data,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	          if(response.data.result=='incorrect'){
	          	$scope.messagestring='現在の管理者IDが存在しません。';
				$scope.messagestyleclass="failed-msg";
				$scope.messageshowstate="display:block;";
	          }
	          else if(response.data.result=='pwd_error'){
	          	$scope.messagestring='現在の管理者パスワードが一致しません。';
				$scope.messagestyleclass="failed-msg";
				$scope.messageshowstate="display:block;";
	          }
	          else if(response.data.result=='id_exist'){
	          	$scope.messagestring='新しい管理者IDが既に存在します。';
				$scope.messagestyleclass="failed-msg";
				$scope.messageshowstate="display:block;";
	          }
	          else if(response.data.result=='success'){
	          	$scope.messagestring='ログイン設定を登録しました。';
				$scope.messagestyleclass="success-msg";
				$scope.messageshowstate="display:block;";
				$scope.beforeid='';
				$scope.beforepassword='';
				$scope.nextid='';
				$scope.nextpassword='';
				$scope.nextpasswordverify='';
	          }
	          else{
	          	$scope.messagestring='server failed: unknown reason';
				$scope.messagestyleclass="failed-msg";
				$scope.messageshowstate="display:block;";
	          }
	        });
    }
    else{
      alert("plz fill correct all field");
    }
  }
}]);