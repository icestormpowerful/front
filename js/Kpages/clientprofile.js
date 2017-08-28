app.controller("mypageClientprofileController", ['$scope','$rootScope','$http','$location','$mdDialog','$window','$mdToast',function($scope,$rootScope,$http,$location,$mdDialog,$window,$mdToast) {
	$rootScope.header_path="html/header1.html";
	$scope.displayname=profile.displayname;
	$scope.username=profile.username;
	$scope.photourl=http_url+profile.photourl;
	$scope.userid=profile.loginid;
	$scope.inlcudehtmlpath="html/Kpages/clientprofile/profile.html";
	$scope.directtohome = function(){
		$location.path("/mypage/home" );
	}
	$scope.directtoprofile = function(){
		if(profile.permission==1){
			$location.path("/mypage/agencyprofile" );
		}
		else{
			$location.path("/mypage/clientprofile" );
		}
	}
	$scope.directtomemberinfo = function(){
		$location.path("/mypage/memberinfo" );
	}
	$scope.directtojob = function(){
		if(profile.permission==1){
			$location.path("/mypage/agencyjob" );
		}
		else{
			$location.path("/mypage/clientjob" );
		}
	}
	$scope.directtomessage = function(){
		$location.path("/mypage/message" );
	}
	$scope.directtoauthentication = function(){
		$location.path("/mypage/authentication" );
	}
	$scope.directtopayment = function(){
		if(profile.permission==1){
			$location.path("/mypage/agencypayment" );
		}
		else{
			$location.path("/mypage/clientpayment" );
		}
	}
	$scope.directtoaffiliate = function(){
		$location.path("/mypage/affiliate" );
	}
	$scope.editprofile={
	};
	$scope.displaylocation = [];
	$scope.clickeditprofile = function(){
		var imagenamearray=[];
		$http({
	        method: 'get',
	        url: http_url + "api/address_province_city",
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        	$scope.displaylocation=response.data.result;
	        });
		$http({
	        method: 'get',
	        url: http_url + "api/profile/mypage/"+profile.loginid,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        	$scope.inlcudehtmlpath="html/Kpages/clientprofile/profileedit.html";
	        	$scope.editprofile.displayname=response.data.result.displayname;
	        	$scope.editprofile.username=response.data.result.username;
	        	$scope.editprofile.performer=response.data.result.performer;
	        	$scope.editprofile.section=response.data.result.section+1;
	        	$scope.editprofile.company_name=response.data.result.company_name;
	        	$scope.editprofile.municipality=response.data.result.municipality;
	        	$scope.editprofile.location=response.data.result.location;
	        	$scope.editprofile.street_building_name=response.data.result.street_building_name;
	        	$scope.editprofile.phone_number=response.data.result.phone_number;
	        	$scope.editprofile.fax=response.data.result.fax;
	        	$scope.editprofile.url=response.data.result.url;
	        	$scope.editprofile.self_intro=response.data.result.self_intro;
	        	imagenamearray=response.data.result.image.split("/");
	        	$scope.editprofile.displayimagename=imagenamearray[imagenamearray.length-1];
	        	$scope.editprofile.imagefile="";
	        });
	}
	$scope.clickprofiletab = function(){
		$scope.inlcudehtmlpath="html/Kpages/clientprofile/profile.html";
	}
    $scope.selectprovinceprofile = function () {
      $scope.editprofile.cityindex=$scope.displaylocation.findIndex(x => x[0]==$scope.editprofile.municipality);
    };
    $scope.clicksaveeditedprofile = function () {
      var data=JSON.stringify({user_type:0,id:profile.loginid,displayname:$scope.editprofile.displayname,username:$scope.editprofile.username,
      	performer:$scope.editprofile.performer,section:$scope.editprofile.section-1,company_name:$scope.editprofile.company_name,
      municipality:$scope.editprofile.municipality,location:$scope.editprofile.location,street_building_name:$scope.editprofile.street_building_name,
      phone_number:$scope.editprofile.phone_number,fax:$scope.editprofile.fax,url:$scope.editprofile.url,self_intro:$scope.editprofile.self_intro});
      $http({
	        method: 'post',
	        url: http_url + "api/profile/mypage/edit",
	        data:data,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        	if(response.data.result="success"){
		        	$scope.displayname=$scope.editprofile.displayname;
					$scope.username=$scope.editprofile.username;
					$scope.photourl=http_url+profile.photourl;
					if($scope.editprofile.imagefile!=""){
						var fd = new FormData();
					      var config = {headers: {'Content-Type': undefined}};
					      fd.append("fileToUpload", $scope.editprofile.imagefile);
						  $http.post(http_url + "api/upload_photo/"+profile.loginid, fd, config).then(function successCallback(response) {
						  	$scope.photourl=http_url+response.data.image;
						   });
					}
					$scope.inlcudehtmlpath="html/Kpages/clientprofile/profile.html";
				}
	        });

    };
    $scope.selectNewImage = function ($files) {
      if($files[0]){
      	if($files[0].size<8388608){
	      $scope.editprofile.imagefile=$files[0];
	      $scope.editprofile.displayimagename=$files[0].name;
		  }
		  else{
		  	alert("file size is too big");
		  }
	  }
	  else{
	  	$scope.editprofile.imagefile="";
	    $scope.editprofile.displayimagename="";
	  }
    };
}]);