app.controller("GHomeController", ['$scope','$rootScope','$http','$location','KPRGsubsidySearchService','$mdDialog','$filter',function($scope,$rootScope,$http,$location,KPRGsubsidySearchService,$mdDialog,$filter) {
	$rootScope.header_path="html/header1.html";
	//toppart
	$scope.topinlcudehtmlpath="html/Gpages/Ghometop.html";
	$scope.displaydetailsubsidy={};
  $scope.reselectbuttonflag=true;
  $scope.limitdaystring={
    max:"",
    min:""
  }
  $scope.btrequest={
      title:"",
      purpose:"",
      important:[],
      comment:"",
      enddate:"",
      stbalance:false,
      startbalance:0,
      job_business:false,
      document_business_flag:false,
      document_business_balance:0,
      request_business_flag:false,
      request_business_balance:false,
      other_business_flag:false,
      other_business_balance:0,
      payoption:[]
    };
  $scope.filedisplaystring=["","","","",""];
  $scope.files = ["","","","",""];
	$scope.getsubsidyselectbuttonpos = function(index){
		return "float:right;margin-bottom:0px;margin-left:0px;margin-right:0px;width: 50%;margin-top:"+(index-1)*40+"px;";
	}
	$scope.reselectsubsidy = function(){
		KPRGsubsidySearchService.setselectedsubsidyid(-1);
		$scope.topinlcudehtmlpath="html/Gpages/Ghometop.html";
	}
	var init = function(){
      var fortnightAway = new Date(+new Date + 12096e5);
      var datestring = ''+fortnightAway.getFullYear()+'-'+(fortnightAway.getMonth()+1)+'-'+fortnightAway.getDate();
      $scope.limitdaystring.max=fortnightAway.toISOString().slice(0,10);
      fortnightAway = new Date();
      datestring = ''+fortnightAway.getFullYear()+'-'+(fortnightAway.getMonth()+1)+'-'+fortnightAway.getDate();
      $scope.limitdaystring.min=fortnightAway.toISOString().slice(0,10);
      console.log($scope.limitdaystring);
		if(KPRGsubsidySearchService.getselectedsubsidyid()==-1)
			$scope.topinlcudehtmlpath="html/Gpages/Ghometop.html";
		else{
			var data=JSON.stringify({policy_id:KPRGsubsidySearchService.getselectedsubsidyid()});
			$http({
		        method: 'post',
		        url: http_url + "api/policy_detail",
		        data:data,
		        headers: {'Content-Type': 'application/json'}
		        }).then(function successCallback(response) {
		        	$scope.displaydetailsubsidy=response.data.result;
		        	$scope.topinlcudehtmlpath="html/Gpages/Ghometopselected.html";
		        });
		}
    if(KPRGsubsidySearchService.getrequestsetting()){
      $scope.btrequest=KPRGsubsidySearchService.getrequestsetting();
      $scope.filedisplaystring=KPRGsubsidySearchService.getfilestring();
      $scope.files=KPRGsubsidySearchService.getfilearray();
    }
		$http({
	        method: 'get',
	        url: http_url + "api/agency/policy_option",
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        	$scope.downeddisplaycategorystring=response.data.category;
	        	$scope.downeddisplayregionstring=response.data.region;
	        	$scope.downeddisplayministrystring=response.data.ministry;
	        	$scope.downeddisplaycompanystring=response.data.register_insti;
	        });
	}
	init();
	$scope.selectedcategorystring=[];
	$scope.selectsubsidybuttondisableflag=false;
    $scope.selectedavailablebalance=[];
    $scope.selectedregionstring=[{text:""}];
	$scope.selectedministrystring=[{text:""}];
	// $scope.selectedbalancesetting={
	// 	documentflag:false,
	// 	documentbalance:0,
	// 	documentway:"1",
	// 	applyflag:false,
	// 	applybalance:0,
	// 	applyway:"1",
	// 	startflag:false,
	// 	startbalance:0
	// };
    //downeddata
	$scope.downeddisplaycategorystring=[];
	$scope.downeddisplayregionstring=[];
	$scope.downeddisplayministrystring=[];
    $scope.downeddisplaycompanystring=[];
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
        if($scope.selectedcategorystring.length>0&&$scope.selectedavailablebalance.length>0){
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
      		$scope.subsidyselectconditiondata.customdata={category:sendcategoryarray,
      			acquire_budget:$scope.selectedavailablebalance,address1:sendaddress1,address2:sendaddress2,user_id:profile.loginid};
      		$scope.selectsubsidybuttondisableflag=false;
	    }
	    else{
	    	alert("plz fill all field correct!");
	    }
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
    $scope.subsidyselectconditiondata={
    	type:1,
    	customdata:""
    };
    $scope.clickselectsubsidy = function () {
    	if($scope.subsidyselectconditiondata.type==1){
	    	var data={user_id:profile.loginid,type:0};
	        KPRGsubsidySearchService.addSubsidy(data,"api/policy_get_by_type",0);
          KPRGsubsidySearchService.setrequestsetting($scope.btrequest);
          KPRGsubsidySearchService.setfileoption($scope.filedisplaystring,$scope.files);
          $location.path("/client/Glist");
 		}
 		else if($scope.subsidyselectconditiondata.type==2){
	    	var data={user_id:profile.loginid,type:1};
	        KPRGsubsidySearchService.addSubsidy(data,"api/policy_get_by_type",1);
          KPRGsubsidySearchService.setrequestsetting($scope.btrequest);
          KPRGsubsidySearchService.setfileoption($scope.filedisplaystring,$scope.files);
          $location.path("/client/Glist");
 		}
 		else if($scope.subsidyselectconditiondata.type==2){
	    	//autosearch
 		}
 		else if($scope.subsidyselectconditiondata.type==4){
 			if($scope.subsidyselectconditiondata.customdata!=""){
		    	var data=$scope.subsidyselectconditiondata.customdata;
		        KPRGsubsidySearchService.addSubsidy(data,"api/agency/policy_search",0);
            KPRGsubsidySearchService.setrequestsetting($scope.btrequest);
            KPRGsubsidySearchService.setfileoption($scope.filedisplaystring,$scope.files);
            $location.path("/client/Glist");
		    }
		    else{
		    	alert("plz select custom condition");
		    }
 		}
    };
    $scope.clickcustomcondition = function () {
    	if($scope.subsidyselectconditiondata.customdata=="")
        	$scope.selectsubsidybuttondisableflag=true;
    };
    $scope.clickothercondition = function () {
        $scope.selectsubsidybuttondisableflag=false;
    };
    $scope.initpdfarrayinC3screen = function(pdfstring) {
        var array=JSON.parse(pdfstring);
          return array;
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


	//bottompart
	$scope.bottominlcudehtmlpath="html/Gpages/Ghomebottom.html";
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
              console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
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
//     "job_business":"0-의뢰업무설정안함, 1- 설정함",
// "document_business_price":"서류대행비용", 
// "document_business_type":"%, 웬", 
// "request_business_price":"신청대행비용",
// "request_business_type":"%,웬",
// ,"other_money":"기타비용(총)

    $scope.importanttoggle = function (index) {
        var idx = $scope.btrequest.important.indexOf(index);
        if (idx > -1) {
          $scope.btrequest.important.splice(idx, 1);
        }
        else {
          $scope.btrequest.important.push(index);
        }
    };

    $scope.importantexist = function (index) {
        return $scope.btrequest.important.indexOf(index) > -1;
    };
    $scope.checkcontent = function () {
      if($scope.topinlcudehtmlpath!="html/Gpages/Ghometopselected.html"){
        alert("plz select subsidy!");
        return;
      }
      if($scope.btrequest.title.length>0&&$scope.btrequest.purpose.length>0&&$scope.btrequest.stbalance!=false&&$scope.btrequest.enddate){
        $scope.reselectbuttonflag=false;
        $scope.bottominlcudehtmlpath="html/Gpages/Ghomebottomverify.html";
      }
      else{
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .htmlContent('必須項目を入力してください。')
            .ariaLabel('確認 Demo')
            .ok('確認')
        );
      }
    };
    $scope.payoptiontoggle = function (index) {
        var idx = $scope.btrequest.payoption.indexOf(index);
        if (idx > -1) {
          $scope.btrequest.payoption.splice(idx, 1);
        }
        else {
          $scope.btrequest.payoption.push(index);
        }
    };

    $scope.payoptionexist = function (index) {
        return $scope.btrequest.payoption.indexOf(index) > -1;
    };
    //bottomverifypart
    $scope.displayimportantstring=['予算','納期','こまめな連絡','クオリティー','実績評価','取得確率','手離れの良さ','その他'];
    $scope.displayrequeststring=['0%以下','20%以下','30%以下','40%以下'];
    $scope.getenddatedisplaystring =function(date){
      var datestring = ''+date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日';
      return datestring;
    }
    $scope.getfiledisplayarray =function(){
      var array=[];
      for(var i=0;i<$scope.filedisplaystring.length;i++){
        if($scope.filedisplaystring[i]!="")
          array.push($scope.filedisplaystring[i]);
      }
      return array;
    }
    $scope.clickregistercontent =function(){
      var sendformattedDate =   $filter('date')($scope.btrequest.enddate, "yyyy-MM-dd");
      var data=JSON.stringify({user_id:profile.loginid,policy_id:$scope.displaydetailsubsidy.id,title:$scope.btrequest.title,
        content:$scope.btrequest.purpose,main_point:$scope.btrequest.important,sub_content:$scope.btrequest.comment,
        complete_date:sendformattedDate,job_business:Number($scope.btrequest.job_business),document_business:Number($scope.btrequest.document_business_flag),
        document_business_price:$scope.btrequest.document_business_balance,document_business_type:0,request_business:Number($scope.btrequest.request_business_flag),
        request_business_price:Number($scope.btrequest.request_business_balance)-1,request_business_type:0,other:Number($scope.btrequest.other_business_flag),
        other_money:$scope.btrequest.other_business_balance,deposit_setting:parseInt($scope.btrequest.stbalance)-1,deposit_money:$scope.btrequest.startbalance,
        pay_option:$scope.btrequest.payoption});
      $http({
            method: 'post',
            url: http_url + "api/job/policy",
            data:data,
            headers: {'Content-Type': 'application/json'}
            }).then(function successCallback(response) {
              uploadpdffiles(response.data.post_id);
            });
    }
    $scope.backtoeditcontent =function(){
      $scope.bottominlcudehtmlpath="html/Gpages/Ghomebottom.html";
      $scope.reselectbuttonflag=true;
    }
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
        
        $http.post(http_url + "api/uploadfile_post/"+subsidyid+"/"+count, fd, config).then(function successCallback(response) {
                $location.path("/client/Gcomplete");
              });
      }
      else{
        $location.path("/client/Gcomplete");
      }
    }
}]);