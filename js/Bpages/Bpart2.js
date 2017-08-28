app.controller("Bpart2Controller", ['$scope','$rootScope','$http','$location','$mdDialog','$window','$mdToast',function($scope,$rootScope,$http,$location,$mdDialog,$window,$mdToast) {
	$rootScope.header_path="html/header1.html";
	$scope.inlcudehtmlpath="html/Bpages/Bpart2-1.html";
  $scope.inlcudeb24nhtmlpath="html/Bpages/Bpart2-4-1-0.html";
	$scope.selectedcategorystring=[];
	$scope.selectedregionstring=[{text:""}];
	$scope.selectedministrystring=[{text:""}];

	$scope.downeddisplaycategorystring=[];
	$scope.downeddisplayregionstring=[];
	$scope.downeddisplayministrystring=[];
  $scope.downeddisplaycompanystring=[];
  $scope.selectedavailablebalance={value:false};
  $scope.F1pricesetting = {
        document_business_check:false,
        document_business_price:0,
        document_business_type:"0",
        request_business_check:false,
        request_business_price:0,
        request_business_type:"0",
        deposit_check:false,
        deposit_money:0,
        deposit_type:"0",
    };

  $scope.F2UsersList=[];

	var init = function(){

  		$scope.inlcudehtmlpath="html/Bpages/Bpart2-1.html";
	      $http({
	        method: 'get',
	        url: http_url + "api/agency/policy_option",
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
            console.log(response.data);
	        	$scope.downeddisplaycategorystring=response.data.category;
	        	$scope.downeddisplayregionstring=response.data.region;
	        	$scope.downeddisplayministrystring=response.data.ministry;
           	$scope.downeddisplaycompanystring=response.data.register_insti;
	        });

       $http({
            method: 'get',
            url: http_url + "api/profile/mypage/"+profile.loginid,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            console.log("-------------------");
            console.log(response.data);
            $scope.F1pricesetting.document_business_price = response.data.result.document_business_price;
            $scope.F1pricesetting.document_business_type = response.data.result.document_business_type+"";
            if($scope.F1pricesetting.document_business_price > 0)
                $scope.F1pricesetting.document_business_check = true;

            $scope.F1pricesetting.request_business_price = response.data.result.request_business_price;
            $scope.F1pricesetting.request_business_type = response.data.result.request_business_type+"";
            if($scope.F1pricesetting.request_business_price > 0)
                $scope.F1pricesetting.request_business_check = true;

            $scope.F1pricesetting.deposit_money = response.data.result.deposit_money;
            $scope.F1pricesetting.deposit_type = response.data.result.deposit_type+"";
            if($scope.F1pricesetting.deposit_money > 0)
                $scope.F1pricesetting.deposit_check = true;
        });

	}
	init();

	$scope.gettablerowspan= function(itemlength,array){
		return Math.ceil(array.length/itemlength)+1;
	}

      $scope.B2Sayong = [];
      $scope.C3subsidy_index=[];
    $scope.C2view_subsidy_detail = function (subsidyindex) {
        $scope.C3subsidy_index=subsidyindex;
        $scope.inlcudehtmlpath="html/Bpages/Bpart2-3.html";

        $scope.policeid = $scope.C2displaysubsidylist[subsidyindex].id;
        $http({
          method: 'get',
          url: http_url + "api/bscreen/general_policy_search/" + $scope.policeid,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            $scope.B2Sayong = response.data.users;
            console.log("user");
            console.log(response.data.users);
          });

      };
    $scope.clickb2followbutton = function(subsidyindex)
    {
        $scope.policeid = $scope.C2displaysubsidylist[subsidyindex].id;
      var data=JSON.stringify({user_id:profile.loginid,follow_id:$scope.policeid});
        $http({
          method: 'post',
          url: http_url + "api/follow",
          data:data,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            console.log("follow");
            console.log(response.data);
          });
    }

    $scope.bpart24resultarray=[];
  $scope.addwayradiochange1= function(change){
    if(change==1)
      $scope.inlcudehtmlpath="html/Bpages/Bpart2-3.html";
    else{
      $scope.inlcudehtmlpath="html/Bpages/Bpart2-4-0.html";

      $scope.policeid = $scope.C2displaysubsidylist[$scope.C3subsidy_index].id;
      $scope.gernalid = $scope.B2Sayong[0].id;
      var data=JSON.stringify({user_id:profile.loginid,policy_id:$scope.policeid,general_id:$scope.gernalid});
      $http({
          method: 'post',
          url: http_url + "api/b_fscreen/general",
          data:data,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {

             $scope.bpart24resultarray = response.data.result;
          });
    }
  }
  $scope.b5Sdataarray=[];
  $scope.general_id =[];
  $scope.b6sdataarray=[];
  var selectb24screen = function(change){
    if(change==1)
    {
      $scope.inlcudeb241nhtmlpath = "html/Bpages/Bpart2-4-1-1.html";
      $scope.policeid = $scope.C2displaysubsidylist[$scope.C3subsidy_index].id;
      $http({
          method: 'get',
          url: http_url + "api/bscreen/b2_get_request/" + $scope.policeid,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            $scope.b5Sdataarray=response.data.result;
            console.log(response.data);
          });


      var data=JSON.stringify({user_id:profile.loginid,policy_id:$scope.policeid,general_id:$scope.general_id});
      $http({
          method: 'post',
          url: http_url + "api/bscreen/b2_get_message",
          data:data,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            $scope.b6sdataarray = response.data.result;
             console.log(response.data);
          });

    }  
    else if(change==2){
      $scope.inlcudeb241nhtmlpath = "html/Bpages/Bpart2-4-1-2.html";
      $scope.policeid = $scope.C2displaysubsidylist[$scope.C3subsidy_index].id;
      $http({
          method: 'get',
          url: http_url + "api/bscreen/b2_get_request/" + $scope.policeid,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            $scope.b5Sdataarray=response.data.result;
            console.log(response.data);
          });
    }
    else if(change==3){
      $scope.inlcudeb241nhtmlpath = "html/Bpages/Bpart2-4-1-3.html";
      $scope.policeid = $scope.C2displaysubsidylist[$scope.C3subsidy_index].id;
      
      var data=JSON.stringify({user_id:profile.loginid,policy_id:$scope.policeid,general_id:$scope.general_id,current_page:1,per_page:10});
      $http({
          method: 'post',
          url: http_url + "api/bscreen/b2_get_total_message",
          data:data,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            $scope.b6sdataarray = response.data.result;
             console.log(response.data);
          });
    }
  }

  $scope.selectb24screen = function(change)
  {
    if(change==1)
    {
      selectb24screen(1);
    }  
    else if(change==2){
      selectb24screen(2);
    }
    else if(change==3){
      selectb24screen(3);
    }
  }

	$scope.backtoC1screen= function(){
	  $scope.inlcudehtmlpath = "html/Bpages/Bpart2-1.html";
	}

$scope.C5availablesubsidyarray=[];
      $scope.C5availablesubsidytotalarray=[];
    $scope.C5pagination = {
        totalitem:1,
        current_page:1,
        itemperpage:20
      }
  $scope.sidebarbuttonclicked = function(change)
  {
    if(change==1)
    { 
      $scope.inlcudehtmlpath = "html/Bpages/Bpart2-4-2.html";
      $http({
          method: 'get',
          url: http_url + "api/b_d_fscreen/get_value/" + profile.loginid,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            $scope.F7DataList = response.data.result;
            $scope.F7SelIndex = 0;
            console.log(response.data);
          });
    }
    else if(change==2)
    { 
      $scope.inlcudehtmlpath = "html/Bpages/Bpart2-5.html";
    }
    else if(change==3)
    { 
      $scope.inlcudehtmlpath = "html/Bpages/Bpart2-6.html";
          var i=0,j=0;
          $http({
          method: 'get',
          url: http_url + "api/agency/matching/policy_lists/" + profile.loginid,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            $scope.C5availablesubsidytotalarray=[];
            for(i=0;i<response.data.result.length;i++){
              if(response.data.result[i].package_name!=""){
                $scope.C5availablesubsidytotalarray.push(response.data.result[i]);
              }
              else{
                for(j=0;j<response.data.result[i].detail.length;j++){
                  $scope.C5availablesubsidytotalarray.push({package_name:"",detail:[response.data.result[i].detail[j]]});
                }
              }
            }
            $scope.C5availablesubsidyarray=$scope.C5availablesubsidytotalarray.slice(0,20);
            $scope.C5pagination.totalitem=$scope.C5availablesubsidytotalarray.length;
          });
    }
    else if(change==4)
    { 
    }
    else if(change==5)
    { 
      $scope.inlcudehtmlpath = "html/Bpages/Bpart2-8.html";
    }
  }

  $scope.bpart18dataarray =[];

  $scope.onClickB18 = function(id){
      $scope.inlcudehtmlpath="html/Bpages/Bpart2-4-0.html";
      $scope.general_id = id;
      $scope.policeid = $scope.C2displaysubsidylist[$scope.C3subsidy_index].id;
      var data=JSON.stringify({user_id:profile.loginid,policy_id:$scope.policeid,general_id:id});
      $http({
          method: 'post',
          url: http_url + "api/b_fscreen/general",
          data:data,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {

             $scope.bpart24resultarray = response.data.result;
             $scope.bpart18dataarray = response.data.user;
             console.log("B18");
             console.log(response.data);
          });
      selectb24screen(1);
  }


    $scope.F15_report_option = 3;
    $scope.F15_report_message = "ssss";
    $scope.F15Report = function () {
        console.log("-------F15_------");
        /*
        {"user_id":'사용자id",
            "report_id":"위반한 사용자 id",
            "report_option":항목(0또는1또는2또는3),
            "message":"메쎄지"}
            */
        var data = JSON.stringify({user_id:profile.loginid,
            report_id:0,
            report_option:$scope.F15_report_option,
            message:$scope.F15_report_message,
        });
        console.log(data);

        $http({
            method: 'post',
            url: http_url + "api/report",
            data:data,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            alert("Success!");
        });
    };
    $scope.gotoOfferB7screen = function()
    {
      $scope.inlcudehtmlpath = "html/Bpages/Bpart2-4-2.html";
      $http({
          method: 'get',
          url: http_url + "api/b_d_fscreen/get_value/" + profile.loginid,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            $scope.F7DataList = response.data.result;
            $scope.F7SelIndex = 0;
            console.log(response.data);
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
      $scope.searchSubsidy = function () {
      	if($scope.selectedcategorystring.length>0&&$scope.selectedavailablebalance.value!=false){
      		var sendcategoryarray=[];
      		var sendaddress1=[];
      		var sendaddress2=[];
      		for(var i=0;i<$scope.selectedcategorystring.length;i++){
      			if($scope.selectedcategorystring[i].detail.length>0)
      				sendcategoryarray.push({category:$scope.selectedcategorystring[i].category,detail:$scope.selectedcategorystring[i].detail});
      			else{
      				alert("plz fill all field correct!");
      				return;
      			}
      		}
      		for(i=0;i<$scope.selectedregionstring.length;i++){
      			if($scope.selectedregionstring[i].text!=""){
      				sendaddress1.push($scope.selectedregionstring[i].text);
      			}
      			else{
      				alert("plz fill all field correct!");
      				return;
      			}
      		}
      		for(i=0;i<$scope.selectedministrystring.length;i++){
      			if($scope.selectedministrystring[i].text!=""){
      				sendaddress2.push($scope.selectedministrystring[i].text);
      			}
      			else{
      				alert("plz fill all field correct!");
      				return;
      			}
      		}

          if($scope.F1pricesetting.document_business_check = false)
                $scope.F1pricesetting.document_business_price = 0;
            if($scope.F1pricesetting.request_business_check = false)
                $scope.F1pricesetting.request_business_price = 0;
            if($scope.F1pricesetting.deposit_check = false)
                $scope.F1pricesetting.deposit_money = 0;


      		var data = JSON.stringify({category:sendcategoryarray,acquire_budget:parseInt($scope.selectedavailablebalance.value)-1,
      			address1:sendaddress1,address2:sendaddress2,current_page:0,per_page:20,
            user_id:profile.loginid,
                document_business_price:$scope.F1pricesetting.document_business_price,
                document_business_type:$scope.F1pricesetting.document_business_type,
                request_business_price:$scope.F1pricesetting.request_business_price,
                request_business_type:$scope.F1pricesetting.request_business_type,
                deposit_money:$scope.F1pricesetting.deposit_money,
                deposit_type:$scope.F1pricesetting.deposit_type,
          });
      		sessionStorage.C2refresshsenddata=data;
      		sessionStorage.C2refresshsendurl="api/bscreen/policy_search";
		    directtoC2screen();
	    }
	    else{
	    	alert("plz fill all field correct!");
	    }
      };
      $scope.clickaddregion = function () {
        $scope.selectedregionstring.push({text:""});
      };
      $scope.clickaddministry = function () {
        $scope.selectedministrystring.push({text:""});
      };
      $scope.clickusersavedlist = function (indextype) {
      	var data = JSON.stringify({user_id:profile.loginid,type:indextype,current_page:0,per_page:20});
        sessionStorage.C2refresshsenddata=data;
      	sessionStorage.C2refresshsendurl="api/policy_get_by_type";
      	directtoC2screen();
      };
      $scope.C2displaysubsidylist=[];
      var directtoC2screen = function(){
      	$http({
	        method: 'post',
	        url: http_url + sessionStorage.C2refresshsendurl,
	        data:sessionStorage.C2refresshsenddata,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        $scope.C2displaysubsidylist=response.data.result;
            $scope.C2pagination.totalitem=response.data.total_item_number;
            $scope.C2pagination.current_page=1;
	          $scope.inlcudehtmlpath="html/Bpages/Bpart2-2.html";
            console.log(response.data);
            console.log(response.data.result);
	        });
      }
      $scope.backtoC2screen = function () {
        directtoC2screen();
      };
      $scope.click_subsidy_put = function (subsidyid,index) {
        var data = JSON.stringify({user_id:profile.loginid,policy_id:subsidyid,type:index});
        $http({
	        method: 'post',
	        url: http_url + "api/policy_put",
	        data:data,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        });
      };
      $scope.selectedsubsidyarray = [];
      $scope.select_subsidy_tosetbalance = function (subsidyid) {
      	var idx = $scope.selectedsubsidyarray.findIndex(x => x.id==subsidyid);
        var arrayindex = $scope.C2displaysubsidylist.findIndex(x => x.id==subsidyid);
        if (idx > -1) {
          $scope.selectedsubsidyarray.splice(idx, 1);
        }
        else {
          if($scope.selectedsubsidyarray.length==10){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .htmlContent('1度に費用設定できる施策は最大で10個です。')
                .ariaLabel('確認 Demo')
                .ok('確認')
            );
          }
          else{
            $scope.selectedsubsidyarray.push({id:subsidyid,data:$scope.C2displaysubsidylist[arrayindex]});
          }
        }
      };
      $scope.exist_subsidy_tosetbalance = function (subsidyid) {
         if($scope.selectedsubsidyarray.findIndex(x => x.id==subsidyid) > -1)
         	return {style:"btn btn-default  btn-style-shadow-gray",text:"選択中"};
         else
         	return {style:"btn btn-success  btn-style-shadow-green",text:"設定する"};
      };
      $scope.C2pagination = {
        totalitem:1,
        current_page:1,
        itemperpage:20
      }
      $scope.C2paginationchange = function () {
        var data=JSON.parse(sessionStorage.C2refresshsenddata);
        data.current_page=$scope.C2pagination.current_page-1;
        data=JSON.stringify(data);
        $http({
          method: 'post',
          url: http_url + sessionStorage.C2refresshsendurl,
          data:data,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            $scope.C2displaysubsidylist=response.data.result;
            $scope.C2pagination.totalitem=response.data.total_item_number;
          });
      };

      $scope.clickdownloadpdf = function(pdfurl,pdfname) {
          if(pdfurl.includes("https://chusho.mirasapo.jp/files")){
            $window.open(pdfurl);
          }
          else{
             var data = JSON.stringify({name:pdfname,link:pdfurl});
              $window.open(http_url + "api/downloadfile/" + pdfurl + '/' +pdfname);
         }
      };
      $scope.initpdfarrayinC3screen = function(pdfstring) {
        var array = JSON.parse(pdfstring);
          return array;
      };
      $scope.direct_set_balance = function() {
        if($scope.selectedsubsidyarray.length>0){
          $scope.inlcudehtmlpath="html/Bpages/Bpart2-4-0.html";
        }
        else
          alert("plz select more than one subsidy!");
      };
      $scope.C4selectedsubsidyarray=[];
      $scope.C4existsubsidy = function (subsidyid) {
        return $scope.C4selectedsubsidyarray.indexOf(subsidyid) > -1;
      };
      $scope.C4gettableitemstyle = function (subsidyid) {
        if($scope.C4selectedsubsidyarray.indexOf(subsidyid) > -1)
          return "background:#DFF1FD;border:2px solid #C1E0E9;";
        else
          return "";
      };
      $scope.C4selectsubsidy = function (subsidyid) {
        var idx = $scope.C4selectedsubsidyarray.indexOf(subsidyid);
        if (idx > -1) {
          $scope.C4selectedsubsidyarray.splice(idx, 1);
        }
        else {
          $scope.C4selectedsubsidyarray.push(subsidyid);
        }
      };
      $scope.C4balancesetting = {
        C4documentbalance:false,
        C4applybalance:false,
        documentbalance:0,
        documentway:"1",
        applybalance:0,
        applyway:"1",
        startbalance:0,
        otherlist:[]
      };
      $scope.applybalancetosubsidy = function () {
        if($scope.C4balancesetting.startbalance<=0){
          alert("plz fill all field correct!");
          return;
        }
        var sum=0;
        for(var i=0;i<$scope.C4balancesetting.otherlist.length;i++){
          if($scope.C4balancesetting.otherlist[i].comment==""||$scope.C4balancesetting.otherlist[i].balance<=0){
            alert("plz fill all field correct!");
            return;
          }
          else
            sum=sum+parseInt($scope.C4balancesetting.otherlist[i].balance);
        }
        if($scope.C4balancesetting.C4documentbalance==true){
          
          if($scope.C4balancesetting.documentway=="2"){
            if($scope.C4balancesetting.documentbalance>100||$scope.C4balancesetting.documentbalance<=0){
              alert("plz fill all field correct!");
              return;
            }
          }
          else{
            if($scope.C4balancesetting.documentbalance<=0){
              alert("plz fill all field correct!");
              return;
            }
          }
        }
        else{
          $scope.C4balancesetting.documentbalance=0;
        }
        if($scope.C4balancesetting.C4applybalance==true){
          
          if($scope.C4balancesetting.applyway=="2"){
            if($scope.C4balancesetting.applybalance>100||$scope.C4balancesetting.applybalance<=0){
              alert("plz fill all field correct!");
              return;
            }
          }
          else{
            if($scope.C4balancesetting.applybalance<=0){
              alert("plz fill all field correct!");
              return;
            }
          }
        }
        else{
          $scope.C4balancesetting.applybalance=0;
        }
        if($scope.C4selectedsubsidyarray.length==0){
          alert("plz select one more subsidy!");
          return;
        }
        var arrayindex=0;
        var data=JSON.stringify({user_id:profile.loginid,policy_id:$scope.C4selectedsubsidyarray,
          document_business_price:$scope.C4balancesetting.documentbalance,document_business_type:parseInt($scope.C4balancesetting.documentway)-1,
          request_business_price:$scope.C4balancesetting.applybalance,request_business_type:parseInt($scope.C4balancesetting.applyway)-1,
          deposit_money:$scope.C4balancesetting.startbalance,other_money:sum,content_type:$scope.C4balancesetting.otherlist});
        $http({
          method: 'post',
          url: http_url + "api/agency/matching/policy",
          data:data,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            for(i=0;i<$scope.C4selectedsubsidyarray.length;i++){
              arrayindex=$scope.selectedsubsidyarray.findIndex(x => x.id==$scope.C4selectedsubsidyarray[i]);
              $scope.selectedsubsidyarray[arrayindex].balance={business:response.data.calc_business,
                start:response.data.calc_deposit,other:response.data.calc_total};
            }
            $scope.C4selectedsubsidyarray=[];
          });
      };
      $scope.return_imageid = function(id){
          return http_url+id;
      }
      $scope.addotherbalanceC4 = function () {
        if($scope.C4balancesetting.otherlist.length<5)
          $scope.C4balancesetting.otherlist.push({comment:"",balance:0});
      };
      $scope.getTotalotherbalanceC4 = function () {
        var sum=0;
        for(var i=0;i<$scope.C4balancesetting.otherlist.length;i++){
          sum=sum+parseInt($scope.C4balancesetting.otherlist[i].balance);
        }
        return sum;
      };
      $scope.hidesearchedsubsidy = function (subsidyid) {
        var selectindex=$scope.C4selectedsubsidyarray.indexOf(subsidyid);
        if(selectindex>-1){
          $scope.C4selectedsubsidyarray.splice(selectindex,1);
        }
        var arrayindex=$scope.selectedsubsidyarray.findIndex(x => x.id==subsidyid);
        $scope.selectedsubsidyarray.splice(arrayindex,1);
      };
      $scope.hideallsettedsubsidy = function () {
        var deletesubsidyidarray = [];
        for(var i=0;i<$scope.selectedsubsidyarray.length;i++){
          if($scope.selectedsubsidyarray[i].balance){
            deletesubsidyidarray.push($scope.selectedsubsidyarray[i].id);
          }
        }
        for(i=0;i<deletesubsidyidarray.length;i++){
          var arrayindex=$scope.selectedsubsidyarray.findIndex(x => x.id==deletesubsidyidarray[i]);
          $scope.selectedsubsidyarray.splice(arrayindex,1);
        }
      };
      $scope.deleteselectedsettedsubsidy = function () {
        var hidesubsidyidarray = [];
        var deletesubsidyidarray = [];
        var arrayindex=0;
        for(var i=0;i<$scope.C4selectedsubsidyarray.length;i++){
          arrayindex=$scope.selectedsubsidyarray.findIndex(x => x.id==$scope.C4selectedsubsidyarray[i]);
          if($scope.selectedsubsidyarray[arrayindex].balance){
            deletesubsidyidarray.push($scope.C4selectedsubsidyarray[i]);
          }
          else{
            hidesubsidyidarray.push($scope.C4selectedsubsidyarray[i]);
          }
        }
        for(i=0;i<hidesubsidyidarray.length;i++){
          arrayindex=$scope.selectedsubsidyarray.findIndex(x => x.id==hidesubsidyidarray[i]);
          $scope.selectedsubsidyarray.splice(arrayindex,1);
        }
        $scope.C4selectedsubsidyarray=[];
        if(deletesubsidyidarray.length>0){
          var confirm = $mdDialog.confirm()
          .title('対応可能施策一覧からも削除されますがよろしいですか？')
          .ariaLabel('delete subsidy')
          .ok('はい')
          .cancel('いいえ');

          $mdDialog.show(confirm).then(function() {
            var data=JSON.stringify({user_id:profile.loginid,policy_id:deletesubsidyidarray});
            $http({
              method: 'post',
              url: http_url + "api/agency/matching/policy_del",
              data:data,
              headers: {'Content-Type': 'application/json'}
              }).then(function successCallback(response) {
                for(i=0;i<deletesubsidyidarray.length;i++){
                  arrayindex=$scope.selectedsubsidyarray.findIndex(x => x.id==deletesubsidyidarray[i]);
                  $scope.selectedsubsidyarray.splice(arrayindex,1);
                }
              });
          }, function() {
          });
        }
      };
      $scope.C4allselectedstate = function () {
        return $scope.selectedsubsidyarray.length==$scope.C4selectedsubsidyarray.length;
      };
      $scope.C4selectallselectedsubsidy = function () {
        if($scope.selectedsubsidyarray.length!=$scope.C4selectedsubsidyarray.length){
          for(var i=0;i<$scope.selectedsubsidyarray.length;i++){
            if($scope.C4selectedsubsidyarray.indexOf($scope.selectedsubsidyarray[i].id)==-1){
              $scope.C4selectedsubsidyarray.push($scope.selectedsubsidyarray[i].id);
            }
          }
        }
        else
          $scope.C4selectedsubsidyarray=[];
      };
      $scope.C5availablesubsidyarray=[];
      $scope.C5availablesubsidytotalarray=[];
      $scope.direct_C5screen = function() {
          $scope.inlcudehtmlpath="html/Bpages/Bpart2-5.html";
          var i=0,j=0;
          $http({
          method: 'get',
          url: http_url + "api/agency/matching/policy_lists/" + profile.loginid,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            $scope.C5availablesubsidytotalarray=[];
            for(i=0;i<response.data.result.length;i++){
              if(response.data.result[i].package_name!=""){
                $scope.C5availablesubsidytotalarray.push(response.data.result[i]);
              }
              else{
                for(j=0;j<response.data.result[i].detail.length;j++){
                  $scope.C5availablesubsidytotalarray.push({package_name:"",detail:[response.data.result[i].detail[j]]});
                }
              }
            }
            $scope.C5availablesubsidyarray=$scope.C5availablesubsidytotalarray.slice(0,20);
            $scope.C5pagination.totalitem=$scope.C5availablesubsidytotalarray.length;
          });
      };
      $scope.C5selectedsubsidyarray = [];
      $scope.C5gettableitemstyle = function (index) {
        if($scope.C5selectedsubsidyarray.indexOf(index) > -1)
          return "background:#DFF1FD;border:2px solid #C1E0E9;";
        else
          return "";
      };
      $scope.C5existingsubsidy = function (index) {
        return $scope.C5selectedsubsidyarray.indexOf(index) > -1;
      };
      $scope.C5selectsubsidy = function (index) {
        var idx = $scope.C5selectedsubsidyarray.indexOf(index);
        if(idx > -1)
          $scope.C5selectedsubsidyarray.splice(idx,1);
        else
          $scope.C5selectedsubsidyarray.push(index);
      };
      $scope.C5pagination = {
        totalitem:1,
        current_page:1,
        itemperpage:20
      }
      $scope.C5paginationchange = function () {
        $scope.C5availablesubsidyarray=$scope.C5availablesubsidytotalarray.slice(20*($scope.C5pagination.current_page-1),20*$scope.C5pagination.current_page);
      };
      $scope.C5hidesubsidy = function (parentindex) {
        var arrayindex=parentindex+20*($scope.C5pagination.current_page-1);
        var idx = $scope.C5selectedsubsidyarray.indexOf(arrayindex);
        $scope.C5availablesubsidyarray.splice(parentindex,1);
        if(idx > -1){
          $scope.C5selectedsubsidyarray.splice(idx,1);
        }
        $scope.C5availablesubsidytotalarray.splice(arrayindex,1);
        $scope.C5paginationchange();
      };
      $scope.C5balancesetting = {
        C5documentbalance:false,
        C5applybalance:false,
        documentbalance:0,
        documentway:"1",
        applybalance:0,
        applyway:"1",
        startbalance:0,
        otherlist:[]
      };
      $scope.editbalancetosubsidyC5 = function () {
        // {"user_id":"대행자id", "policy_id":[시책들의id array],"document_business_price":"서류대행비용",
        // "document_business_type":"0-웬,1-%,돈형태(웬인가%인가)",
        //  "request_business_price":"신청대행비용","request_business_type":"0-웬,1-%, 
        //  돈형태","deposit_setting":2,  "deposit_money":착수금비용, "other_money":"기타비용(총)" , "content_type":"기타비용" }"
        var subsidyidarray=C5makesubsidyarray();
        var confirm = $mdDialog.prompt()
          .title('What would you name your package?')
          .textContent('plz type package name.')
          .placeholder('Package name')
          .ariaLabel('Package name')
          .ok('Okay!')
          .cancel('Cancel');
        var data=JSON.stringify({user_id:profile.loginid,policy_id:subsidyidarray,
          document_business_price:$scope.C5balancesetting.documentbalance,document_business_type:parseInt($scope.C5balancesetting.documentway)-1,
          request_business_price:$scope.C5balancesetting.applybalance,request_business_type:parseInt($scope.C5balancesetting.applyway)-1,
          deposit_setting:2,deposit_money:$scope.C5balancesetting.startbalance,other_money:sum,content_type:$scope.C5balancesetting.otherlist});
        $http({
          method: 'post',
          url: http_url + "api/agency/matching/put_lists",
          data:data,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            
          });
      };
      $scope.addotherbalanceC5 = function () {
        if($scope.C5balancesetting.otherlist.length<5)
          $scope.C5balancesetting.otherlist.push({comment:"",balance:0});
      };
      $scope.getTotalotherbalanceC5 = function () {
        var sum=0;
        for(var i=0;i<$scope.C5balancesetting.otherlist.length;i++){
          sum=sum+parseInt($scope.C5balancesetting.otherlist[i].balance);
        }
        return sum;
      };
      var C5setbalanceflag=1;
      $scope.C5editselectedsubsidy = function () {
        if($scope.C5selectedsubsidyarray.length>0){
          $scope.C5balancesetting = {
            C5documentbalance:false,
            C5applybalance:false,
            documentbalance:0,
            documentway:"1",
            applybalance:0,
            applyway:"1",
            startbalance:0,
            otherlist:[]
          };
          C5setbalancedatafromselected();
          C5setbalanceflag=1;
        }
        else{
          alert("plz select one more subsidy!");
        }
      };
      $scope.C5deleteselectedsubsidy = function () {
        if($scope.C5selectedsubsidyarray.length>0){
          var subsidyidarray=C5makesubsidyarray();
          var arrayindex=0;
          var confirm = $mdDialog.confirm()
          .title('対応可能施策一覧からも削除されますがよろしいですか？')
          .ariaLabel('delete subsidy')
          .ok('はい')
          .cancel('いいえ');

          $mdDialog.show(confirm).then(function() {
            var data=JSON.stringify({user_id:profile.loginid,policy_id:subsidyidarray});
            $http({
              method: 'post',
              url: http_url + "api/agency/matching/policy_del",
              data:data,
              headers: {'Content-Type': 'application/json'}
              }).then(function successCallback(response) {
                for(i=0;i<$scope.C5selectedsubsidyarray.length;i++){
                  if(($scope.C5selectedsubsidyarray[i]-20*($scope.C5pagination.current_page-1))>=0)
                    $scope.C5availablesubsidyarray.splice($scope.C5selectedsubsidyarray[i]-20*($scope.C5pagination.current_page-1),1);
                  $scope.C5availablesubsidytotalarray.splice($scope.C5selectedsubsidyarray[i],1);
                }
                $scope.C5selectedsubsidyarray=[];
              });
          }, function() {
          });
        }
        else{
          alert("plz select one more subsidy!");
        }
      };
      $scope.C5makepackageselectedsubsidy = function () {
        if($scope.C5selectedsubsidyarray.length>0){
          $scope.C5balancesetting = {
            C5documentbalance:false,
            C5applybalance:false,
            documentbalance:0,
            documentway:"1",
            applybalance:0,
            applyway:"1",
            startbalance:0,
            otherlist:[]
          };
          C5setbalancedatafromselected();
          C5setbalanceflag=2;
        }
        else{
          alert("plz select one more subsidy!");
        }
      };
      var C5makesubsidyarray = function(){
        var array=[];
        for(var i=0;i<$scope.C5selectedsubsidyarray.length;i++){
          for(var j=0;j<$scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[i]].detail.length;j++){
            array.push($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[i]].detail[j].to_id);
          }
        }
        return array;
      }
      var C5setbalancedatafromselected = function(){
        for(var i=0;i<$scope.C5selectedsubsidyarray.length;i++){
          var content_type1=JSON.parse($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].other_money_sub);
          var content_type2=JSON.parse($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[i]].detail[0].other_money_sub);
          if($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[i]].detail[0].calc_business!=
            $scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].calc_business){
            return;
          }
          if($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[i]].detail[0].document_business_price!=
            $scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].document_business_price){
            return;
          }
          if($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[i]].detail[0].document_business_type!=
             $scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].document_business_type){
            return;
          }
          if($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[i]].detail[0].request_business_price!=
            $scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].request_business_price){
            return;
          }
          if($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[i]].detail[0].request_business_type!=
            $scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].request_business_type){
            return;
          }
          if($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[i]].detail[0].deposit_money!=
            $scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].deposit_money){
            return;
          }
          if($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[i]].detail[0].other_money!=
            $scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].other_money){
            return;
          }
          if(content_type1.length!=content_type2.length){
            return;
          }
          for(var j=0;j<content_type1.length;j++){
            if(content_type1[j].comment!=content_type2[j].comment){
              return;
            }
            if(content_type1[j].balance!=content_type2[j].balance){
              return;
            }
          }
        }
        $scope.C5balancesetting = {
          C5documentbalance:false,
          C5applybalance:false,
          documentbalance:$scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].document_business_price,
          documentway:$scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].document_business_type,
          applybalance:$scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].request_business_price,
          applyway:$scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].request_business_type,
          startbalance:$scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].deposit_money,
          otherlist:JSON.parse($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].other_money_sub)
        };
        if($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].document_business_price>0){
          $scope.C5balancesetting.C5documentbalance=true;
        }
        if($scope.C5availablesubsidytotalarray[$scope.C5selectedsubsidyarray[0]].detail[0].request_business_price>0){
          $scope.C5balancesetting.C5applybalance=true;
        }
      }
      $scope.C6view_subsidy_detail = function (parentindex , detailindex) {
        $scope.C6subsidy_indexarray = {
          parent:parentindex,
          subindex:detailindex
        }
        $scope.inlcudehtmlpath="html/Bpages/Bpart2-7.html";
      };
      $scope.C6back_button_press = function () {
        $scope.inlcudehtmlpath="html/Bpages/Bpart2-6.html";
      };

      $scope.C6getmoneytype = function (type) {
        if(parseInt(type)==1){
          return "%";
        }
        else
          return "円";
      };
      $scope.C8getmoneytype = function (type) {
        if(parseInt(type)==2){
          return "%";
        }
        else
          return "円";
      };
      $scope.filedisplaystring=["","","","",""];
      $scope.files = ["","","","",""];
      $scope.C7addCategory = function () {
        if($scope.useraddsubsidy.categoryitemlist.length<$scope.downeddisplaycategorystring.length)
          $scope.useraddsubsidy.categoryitemlist.push({text:"",subarray:[],subtext:[]});
      };
      $scope.C7selectBigCategory = function (index) {
        $scope.useraddsubsidy.categoryitemlist[index].subtext=[];
        $scope.useraddsubsidy.categoryitemlist[index].subarray=$scope.downeddisplaycategorystring[$scope.downeddisplaycategorystring.findIndex(
          x => x.category==$scope.useraddsubsidy.categoryitemlist[index].text)].detail;
      };
      $scope.C7subcategorytoggle = function (index, item) {
        var idx = $scope.useraddsubsidy.categoryitemlist[index].subtext.indexOf(item);
        if (idx > -1) {
          $scope.useraddsubsidy.categoryitemlist[index].subtext.splice(idx, 1);
        }
        else {
          $scope.useraddsubsidy.categoryitemlist[index].subtext.push(item);
        }
      };

      $scope.C7subcategoryexists = function (index,item) {
        return $scope.useraddsubsidy.categoryitemlist[index].subtext.indexOf(item) > -1;
      };
      $scope.C7addRegion = function() {
        if($scope.useraddsubsidy.regionlist.length<10)
            $scope.useraddsubsidy.regionlist.push({province:"",city:""});
      };
      $scope.C7amounttoggle = function (index) {
        var idx = $scope.useraddsubsidy.availableamount.indexOf(index);
        if (idx > -1) {
          $scope.useraddsubsidy.availableamount.splice(idx, 1);
        }
        else {
          $scope.useraddsubsidy.availableamount.push(index);
        }
      };

      $scope.C7amountexists = function (index) {
        return $scope.useraddsubsidy.availableamount.indexOf(index) > -1;
      };
      $scope.deletepdffiledata = function(index) {
        $scope.files[index]="";
        $scope.filedisplaystring[index]="";
      };

      $scope.$on('$includeContentLoaded', function () {
            var dropbox = document.getElementById("dropbox");

          // init event handlers
          function dragEnterLeave(evt) {
              evt.stopPropagation();
              evt.preventDefault();
              $scope.$apply(function(){
                  $scope.dropClass = ''
              })
          }
          dropbox.addEventListener("dragenter", dragEnterLeave, false)
          dropbox.addEventListener("dragleave", dragEnterLeave, false)
          dropbox.addEventListener("dragover", function(evt) {
              evt.stopPropagation();
              evt.preventDefault();
              var clazz = 'not-available';
              var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
              $scope.$apply(function(){
                  $scope.dropClass = ok ? 'over' : 'not-available';
              })
          }, false)
          dropbox.addEventListener("drop", function(evt) {
              evt.stopPropagation();
              evt.preventDefault();
              $scope.$apply(function(){
                  $scope.dropClass = '';
              })
              var files = evt.dataTransfer.files;
              if (files.length > 0) {
                  $scope.$apply(function(){
                      
                      for (var i = 0; i < files.length; i++) {
                          if(files[i].size<8388608){
                            var emptyindex=getindexoffilearray();
                            if(emptyindex!=-1){
                              $scope.files[emptyindex]=files[i];
                              if(files[i].size > 1024*1024)
                                $scope.filedisplaystring[emptyindex]=files[i].name + "(" + parseInt(files[i].size/1024/1024)+"MB)";
                              else
                                $scope.filedisplaystring[emptyindex]=files[i].name + "(" + parseInt(files[i].size/1024)+"KB)";
                            }
                            else{
                              $mdDialog.show(
                                $mdDialog.alert()
                                  .parent(angular.element(document.querySelector('#popupContainer')))
                                  .clickOutsideToClose(true)
                                  .htmlContent('アップロードできるファイルは５個までです。')
                                  .ariaLabel('確認 Demo')
                                  .ok('確認')
                              );
                              break;
                            }
                         }
                         else{
                          alert("file size is too big to upload");
                         }
                      }
                  })
              }
          }, false)
    });
    var getindexoffilearray = function(){
      for(var i=0;i<5;i++){
        if($scope.files[i]=="")
          return i;
      }
      return -1;
    }
    $scope.useraddsubsidy = {
        companyprovince:"",
        companycity:"",
        categoryitemlist:[{text:"",subarray:[],subtext:[]}],
        subsidytag:"",
        regionlist:[{province:"",city:""}],
        subsidyname:"",
        subsidynamesub:"",
        purpose:"",
        targetinfo:"",
        support:"",
        availableamount:[],
        supportscale:"",
        recruitment:"",
        period:"",
        adoption:"",
        contact:""
      };
    $scope.C7balancesetting = {
        C7documentbalance:false,
        C7applybalance:false,
        documentbalance:0,
        documentway:"1",
        applybalance:0,
        applyway:"1",
        startbalance:0,
        otherlist:[]
      };
      $scope.addotherbalanceC7 = function () {
        if($scope.C7balancesetting.otherlist.length<5)
          $scope.C7balancesetting.otherlist.push({comment:"",balance:0});
      };
      $scope.getTotalotherbalanceC7 = function () {
        var sum=0;
        for(var i=0;i<$scope.C7balancesetting.otherlist.length;i++){
          sum=sum+parseInt($scope.C7balancesetting.otherlist[i].balance);
        }
        return sum;
      };
      $scope.C7clickaddsubsidy = function () {
        if($scope.useraddsubsidy.companyprovince.length<=0||$scope.useraddsubsidy.subsidytag.length<=0||$scope.useraddsubsidy.subsidyname.length<=0||
          $scope.useraddsubsidy.subsidynamesub.length<=0||$scope.useraddsubsidy.purpose.length<=0||$scope.useraddsubsidy.targetinfo.length<=0||
          $scope.useraddsubsidy.support.length<=0||$scope.useraddsubsidy.availableamount.length<=0||$scope.useraddsubsidy.supportscale.length<=0||
          $scope.useraddsubsidy.recruitment.length<=0||$scope.useraddsubsidy.period.length<=0||$scope.useraddsubsidy.adoption.length<=0||
          $scope.useraddsubsidy.contact.length<=0){
          alert("plz fill all field correctly!");
          return;
        }
        for(var i=0;i<$scope.useraddsubsidy.categoryitemlist.length;i++){
          if($scope.useraddsubsidy.categoryitemlist[i].text==""||$scope.useraddsubsidy.categoryitemlist[i].subtext.length<=0){
            alert("plz fill all field correctly!");
            return;
          }
        }
        for(var i=0;i<$scope.useraddsubsidy.regionlist.length;i++){
          if($scope.useraddsubsidy.regionlist[i].province==""){
            alert("plz fill all field correctly!");
            return;
          }
        }

        if($scope.C7balancesetting.startbalance<=0){
          alert("plz fill all field correct!");
          return;
        }
        var sum=0;
        for(var i=0;i<$scope.C7balancesetting.otherlist.length;i++){
          if($scope.C7balancesetting.otherlist[i].comment==""||$scope.C7balancesetting.otherlist[i].balance<=0){
            alert("plz fill all field correct!");
            return;
          }
          else
            sum=sum+parseInt($scope.C7balancesetting.otherlist[i].balance);
        }
        if($scope.C7balancesetting.C7documentbalance==true){
          
          if($scope.C7balancesetting.documentway=="2"){
            if($scope.C7balancesetting.documentbalance>100||$scope.C7balancesetting.documentbalance<=0){
              alert("plz fill all field correct!");
              return;
            }
          }
          else{
            if($scope.C7balancesetting.documentbalance<=0){
              alert("plz fill all field correct!");
              return;
            }
          }
        }
        else{
          $scope.C7balancesetting.documentbalance=0;
        }
        if($scope.C7balancesetting.C7applybalance==true){
          if($scope.C7balancesetting.applyway=="2"){
            if($scope.C7balancesetting.applybalance>100||$scope.C7balancesetting.applybalance<=0){
              alert("plz fill all field correct!");
              return;
            }
          }
          else{
            if($scope.C7balancesetting.applybalance<=0){
              alert("plz fill all field correct!");
              return;
            }
          }
        }
        else{
          $scope.C7balancesetting.applybalance=0;
        }
        $scope.inlcudehtmlpath="html/Bpages/Bpart2-8.html";
      };

      $scope.getpdfstringC8 = function () {
        var string="";
        for(var i=0;i<5;i++){
          if($scope.filedisplaystring[i]!="")
            string=string+$scope.filedisplaystring[i]+",";
        }
        string.splice(string.length-1,1);
        return string;
      };
      $scope.displayamountstringC8 = ["100万円以下","100万〜500万円以下","500万〜1000円万以下","1000万〜5000万以下","5000万〜1億円以下","1億円以上"];
      $scope.C8addsubsidy = function () {
        // { "user_id":"사용자id","register_insti":"등록기관",  "register_insti_detail":"등록기관 싸브(빈문자렬이 될수도있음)" ,
        // "category":"카테고리목록array","tag":"태그","region":"대상지역 array","name":"시책이름","name_serve":"시책이름써브",
        // "target":"목적","info":"대상자의 정보","support_content":"지원내용","acquire_budget":"취득 가능금액설정",
        // "support_scale":"지원규모","subscript_duration":"모집기간","object_duration":"대상기간","adopt_result":"채택결과",
        // "inquiry":"문의","document_business_price":"서류대행비용","document_business_type":"돈형태(웬인가%인가)",
        //  "request_business_price":"신청대행비용","request_business_type":"돈형태","deposit_setting":2  ,
        //  "deposit_money":착수금비용,"other_money":"기타비용(총)" , "content_type":"기타비용"}
        var sendcategorydata=[];
        for(var i=0;i<$scope.useraddsubsidy.categoryitemlist.length;i++){
          sendcategorydata.push([$scope.useraddsubsidy.categoryitemlist[i].text,$scope.useraddsubsidy.categoryitemlist[i].subtext]);
        }
        var sendregiondata=[];
        for(i=0;i<$scope.useraddsubsidy.regionlist.length;i++){
          sendregiondata.push([$scope.useraddsubsidy.regionlist[i].province,$scope.useraddsubsidy.regionlist[i].city]);
        }
        var sum=0;
        for(i=0;i<$scope.C7balancesetting.otherlist.length;i++)
          sum=sum+$scope.C7balancesetting.otherlist[i].balance;
          var data=JSON.stringify({user_id:profile.loginid,register_insti:$scope.useraddsubsidy.companyprovince,register_insti_detail:$scope.useraddsubsidy.companycity,
          category:sendcategorydata,tag:$scope.useraddsubsidy.subsidytag,region:sendregiondata,name:$scope.useraddsubsidy.subsidyname,
          name_serve:$scope.useraddsubsidy.subsidynamesub,target:$scope.useraddsubsidy.purpose,info:$scope.useraddsubsidy.targetinfo,
          support_content:$scope.useraddsubsidy.support,acquire_budget:$scope.useraddsubsidy.availableamount,
          support_scale:$scope.useraddsubsidy.supportscale,subscript_duration:$scope.useraddsubsidy.recruitment,
          object_duration:$scope.useraddsubsidy.period,adopt_result:$scope.useraddsubsidy.adoption,inquiry:$scope.useraddsubsidy.contact,
          document_business_price:$scope.C7balancesetting.documentbalance,document_business_type:parseInt($scope.C7balancesetting.documentway)-1,
          request_business_price:$scope.C7balancesetting.applybalance,request_business_type:parseInt($scope.C7balancesetting.applyway)-1,deposit_setting:2,
          deposit_money:$scope.C7balancesetting.startbalance,other_money:sum,content_type:$scope.C7balancesetting.otherlist
        });
        $http({
          method: 'post',
          url: http_url + "api/agency/matching/policy_with_register",
          data:data,
          headers: {'Content-Type': 'application/json'}
          }).then(function successCallback(response) {
            uploadpdffiles(response.data.policy_id);
            $scope.inlcudehtmlpath="html/Bpages/Bpart2-9.html";
          });
      };
      var uploadpdffiles = function (subsidyid) {
        var fd = new FormData();
        var config = {headers: {'Content-Type': undefined}};
        var count=0;
        for (var i = 0; i < 5; i++) {
            if($scope.files[i]!=""){
              fd.append("fileToUpload"+count, $scope.files[i]);
              count++;
            }
        }
        if(count>0){
          
          $http.post(http_url + "api/uploadfile/"+subsidyid+"/"+count, fd, config).then(function successCallback(response) {
                  alert("success");
                });
        }
      }
      $scope.C9gotomainscreen = function () {
        $location.path("/agency/home" );
      };
}]);