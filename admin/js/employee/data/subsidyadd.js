app.controller("SubsidyAddController", ['$scope', '$rootScope','$location','$http','$filter',function($scope, $rootScope,$location,$http,$filter) {
  $rootScope.header_path="html/headers/employeedata.html";
  //dataneedtosend
  $scope.idtext="自動で割り当てる";
  $scope.imageid="";
  $scope.companyprovince="";
  $scope.companycity="";
  $scope.categoryitemlist=[{index:0,text:"",subarray:[],subtext:[]}];
  $scope.subsidytag="";
  $scope.regionlist=[{province:"",city:""}];
  $scope.updatedate="";
  $scope.subsidyname="";
  $scope.subsidynamesub="";
  $scope.purpose="";
  $scope.targetinfo="";
  $scope.support="";
  $scope.availableamount={value:false};
  $scope.supportscale="";
  $scope.recruitment="";
  $scope.period="";
  $scope.adoption="";
  $scope.contact="";
  $scope.recommandsubsidy=false;
  $scope.normalsubsidyflag=false;
  $scope.customersubsidyflag=false;
  $scope.customerid="";
  $scope.customername="";
  $scope.subsidystatus=false;
  $scope.clearbuttondisplaystring="削除する";
  //data that received and need to display
  $scope.provincelist=[];
  $scope.regionprovincelist=[];
  $scope.bigcategorylist=[];
  $scope.smallcategorylist=[];
  $scope.filedisplaystring=["","","","","","",""];
  $scope.availableamountlist=["100万円以下","100万～500万円以下","500万～1000万円以下","1000万～5000万円以下","5000万～1億円以下","1億円以上"];
  var init = function(){
  	var i=0;
  	$http({
        method: 'get',
        url: http_url + "api/admin/staff/policy_register",
        headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
        	$scope.provincelist=response.data.register_insti;
        	$scope.regionprovincelist=response.data.region;
        	for(var i=0;i<response.data.category.length;i++){
        		$scope.bigcategorylist.push(response.data.category[i].category);
        		$scope.smallcategorylist.push(response.data.category[i].detail);
        	}
        });
  }
  init();
  $scope.submitSave = function() {
    console.log($scope.availableamount);
	var cansenddata=true;
		if($scope.categoryitemlist[0].text.length<=0||$scope.categoryitemlist[0].subtext.length<=0)
			cansenddata=false;
		if($scope.regionlist[0].province.length<=0)
			cansenddata=false;
	if($scope.normalsubsidyflag==false&&$scope.customersubsidyflag==false)
		cansenddata=false;
	if($scope.customersubsidyflag==true)
		if($scope.customerid.length<=0&&$scope.customername.length<=0)
		cansenddata=false;
	if($scope.subsidystatus==false)
		cansenddata=false;
	if(cansenddata){
		if($scope.imageid.length>0&&$scope.companyprovince.length>0&&$scope.subsidytag.length>0&&$scope.subsidyname.length>0
		&&$scope.subsidynamesub.length>0&&$scope.purpose.length>0&&$scope.targetinfo.length>0&&$scope.support.length>0&&$scope.availableamount.value!=false
		&&$scope.supportscale.length>0&&$scope.recruitment.length>0&&$scope.period.length>0&&$scope.adoption.length>0&&$scope.contact.length>0){
			if($scope.updatedate){
				// if($scope.updatedate.length>0){
					var sendcategorydata=[];
					for(i=0;i<$scope.categoryitemlist.length;i++){
            if($scope.categoryitemlist[i].text.length>0)
						  sendcategorydata.push([$scope.categoryitemlist[i].text,$scope.categoryitemlist[i].subtext]);
					}
					var sendregiondata=[];
					for(i=0;i<$scope.regionlist.length;i++){
            if($scope.regionlist[i].province.length>0)
						  sendregiondata.push([$scope.regionlist[i].province,$scope.regionlist[i].city]);
					}
					var sendsubsidystatusflag=0;
					if($scope.normalsubsidyflag==true&&$scope.customersubsidyflag==true)
						sendsubsidystatusflag=1;
					else if($scope.normalsubsidyflag==false&&$scope.customersubsidyflag==true)
						sendsubsidystatusflag=2;
					var sendformattedDate =   $filter('date')($scope.updatedate, "yyyy-MM-dd");
          var sendrecommandsubsidy = 0;
          if($scope.recommandsubsidy==true)
            sendrecommandsubsidy = 1;
					var data = JSON.stringify({image_id:$scope.imageid,register_insti:$scope.companyprovince,register_insti_detail:$scope.companycity,
						category:sendcategorydata,tag:$scope.subsidytag,region:sendregiondata,update_date:sendformattedDate,name:$scope.subsidyname,
						name_serve:$scope.subsidynamesub,target:$scope.purpose,info:$scope.targetinfo,support_content:$scope.support,
						acquire_budget:parseInt($scope.availableamount.value)-1,support_scale:$scope.supportscale,subscript_duration:$scope.recruitment,
						object_duration:$scope.period,adopt_result:$scope.adoption,inquiry:$scope.contact,
						recom_bounty:sendrecommandsubsidy,display_option:sendsubsidystatusflag,agency_id:$scope.customerid,
						agency_name:$scope.customername,publication_setting:$scope.subsidystatus-1});
				    $http({
				        method: 'post',
				        url: http_url + "api/admin/staff/policy_register",
				        data:data,
				        headers: {'Content-Type': 'application/json'}
				        }).then(function successCallback(response) {
				          if(response.data.result=="success"){
                    uploadpdffiles(response.data.policy_id);
                  }
				        });
			  //   }
			  //   else
					// alert("plz fill all field correct4!");
			}
			else
				alert("plz fill all field correct!");
	    }
	    else
			alert("plz fill all field correct!");
  	}
  	else
  		alert("plz fill all field correct!");
    };
    $scope.submitClear = function() {
      clearallfield();
    };
    var clearallfield = function(){
      $scope.imageid="";
      $scope.companyprovince="";
      $scope.companycity="";
      $scope.categoryitemlist=[{index:0,text:"",subarray:[],subtext:[]}];
      $scope.subsidytag="";
      $scope.regionlist=[{province:"",city:""}];
      $scope.updatedate="";
      $scope.subsidyname="";
      $scope.subsidynamesub="";
      $scope.purpose="";
      $scope.targetinfo="";
      $scope.support="";
      $scope.availableamount={value:false};
      $scope.supportscale="";
      $scope.recruitment="";
      $scope.period="";
      $scope.adoption="";
      $scope.contact="";
      $scope.recommandsubsidy=false;
      $scope.normalsubsidyflag=false;
      $scope.customersubsidyflag=false;
      $scope.customerid="";
      $scope.customername="";
      $scope.subsidystatus=false;
      $scope.filedisplaystring=["","","","","","",""];
      $scope.files = ["","","","","","",""];
    }
    $scope.clearcustomerdata = function() {
    	$scope.customerid="";
	    $scope.customername="";
    };
    $scope.deletepdffiledata = function(index) {
      $scope.files[index]="";
      $scope.filedisplaystring[index]="";
    };
    $scope.addCategory = function() {
    	if($scope.categoryitemlist.length<$scope.bigcategorylist.length)
      		$scope.categoryitemlist.push({index:$scope.categoryitemlist.length,text:"",subarray:[],subtext:[]});
    };
    $scope.addRegion = function() {
    	if($scope.regionlist.length<20)
      		$scope.regionlist.push({province:"",city:""});
    };
    $scope.selectBigCategory = function(index) {
    	$scope.categoryitemlist[index].subtext=[];
      $scope.categoryitemlist[index].subarray=$scope.smallcategorylist[$scope.bigcategorylist.indexOf($scope.categoryitemlist[index].text)];
    };
    $scope.subcategorytoggle = function (index, item) {
        var idx = $scope.categoryitemlist[index].subtext.indexOf(item);
        if (idx > -1) {
          $scope.categoryitemlist[index].subtext.splice(idx, 1);
        }
        else {
          $scope.categoryitemlist[index].subtext.push(item);
        }
      };

      $scope.subcategoryexists = function (index,item) {
        return $scope.categoryitemlist[index].subtext.indexOf(item) > -1;
      };




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
                   }
                   else{
                    alert("file size is too big to upload");
                   }
                }
            })
        }
    }, false)
    $scope.files = ["","","","","","",""];
    var getindexoffilearray = function(){
      for(var i=0;i<7;i++){
        if($scope.files[i]=="")
          return i;
      }
      return -1;
    }
    var uploadpdffiles = function (subsidyid) {
      var fd = new FormData();
      var config = {headers: {'Content-Type': undefined}};
      var count=0;
      for (var i = 0; i < 7; i++) {
          if($scope.files[i]!=""){
            fd.append("fileToUpload"+count, $scope.files[i]);
            count++;
          }
      }
      if(count>0){
        
        $http.post(http_url + "api/uploadfile/"+subsidyid+"/"+count, fd, config).then(function successCallback(response) {
                clearallfield();
                alert("success");
              });
      }
      else{
        clearallfield();
      }
    }
}]);