app.controller("mypageAgencyprofileController", ['$scope','$rootScope','$http','$location','$mdDialog','$window','$mdToast',function($scope,$rootScope,$http,$location,$mdDialog,$window,$mdToast) {
	$rootScope.header_path="html/header1.html";
	$scope.displayname=profile.displayname;
	$scope.username=profile.username;
	$scope.photourl=http_url+profile.photourl;
	$scope.userid=profile.loginid;
	$scope.inlcudehtmlpath="html/Kpages/agencyprofile/profile.html";
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
		agency_type:[]
	};
	$scope.displaylocation = [];
	$scope.clickprofiletab = function(){
		$scope.inlcudehtmlpath="html/Kpages/agencyprofile/profile.html";
	}
	$scope.agencytypetoggle = function (index) {
        var idx = $scope.editprofile.agency_type.indexOf(index);
        if (idx > -1) {
          $scope.editprofile.agency_type.splice(idx, 1);
        }
        else {
          $scope.editprofile.agency_type.push(index);
        }
      };

    $scope.agencytypeexist = function (index) {
      return $scope.editprofile.agency_type.indexOf(index) > -1;
    };
    $scope.selectprovinceprofile = function () {
      $scope.editprofile.cityindex=$scope.displaylocation.findIndex(x => x[0]==$scope.editprofile.municipality);
    };
    $scope.clicksaveeditedprofile = function () {
      var data=JSON.stringify({user_type:1,id:profile.loginid,displayname:$scope.editprofile.displayname,username:$scope.editprofile.username,
      	performer:$scope.editprofile.performer,section:$scope.editprofile.section-1,company_name:$scope.editprofile.company_name,
      agency_type:$scope.editprofile.agency_type,agency_register_number:$scope.editprofile.agency_register_number,
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
					$scope.inlcudehtmlpath="html/Kpages/agencyprofile/profile.html";
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
    
    //availabletaskpart
    $scope.selectedcategorystring=[];
    $scope.selectedavailablebalance=[];
    $scope.selectedindustry=[];
    $scope.selectedregionstring=[{text:""}];
	$scope.selectedministrystring=[{text:""}];
    //downeddata
    // {"set_cost":"비용설정배렬","pro_part":"전문분야(대행자), 희망분야(사업자) 배렬",
    //  "category_detail":[{카테고리,카테고리세부배렬},...],"business_type":업종,
    //  "address1":"대상지역주소배렬","address2":"부청성배렬","acquire_budget":"취득가능금액"}
	$scope.downeddisplaycategorystring=[];
	$scope.downeddisplayregionstring=[];
	$scope.downeddisplayministrystring=[];
    $scope.downeddisplaycompanystring=[];
    $scope.downedavailabletaskinfo={
    	propartarray:[],
    	categoryarray:[],
    	business_type:0,
    	regionlist:[],
    	companylist:[],
    	acquire_budget:0,
    	set_cost:[]
    };
	$scope.clickavailabletasktab = function(){
		$scope.inlcudehtmlpath="html/Kpages/agencyprofile/showavailabletask.html";
		$http({
	        method: 'get',
	        url: http_url + "api/fscreen/f5/"+profile.loginid,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        	console.log(response.data);
	        	$scope.downedavailabletaskinfo.propartarray=JSON.parse(response.data.result.pro_part);
				$scope.downedavailabletaskinfo.categoryarray=JSON.parse(response.data.result.category_detail);
				$scope.downedavailabletaskinfo.regionlist=JSON.parse(response.data.result.address1);
				$scope.downedavailabletaskinfo.companylist=JSON.parse(response.data.result.address2);
				$scope.downedavailabletaskinfo.set_cost=JSON.parse(response.data.result.set_cost);
				$scope.downedavailabletaskinfo.business_type=response.data.result.business_type;
				$scope.downedavailabletaskinfo.acquire_budget=response.data.result.acquire_budget;
	        	console.log($scope.downedavailabletaskinfo);
	        });
	}
    $scope.bigcategorytoggle = function (index, item) {
        var idx = $scope.selectedcategorystring.findIndex(x => x.category==item);
        if (idx > -1) {
          $scope.selectedcategorystring.splice(idx, 1);
        }
        else {
          $scope.selectedcategorystring.push({beforeindex:index,category:item,detail:[]});
        }
    };

    $scope.bigcategoryexist = function (index,item) {
        return $scope.selectedcategorystring.findIndex(x => x.category==item) > -1;
    };
    $scope.subcategorytoggle = function (index, item) {
        var idx = $scope.selectedcategorystring[index].detail.indexOf(item);
        if (idx > -1) {
          $scope.selectedcategorystring[index].detail.splice(idx, 1);
        }
        else {
          $scope.selectedcategorystring[index].detail.push(item);
        }
      };

    $scope.subcategoryexist = function (index,item) {
        return $scope.selectedcategorystring[index].detail.indexOf(item) > -1;
    };
    $scope.saveavailabletask = function () {
        console.log($scope.selectedcategorystring);
        console.log($scope.selectedavailablebalance);
        console.log($scope.selectedindustry);
        console.log($scope.selectedregionstring);
        console.log($scope.selectedministrystring);
    };
    $scope.gettablerowspan= function(itemlength,array){
		return Math.ceil(array.length/itemlength)+1;
	}
	$scope.clickavailablebalance = function (item) {
        var idx = $scope.selectedavailablebalance.indexOf(item);
        if (idx > -1) {
          $scope.selectedavailablebalance.splice(idx, 1);
        }
        else {
          $scope.selectedavailablebalance.push(item);
        }
    };
    $scope.clickaddregion = function () {
        $scope.selectedregionstring.push({text:""});
    };
    $scope.clickaddministry = function () {
        $scope.selectedministrystring.push({text:""});
    };
    $scope.clickindustryavailable = function (item) {
        var idx = $scope.selectedindustry.indexOf(item);
        if (idx > -1) {
          $scope.selectedindustry.splice(idx, 1);
        }
        else {
          $scope.selectedindustry.push(item);
        }
    };
    //click editprofilebutton in everypage
    $scope.clickeditprofile = function(){
		if($scope.inlcudehtmlpath=="html/Kpages/agencyprofile/profile.html"){
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
		        	$scope.inlcudehtmlpath="html/Kpages/agencyprofile/profileedit.html";
		        	$scope.editprofile.displayname=response.data.result.displayname;
		        	$scope.editprofile.username=response.data.result.username;
		        	$scope.editprofile.performer=response.data.result.performer;
		        	$scope.editprofile.section=response.data.result.section+1;
		        	$scope.editprofile.company_name=response.data.result.company_name;
		        	$scope.editprofile.agency_type=JSON.parse(response.data.result.agency_type);
		        	$scope.editprofile.agency_register_number=response.data.result.agency_register_number;
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
		else if($scope.inlcudehtmlpath=="html/Kpages/agencyprofile/showavailabletask.html"){
			$http({
		        method: 'get',
		        url: http_url + "api/agency/policy_option",
		        headers: {'Content-Type': 'application/json'}
		        }).then(function successCallback(response) {
		        	$scope.downeddisplaycategorystring=response.data.category;
		        	$scope.downeddisplayregionstring=response.data.region;
		        	$scope.downeddisplayministrystring=response.data.ministry;
		        	$scope.downeddisplaycompanystring=response.data.register_insti;
		        	$scope.inlcudehtmlpath="html/Kpages/agencyprofile/availabletask.html";
		        });
		}
	}
}]);