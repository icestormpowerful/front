app.controller("ERegisterController", ['$scope','$rootScope','$http','$location','KPREsubsidySelectService','$mdDialog','$filter',function($scope,$rootScope,$http,$location,KPREsubsidySelectService,$mdDialog,$filter) {
	$rootScope.header_path="html/header1.html";
	$scope.displaydetailsubsidy={};
	$scope.limitdaystring={
	    max:"",
	    min:""
	}
	var init = function(){
		if(KPREsubsidySelectService.getSubsidyId()==-1){
			$location.path("/agency/Eselect");
		}
		else{
			var data=JSON.stringify({policy_id:KPREsubsidySelectService.getSubsidyId()});
			$http({
		        method: 'post',
		        url: http_url + "api/policy_detail",
		        data:data,
		        headers: {'Content-Type': 'application/json'}
		        }).then(function successCallback(response) {
		        	$scope.displaydetailsubsidy=response.data.result;
		        });
		}
		  var fortnightAway = new Date(+new Date + 12096e5);
	      var datestring = ''+fortnightAway.getFullYear()+'-'+(fortnightAway.getMonth()+1)+'-'+fortnightAway.getDate();
	      $scope.limitdaystring.max=fortnightAway.toISOString().slice(0,10);
	      fortnightAway = new Date();
	      datestring = ''+fortnightAway.getFullYear()+'-'+(fortnightAway.getMonth()+1)+'-'+fortnightAway.getDate();
	      $scope.limitdaystring.min=fortnightAway.toISOString().slice(0,10);
	}
	init();
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
	$scope.inlcudehtmlpath="html/Epages/Eregisterbottom.html";
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
    $scope.checkcontent = function () {
      if($scope.btrequest.title.length>0&&$scope.btrequest.purpose.length>0&&$scope.btrequest.stbalance!=false&&$scope.btrequest.enddate){
        $scope.inlcudehtmlpath="html/Epages/Eregisterbottomverify.html";
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
            url: http_url + "api/job/policy_escreen",
            data:data,
            headers: {'Content-Type': 'application/json'}
            }).then(function successCallback(response) {
              uploadpdffiles(response.data.post_id);
            });
    }
    $scope.backtoeditcontent =function(){
      $scope.inlcudehtmlpath="html/Epages/Eregisterbottom.html";
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
                $location.path("/agency/Ecomplete");
              });
      }
      else{
        $location.path("/agency/Ecomplete");
      }
    }
}]);