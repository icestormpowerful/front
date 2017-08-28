app.controller("ESelectController", ['$scope','$rootScope','$http','$location','$window','$mdDialog',function($scope,$rootScope,$http,$location,$window,$mdDialog) {
	$rootScope.header_path="html/header1.html";
	$scope.inlcudehtmlpath="html/Epages/E1.html";
	$scope.displayimageurl=http_url;

	$scope.selectedcategorystring=[];
	$scope.selectedregionstring=[{text:""}];
	$scope.selectedministrystring=[{text:""}];
	$scope.selectedavailablebalance={value:false};

	$scope.downeddisplaycategorystring=[];
	$scope.downeddisplayregionstring=[];
	$scope.downeddisplayministrystring=[];
  	$scope.downeddisplaycompanystring=[];
  	//conditionselectscreen
	var init = function(){
  		$scope.inlcudehtmlpath="html/Epages/E1.html";
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
	$scope.addwayradiochange= function(change){
		if(change==1)
			$scope.inlcudehtmlpath="html/Epages/E1.html";
		else{
			$mdDialog.show(
		      $mdDialog.alert()
		        .parent(angular.element(document.querySelector('#popupContainer')))
		        .clickOutsideToClose(true)
		        .title('ポップアップ')
		        .htmlContent('登録されていない施策を登録する場合には、既に登録されていないかを必ずご確認ください。<br>'+
		        	'また、登録の際には、本部で確認してから本登録されます。修正、登録、削除をする可能性があります。<br>'+
		        	'※悪質な登録に関しては、予告なくアカウント停止をさせて頂く場合があります。')
		        .ariaLabel('確認 Demo')
		        .ok('確認')
		    );
			$scope.inlcudehtmlpath="html/Epages/E4.html";
		}
	}
	$scope.gettablerowspan= function(itemlength,array){
		return Math.ceil(array.length/itemlength)+1;
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
	$scope.clickaddregion = function () {
        $scope.selectedregionstring.push({text:""});
      };
    $scope.clickaddministry = function () {
        $scope.selectedministrystring.push({text:""});
    };
    $scope.searchSubsidy = function () {
        console.log($scope.selectedavailablebalance);
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
      		var data = {category:sendcategoryarray,acquire_budget:parseInt($scope.selectedavailablebalance.value)-1,
      			address1:sendaddress1,address2:sendaddress2,current_page:0,per_page:20,user_id:profile.loginid};
      		$scope.requesttablecondition=data;
      		$scope.requesttableurl="api/agency/policy_search";
		    directtoE2screen();
	    }
	    else{
	    	alert("plz fill all field correct!");
	    }
    };
    $scope.clickusersavedlist = function (indextype) {
      	var data = {user_id:profile.loginid,type:indextype,current_page:0,per_page:20};
        $scope.requesttablecondition=data;
      	$scope.requesttableurl="api/policy_get_by_type";
      	directtoE2screen();
    };
    //listscreen
    $scope.paginationsetting = {
		totalitemcount:0,
		currentpage:1,
		itemperpage:20,
		itemperpagestring:"20",
		currentpageitemcount:0
	}
	$scope.subsidylist=[];
	$scope.requesttablecondition={};
	$scope.requesttableurl="";
	$scope.displaydetailindex=0;
	$scope.itemperpagechanged = function () {
		console.log($scope.paginationsetting.itemperpagestring);
		$scope.paginationsetting.currentpage=1;
		$scope.paginationsetting.itemperpage=parseInt($scope.paginationsetting.itemperpagestring);
		$scope.updatetableitemdata();
	};
    var directtoE2screen = function(){
    	$scope.inlcudehtmlpath="html/Epages/E2.html";
      	$scope.updatetableitemdata();
    };
    $scope.updatetableitemdata = function () {
		console.log("function called");
		$scope.requesttablecondition.current_page=$scope.paginationsetting.currentpage-1;
		$scope.requesttablecondition.per_page=$scope.paginationsetting.itemperpage;
		var data=JSON.stringify($scope.requesttablecondition);
		$http({
	        method: 'post',
	        url: http_url + $scope.requesttableurl,
	        data:data,
	        headers: {'Content-Type': 'application/json'}
	        }).then(function successCallback(response) {
	        	$scope.subsidylist=response.data.result;
	        	$scope.paginationsetting.totalitemcount=response.data.total_item_number;
	        	$scope.paginationsetting.currentpageitemcount=response.data.result.length;
	        });
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
	$scope.viewdetailsubsidy = function(index) {
    	$scope.displaydetailindex=index;
        $scope.inlcudehtmlpath="html/Gpages/Gsubsidydetail.html";
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
    $scope.backtoListscreen = function() {
        $scope.inlcudehtmlpath="html/Epages/E2.html";
    };
    $scope.viewdetailsubsidy = function(index) {
    	$scope.displaydetailindex=index;
        $scope.inlcudehtmlpath="html/Epages/E3.html";
    };
    $scope.selectsubsidy = function(id) {
    };
    //useraddsubsidypart
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
        availableamount:false,
        supportscale:"",
        recruitment:"",
        period:"",
        adoption:"",
        contact:""
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
    $scope.C7clickaddsubsidy = function () {
        if($scope.useraddsubsidy.companyprovince.length<=0||$scope.useraddsubsidy.subsidytag.length<=0||$scope.useraddsubsidy.subsidyname.length<=0||
          $scope.useraddsubsidy.subsidynamesub.length<=0||$scope.useraddsubsidy.purpose.length<=0||$scope.useraddsubsidy.targetinfo.length<=0||
          $scope.useraddsubsidy.support.length<=0||$scope.useraddsubsidy.availableamount==false||$scope.useraddsubsidy.supportscale.length<=0||
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
        var sendcategorydata=[];
        for(var i=0;i<$scope.useraddsubsidy.categoryitemlist.length;i++){
          sendcategorydata.push([$scope.useraddsubsidy.categoryitemlist[i].text,$scope.useraddsubsidy.categoryitemlist[i].subtext]);
        }
        var sendregiondata=[];
        for(i=0;i<$scope.useraddsubsidy.regionlist.length;i++){
          sendregiondata.push([$scope.useraddsubsidy.regionlist[i].province,$scope.useraddsubsidy.regionlist[i].city]);
        }
        var data=JSON.stringify({user_id:profile.loginid,register_insti:$scope.useraddsubsidy.companyprovince,register_insti_detail:$scope.useraddsubsidy.companycity,
          category:sendcategorydata,tag:$scope.useraddsubsidy.subsidytag,region:sendregiondata,name:$scope.useraddsubsidy.subsidyname,
          name_serve:$scope.useraddsubsidy.subsidynamesub,target:$scope.useraddsubsidy.purpose,info:$scope.useraddsubsidy.targetinfo,
          support_content:$scope.useraddsubsidy.support,acquire_budget:parseInt($scope.useraddsubsidy.availableamount)-1,
          support_scale:$scope.useraddsubsidy.supportscale,subscript_duration:$scope.useraddsubsidy.recruitment,
          object_duration:$scope.useraddsubsidy.period,adopt_result:$scope.useraddsubsidy.adoption,inquiry:$scope.useraddsubsidy.contact
        });
        // $http({
        //   method: 'post',
        //   url: http_url + "api/job/policy_with_register",
        //   data:data,
        //   headers: {'Content-Type': 'application/json'}
        //   }).then(function successCallback(response) {
        //     uploadpdffiles(response.data.policy_id);
        //     $scope.inlcudehtmlpath="html/Cpages/C9.html";
        //   });
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
}]);