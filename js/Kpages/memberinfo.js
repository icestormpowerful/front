app.controller("mypageMemberinfoController", ['$scope','$rootScope','$http','$location','$mdDialog','$window','$mdToast',function($scope,$rootScope,$http,$location,$mdDialog,$window,$mdToast) {
	$rootScope.header_path="html/header1.html";
	$scope.displayname=profile.displayname;
	$scope.username=profile.username;
	$scope.photourl=http_url+profile.photourl;
	$scope.messagedisplaystring=['display:none;','display:block;'];

	//sidebarpart
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

	//tabpart
	$scope.clickloginfotab = function(){
		$scope.inlcudehtmlpath="html/Kpages/memberinfo/loginfosetting.html";
		$http({
	        method: 'get',
	        url: http_url + "api/profile/membership/login/"+profile.loginid,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        	$scope.lsemailaddress = response.data.e_mail;
	        });
	}
	$scope.clickmailalerttab = function(){
		$scope.inlcudehtmlpath="html/Kpages/memberinfo/mailalert.html";
	}
	$scope.clickoutservicetab = function(){
		$scope.inlcudehtmlpath="html/Kpages/memberinfo/outservice.html";
	}
	$scope.clickblockedusertab = function(){
		$scope.inlcudehtmlpath="html/Kpages/memberinfo/blockuser.html";
	}
	$scope.clickuserregistertab = function(){
		$scope.inlcudehtmlpath="html/Kpages/memberinfo/userregister.html";
	}

	//initpart
	var init = function(){
		$scope.clickloginfotab();
	};
	init();

	//loginfosettingpart
	$scope.inputtypestring = ['focusedInput','inputError','inputSuccess'];
	$scope.formstring =['form-group','form-group has-error has-feedback','form-group has-success has-feedback'];
	$scope.lsuserinfo = {
		changeemail:"",
		displayinputflag:0,
		beforepassword:"",
		displayoldpasswordflag:0,
		newpassword:"",
		displaynewpasswordflag:0,
		confirmpassword:"",
		displayconfirmpasswordflag:0,
		changeemailbuttondisableflag:false,
		changepasswordbuttondisableflag:false,
		changemessageflag:0
	}
	//inputfocus
	$scope.lsloseFocusEmail = function(){
		if($scope.lsuserinfo.changeemail)
			$scope.lsuserinfo.displayinputflag=2;
		else
			$scope.lsuserinfo.displayinputflag=1;
	}
	$scope.lsloseFocusOldpassword = function(){
		if($scope.lsuserinfo.beforepassword.length>7){
			var data = JSON.stringify({id:profile.loginid,pwd:$scope.lsuserinfo.beforepassword});
	        $http({
		        method: 'post',
		        url: http_url + "api/profile/membership/login_pwd",
		        data:data,
		        headers: {'Content-Type': 'application/json'}
		        }).then(function successCallback(response) {
		        	if(response.data.result=="success"){
		        		$scope.lsuserinfo.displayoldpasswordflag=2;
		        	}
		        	else{
		        		$scope.lsuserinfo.displayoldpasswordflag=1;
		        	}
		        });
		}
		else
			$scope.lsuserinfo.displayoldpasswordflag=1;
	}
	$scope.lsloseFocusNewpassword = function(){
		if($scope.lsuserinfo.newpassword.length>7)
			$scope.lsuserinfo.displaynewpasswordflag=2;
		else
			$scope.lsuserinfo.displaynewpasswordflag=1;
	}
	$scope.lsloseFocusCofirmpassword = function(){
		if($scope.lsuserinfo.confirmpassword.length>7){
			if($scope.lsuserinfo.newpassword==$scope.lsuserinfo.confirmpassword)
				$scope.lsuserinfo.displayconfirmpasswordflag=2;
			else
				$scope.lsuserinfo.displayconfirmpasswordflag=1;
		}
		else
			$scope.lsuserinfo.displayconfirmpasswordflag=1;
	}
	//clickchange
	$scope.lsclickchangeemail = function(){
		if($scope.lsuserinfo.changeemail){
			$scope.lsuserinfo.changeemailbuttondisableflag=true;
			var data = JSON.stringify({id:profile.loginid,new_email:$scope.lsuserinfo.changeemail});
	        $http({
		        method: 'post',
		        url: http_url + "api/profile/membership/login",
		        data:data,
		        headers: {'Content-Type': 'application/json'}
		        }).then(function successCallback(response) {
		        	$scope.lsuserinfo.changeemailbuttondisableflag=false;
		        	$scope.lsuserinfo.changemessageflag=1;
		        	console.log(response.data);
		        });
		}
		else
			alert("plz insert email correct!");
	}
	$scope.lsclickchangepassword = function(){
		if(($scope.lsuserinfo.displayoldpasswordflag==2)&&($scope.lsuserinfo.newpassword.length>7)&&
			($scope.lsuserinfo.newpassword==$scope.lsuserinfo.confirmpassword)){
			$scope.lsuserinfo.changepasswordbuttondisableflag=true;
			var data = JSON.stringify({id:profile.loginid,new_pwd:$scope.lsuserinfo.newpassword});
	        $http({
		        method: 'post',
		        url: http_url + "api/profile/membership/login_pwd_set",
		        data:data,
		        headers: {'Content-Type': 'application/json'}
		        }).then(function successCallback(response) {
		        	$scope.lsuserinfo.changepasswordbuttondisableflag=false;
		        	if(response.data.result=="success"){
		        		$scope.lsuserinfo.changemessageflag=1;
		        		$scope.lsuserinfo.beforepassword="";
		        		$scope.lsuserinfo.newpassword="";
		        		$scope.lsuserinfo.confirmpassword="";
		        	}
		        	else{
		        		alert("failed");
		        	}
		        });
		}
		else{
			alert("plz fill all field correct!");
		}
	}
}]);