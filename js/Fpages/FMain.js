app.controller("FMainController", ['$scope','$rootScope','$http','$location',function($scope,$rootScope,$http,$location) {
    $scope.inlcudehtmlpath="html/Fpages/F16.html";
    $scope.BusinessType=[
        "100万円以下",
        "100万〜500万円以下",
        "500万〜1000円万以下",
        "1000万〜5000万以下",
        "5000万〜1億円以下",
        "1億円以上"];
    // var BusinessStringByType = function(type)
    // {
    //     return BusinessType[type];
    // }
//F16
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
    $scope.selectedcategorystring=[];
    $scope.selectedregionstring=[{text:""}];
    $scope.selectedministrystring=[{text:""}];
    $scope.selectedavailablebalance=0;

    $scope.downeddisplaycategorystring=[];
    $scope.downeddisplayregionstring=[];
    $scope.downeddisplayministrystring=[];
    $scope.downeddisplaycompanystring=[];

    var init = function(){
        $http({
            method: 'get',
            url: http_url + "api/agency/policy_option",
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            console.log("--------F16-----------");
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
            console.log("--------F16-----------");
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
    };
    init();

    $scope.gettablerowspan= function(itemlength,array){
        return Math.ceil(array.length/itemlength)+1;
    };
    $scope.bigcategoryexist = function (index,item) {
        return $scope.selectedcategorystring.findIndex(x => x.category==item) > -1;
    };
    $scope.bigcategorytoggle = function (index, item) {
        var idx = $scope.selectedcategorystring.findIndex(x => x.category==item);
        if (idx > -1) {
            $scope.selectedcategorystring.splice(idx, 1);
        }
        else {
            $scope.selectedcategorystring.push({beforeindex:index,category:item,detail:[]});
        }
    };

    $scope.subcategoryexist = function (index,item) {
        return $scope.selectedcategorystring[index].detail.indexOf(item) > -1;
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
    // $scope.clickavailablebalance = function (item) {
    //     var idx = $scope.selectedavailablebalance.indexOf(item);
    //     if (idx > -1) {
    //         $scope.selectedavailablebalance.splice(idx, 1);
    //     }
    //     else {
    //         $scope.selectedavailablebalance.push(item);
    //     }
    // };
    $scope.clickaddregion = function () {
        $scope.selectedregionstring.push({text:""});
    };
    $scope.clickaddministry = function () {
        $scope.selectedministrystring.push({text:""});
    };

    $scope.searchSubsidy = function () {
        if($scope.selectedcategorystring.length>0){
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
            // "document_business_price":"서류대행비용(없으면0)",
            // "document_business_type":"0(웬)또는 1(%),
            // "request_business_price":"신청대행비용",
            //     "request_business_type":"0(웬)또는 1(%)",
            //     "deposit_money":"착수금",
            //     "deposit_type":"0(웬)또는 1(%)"}

            if($scope.F1pricesetting.document_business_check = false)
                $scope.F1pricesetting.document_business_price = 0;
            if($scope.F1pricesetting.request_business_check = false)
                $scope.F1pricesetting.request_business_price = 0;
            if($scope.F1pricesetting.deposit_check = false)
                $scope.F1pricesetting.deposit_money = 0;

            var data = JSON.stringify({category:sendcategoryarray,
                acquire_budget:$scope.selectedavailablebalance,
                address1:sendaddress1,
                address2:sendaddress2,
                current_page:0,
                per_page:$scope.F1CountPerPage.value,
                user_id:profile.loginid,
                document_business_price:$scope.F1pricesetting.document_business_price,
                document_business_type:$scope.F1pricesetting.document_business_type,
                request_business_price:$scope.F1pricesetting.request_business_price,
                request_business_type:$scope.F1pricesetting.request_business_type,
                deposit_money:$scope.F1pricesetting.deposit_money,
                deposit_type:$scope.F1pricesetting.deposit_type,
            });
            sessionStorage.F1refresshsenddata=data;
            sessionStorage.F1refresshsendurl="api/fscreen/policy_search";
            $scope.inlcudehtmlpath="html/Fpages/F1.html";
            directtoF1screen();
        }
        else{
            alert("plz fill all field correct!");
        }
    };












//F1
    $scope.displayimageurl=http_url;
    $scope.F1CountPerPage = {value : "5"};
    $scope.F1displaysubsidylist=[];
    $scope.F2UsersList=[];
    var directtoF1screen = function(){
        $http({
            method: 'post',
            url: http_url + sessionStorage.F1refresshsendurl,
            data:sessionStorage.F1refresshsenddata,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            console.log(response.data.result);
            /*
             {"result":[시책object배렬],
             "total_item_number":"총검색개수"}
             */
            $scope.F1displaysubsidylist=response.data.result;
            $scope.F1pagination.totalitem=response.data.total_item_number;
            $scope.F1pagination.current_page=1;
        });
    }
    $scope.F1view_subsidy_detail = function (subsidyindex) {
        $http({
            method: 'get',
            url: http_url + "api/fscreen/general_policy_search/"+$scope.F1displaysubsidylist[subsidyindex].id,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            console.log("--F1view_subsidy_detail--");
            console.log(response.data);
            $scope.F2UsersList=response.data.users;
            $scope.F2subsidy_index=subsidyindex;
            $scope.inlcudehtmlpath="html/Fpages/F2.html";
        });
    };
    //{"user_id":"사용자id","type":"0-제안을 검토목록,1-흥미,2-숨기기","current_page":"현재몇번째페지","per_page":"한페지당개수"}
    $scope.search_Subsidy_type = function (index) {
        var data = JSON.stringify({user_id:profile.loginid,type:index, current_page:0, per_page:20});
        sessionStorage.F1refresshsenddata=data;
        sessionStorage.F1refresshsendurl="api/policy_get_by_type";
        $scope.inlcudehtmlpath="html/Fpages/F1.html";
        directtoF1screen();
    };

    $scope.click_subsidy_put = function (subsidyid,index) {
        var data = JSON.stringify({user_id:profile.loginid,policy_id:subsidyid,type:index});
        $http({
            method: 'post',
            url: http_url + "api/policy_put",
            data:data,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            if(index == 2 && $scope.inlcudehtmlpath=="html/Fpages/F1.html")
            {
                directtoF1screen();
            }
        });
    };
    $scope.selectedsubsidyarray = [];
    //
    // $scope.select_subsidy_tosetbalance = function (subsidyid) {
    //     var idx = $scope.selectedsubsidyarray.findIndex(x => x.id==subsidyid);
    //     var arrayindex = $scope.C2displaysubsidylist.findIndex(x => x.id==subsidyid);
    //     if (idx > -1) {
    //         $scope.selectedsubsidyarray.splice(idx, 1);
    //     }
    //     else {
    //         if($scope.selectedsubsidyarray.length==10){
    //             $mdDialog.show(
    //                 $mdDialog.alert()
    //                     .parent(angular.element(document.querySelector('#popupContainer')))
    //                     .clickOutsideToClose(true)
    //                     .htmlContent('1度に費用設定できる施策は最大で10個です。')
    //                     .ariaLabel('確認 Demo')
    //                     .ok('確認')
    //             );
    //         }
    //         else{
    //             $scope.selectedsubsidyarray.push({id:subsidyid,data:$scope.C2displaysubsidylist[arrayindex]});
    //         }
    //     }
    // };
    $scope.F1pagination = {
        totalitem:1,
        current_page:1,
        itemperpage:20
    }
    $scope.F1paginationchange = function () {
        var data=JSON.parse(sessionStorage.F1refresshsenddata);
        data.current_page=$scope.F1pagination.current_page-1;
        data.per_page=$scope.F1CountPerPage.value;
        data=JSON.stringify(data);
        $http({
            method: 'post',
            url: http_url + sessionStorage.F1refresshsendurl,
            data:data,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            $scope.F1displaysubsidylist=response.data.result;
            $scope.F1pagination.totalitem=response.data.total_item_number;
        });
    };
    $scope.F1CntPerPageUpdate = function() {
        console.log($scope.F1CountPerPage.value);
        $scope.F1paginationchange();
    };










//F2
    $scope.F2selectedDahangjaString=[];
    $scope.initpdfarrayinF2screen = function(pdfstring) {
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
    $scope.dahangjaCheckFlag = {value : false};
    $scope.F2DahangjatoggleAll = function () {
        console.log($scope.dahangjaCheckFlag.value);

        for(var i=0; i<$scope.F2UsersList.length; i++)
        {
            var dahangjaID = $scope.F2UsersList[i].id;
            var idx = $scope.F2selectedDahangjaString.findIndex(x => x.id==dahangjaID);
            if (idx > -1) {
                if( $scope.dahangjaCheckFlag.value  == false) {
                    $scope.F2selectedDahangjaString.splice(idx, 1);
                }
            }
            else {
                if( $scope.dahangjaCheckFlag.value  == true) {
                    $scope.F2selectedDahangjaString.push({id:dahangjaID});
                }
            }
        }

        console.log($scope.F2selectedDahangjaString);

    };
    $scope.F2Dahangjatoggle = function (dahangjaID) {
        var idx = $scope.F2selectedDahangjaString.findIndex(x => x.id==dahangjaID);
        if (idx > -1) {
            $scope.F2selectedDahangjaString.splice(idx, 1);
        }
        else {
            $scope.F2selectedDahangjaString.push({id:dahangjaID});
        }
    };
    $scope.F2DahangjaFollow = function(dahangjaID){
        //{"user_id":"현재 로그인한 사용자 id", "follow_id":"follow할 id"}
        var data = JSON.stringify({user_id:profile.loginid,follow_id:dahangjaID});
        $http({
            method: 'post',
            url: http_url + "api/follow",
            data:data,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            alert("Follow Success!");
        });
    }







//F3
    $scope.F3DaehangjaData={};
    $scope.F3DaehangjaFeedbackList={};
    $scope.F3DaehangjaSelID=0;
    $scope.F3FeedBackpage = 5;
    $scope.F3displaysubsidylist=[];
    $scope.F3pagination = {
        totalitem:1,
        current_page:1,
        itemperpage:20
    }
    $scope.onClickF3 = function(daehangjaID)    {
        // GET방식
        // api/fscreen/f3/{user_id}
        console.log("--------F3--------");
        $scope.inlcudehtmlpath = "html/Fpages/F3.html";
        $scope.F3DaehangjaSelID = daehangjaID;
        $scope.F3GetDaehangjaData($scope.F3DaehangjaSelID);
        $scope.F3GetFeedbackOfDaehangja($scope.F3DaehangjaSelID);
        $scope.F3GetSubisdyList();
        $scope.F3FeedBackpage = 5;
    }
    $scope.onClickF3Tab = function()    {
        // GET방식
        // api/fscreen/f3/{user_id}
        console.log("--------F3--------");
        $scope.inlcudehtmlpath = "html/Fpages/F3.html";
        $scope.F3GetDaehangjaData($scope.F3DaehangjaSelID);
        $scope.F3GetFeedbackOfDaehangja($scope.F3DaehangjaSelID);
        $scope.F3GetSubisdyList();
        $scope.F3FeedBackpage = 5;
    }
    $scope.F3GetDaehangjaData=function (daehangjaID)    {
        // GET방식
        // api/fscreen/f3/{user_id}
        console.log("--------F3GetDaehangjaData--------");
        $http({
            method: 'get',
            url: http_url + "api/fscreen/f3/" + daehangjaID,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.F3DaehangjaData = response.data.result;
            // {"user_id":"사용자id", "image":"프로필 이미지", "displayname":"현시이름","result":"실적","evaluate":"평가",
            //     "self_intro":"자기소개","request_count":"주문회수",
            //     "eval1":"평가1","eval2":"평가2",
            //     "eval_good":"좋은 점수평가","save_money":"적립금액",
            //     "request_ratio":"신청완료비률","money_ratio":"보조금취득률",
            //     "auth_state":"인증상황","total_result":"지금까지의 실적","state_project":"진행안건","submit_count":"제안하기"}
        });
    }
    $scope.F3GetFeedbackOfDaehangja = function (daehangjaID) {
        console.log("--------F3GetFeedbackOfDaehangja--------");
        $http({
            method: 'get',
            url: http_url + "api/fscreen/f3/feedback/"+daehangjaID+"/0/"+$scope.F3FeedBackpage,//"{current_page}/{per_page}" + ,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.F3DaehangjaFeedbackList = response.data.result;

            // {"user_id":"사용자id","user_name":"평가자이름",
            //     "image":"평가자이미지","eval_total":"종합평가",
            //     "eval_quality":품질,"eval_delivery":납기,
            //     "eval_conf":대응,"eval_price":비용,
            //     "eval_ability":능력,"eval_message":메쎄지마당,"created_date":"날자"}
        });
    }
    $scope.F3GetFeedbackMore = function () {
        $scope.F3FeedBackpage = $scope.F3FeedBackpage + 5;
        $scope.F3GetFeedbackOfDaehangja($scope.F3DaehangjaSelID);
    }
    $scope.F3GetSubisdyList = function(){
        console.log("--------F3GetSubisdyList--------");
        //api/fscreen/f3/policy_search/{user_id}/{current_page}/{per_page}
        $http({
            method: 'get',
            url: http_url + "api/fscreen/f3/policy_search/"+profile.loginid+"/"+0+"/"+20,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            console.log(response.data.result);
            /*
             {"result":[시책object배렬],
             "total_item_number":"총검색개수"}
             */
            $scope.F3displaysubsidylist=response.data.result;
            $scope.F3pagination.totalitem=response.data.total_item_number;
            $scope.F3pagination.current_page=1;
        });

    }
    $scope.F3paginationchange = function () {
        var current_page = $scope.F3pagination.current_page-1;
        $http({
            method: 'get',
            url: http_url + "api/fscreen/f3/policy_search/"+profile.loginid+"/"+current_page+"/"+20,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            $scope.F3displaysubsidylist=response.data.result;
            $scope.F3pagination.totalitem=response.data.total_item_number;
        });
    };
//F5
    $scope.F5RespondTask={};
    $scope.onClickF5Tab = function()    {
        // GET방식
        // api/fscreen/f3/{user_id}
        $scope.inlcudehtmlpath = "html/Fpages/F5.html";
        $scope.F3GetDaehangjaData($scope.F3DaehangjaSelID);
        $scope.F5GetRespondTask();
    }
    var BusinessType=["製造業",
        "サービス業",
        "卸売・小売業",
        "情報通信業",
        "農林漁業",
        "運輸業",
        "建設業",
        "不動産業",
        "医療・福祉",
        "その他",
    ];
    $scope.F5GetRespondTask=function(){
        console.log("--------F5GetRespondTask--------");
        // api/fscreen/f5/{user_id}
        $http({
            method: 'get',
            url: http_url + "api/fscreen/f5/" + profile.loginid,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            console.log(response.data);
            // {"set_cost":"비용설정배렬",
            //     "pro_part":"전문분야 배렬", "category_detail":[{카테고리,카테고리세부배렬},...],
            //     "business_type":업종,"address1":"대상지역주소배렬",
            //     "address2":"부청성배렬","acquire_budget":"취득가능금액"}
            $scope.F5RespondTask = response.data.result;
            $scope.F5RespondTask.pro_part = JSON.parse($scope.F5RespondTask.pro_part);
            $scope.F5RespondTask.category_detail = JSON.parse($scope.F5RespondTask.category_detail);
            // for(var i=0; i < $scope.F5RespondTask.category_detail.length; i++)
            // {
            //     $scope.F5RespondTask.category_detail[i][1] = JSON.parse( $scope.F5RespondTask.category_detail[i][1]);
            // }
            //"[{"document_business_price":2,"document_business_type":"0",
            // "request_business_price":2,"request_business_type":"0",
            // "deposit_setting":2,"deposit_money":2,"other_money":"2",
            // "content_type":[{"comment":"Test1","balance":2,"$$hashKey":"object:2896"},
            // {"comment":"Test2","balance":2,"$$hashKey":"object:2897"}],"$$hashKey":"object:2886",
            // "document_business_check":true,"request_business_check":true},


            // {"document_business_price":50,"document_business_type":0,"request_business_price":200,
            // "request_business_type":1,"deposit_setting":2,"deposit_money":200,"other_money":500,
            // "content_type":[{"comment":"Test1","balance":300},{"comment":"Test2","balance":400}],
            // "$$hashKey":"object:2887"}]"
            $scope.F5RespondTask.business_type =BusinessType[$scope.F5RespondTask.business_type];
            $scope.F5RespondTask.address1 = JSON.parse($scope.F5RespondTask.address1);
            $scope.F5RespondTask.set_cost = JSON.parse($scope.F5RespondTask.set_cost);

        });
    }
//F6
    $scope.F6SubsidyList={};
    $scope.onClickF6Tab = function()    {
        // GET방식
        // api/fscreen/f3/{user_id}
        $scope.inlcudehtmlpath = "html/Fpages/F6.html";
        $scope.F3GetDaehangjaData($scope.F3DaehangjaSelID);
        $scope.F6GetSubSidy();
    }
    $scope.F6GetSubSidy=function(){
        console.log("--------F6GetSubSidy--------");
        // api/agency/matching/policy_lists/{user_id}
        $http({
            method: 'get',
            url: http_url + "api/agency/matching/policy_lists/" + $scope.F3DaehangjaSelID,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            console.log(response.data);
            // {"result":["package_name":"패키지이름",
            //     "detail":["calc_business":"업무비용합계(서류대행으로쓴다.)","document_business_price":"서류대행비용",
            //     "document_business_type":"0-웬,1-%", "request_business_price":"신청대행비용",
            //     "request_business_type":"0/1","deposit_money":"착수금",
            //     "other_money":"기타비용","content_type":기타비용,
            //     "image_id":"이미지id","register_insti":"등록기관",
            //     "category":"카테고리", "tag":"태그","region":"지역",
            //     "update":"업데이트날자","name":"시책이름",
            //     "name_serve":"시책이름써브","target":"목적",
            //     "info":"대상자의 정보","support_content":"지원내용",
            //     "acquire_budget":"취득가능금액설정","support_scale":"지원규모",
            //     "subscript_duration":"모집기간부","object_duration":"대상기간","adopt_result":"채택결과부","register_pdf":"등록pdf",
            //     "inquiry":"문의부","recom_bounty":"보조금",
            //     "to_id":"시책id","id":"매칭id"] ]}
            $scope.F6SubsidyList = response.data.result;

        });
    }








//F7
    $scope.onClickF7 = function()    {
        console.log("--------F7--------");

        $scope.inlcudehtmlpath="html/Fpages/F7.html";
        $http({
            method: 'get',
            url: http_url + "api/b_d_fscreen/get_value/" + profile.loginid,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            $scope.F7DataList = response.data.result;
            $scope.F7SelIndex = 0;
            console.log($scope.F7DataList);
        });
    }
    $scope.F7DataList=[];
    $scope.F7SelIndex = 0;
    $scope.F7Message = "";
    $scope.selectedDahangjastring=[];
    $scope.F7SaveSetting = function()    {
        /*{"user_id":"사용자id",
         set_cost":{[ document_business_price":"서류대행비용",
         "document_business_type":"돈형태(웬인가%인가)", "request_business_price":"신청대행비용",
         "request_business_type":"돈형태","deposit_setting":2  ,"deposit_money":착수금비용,
         "other_money":"기타비용(총)" ,
         "content_type":기타비용   ],..}  }*/
        var data = JSON.stringify({user_id:profile.loginid,
            set_cost:$scope.F7DataList,
        });
        //console.log("---------F7SaveSetting--------");
        console.log(data);
        $http({
            method: 'post',
            url: http_url + "api/b_d_fscreen/save_value",
            data:data,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            alert("Save Success!")
        });
    }
    $scope.F7HireSubmit = function()    {
        //F7Message
        // {"user_id":"사용자id","policy_id":"시책id",
        //     "hire_ids":[0,1,…] ( 선택된대행자id들의 배렬- 원소가하나이라도 배렬로 처리),
        //     "message":"제안내용",
        //     "document_business_price":"서류대행비용",
        //     "document_business_type":"돈형태(웬인가%인가)",
        //     "request_business_price":"신청대행비용",
        //     "request_business_type":"돈형태",
        //     "deposit_setting":2  ,
        //     "deposit_money":착수금비용,
        //     "other_money":"기타비용(총)" ,
        //     "content_type":기타비용}
        var data = JSON.stringify({user_id:profile.loginid,
            policy_id:$scope.F1displaysubsidylist[$scope.F2subsidy_index].id,
            hire_ids:$scope.selectedDahangjastring,
            message:$scope.F7Message,
            document_business_price:$scope.F7DataList[$scope.F7SelIndex].document_business_price,
            document_business_type:$scope.F7DataList[$scope.F7SelIndex].document_business_type,
            request_business_price:$scope.F7DataList[$scope.F7SelIndex].request_business_price,
            request_business_type:$scope.F7DataList[$scope.F7SelIndex].request_business_type,
            deposit_setting:$scope.F7DataList[$scope.F7SelIndex].deposit_setting,
            deposit_money:$scope.F7DataList[$scope.F7SelIndex].deposit_money,
            other_money:$scope.F7DataList[$scope.F7SelIndex].other_money,
            content_type:$scope.F7DataList[$scope.F7SelIndex].content_type,
        });
        //console.log("---------F7SaveSetting--------");
        console.log(data);
        $http({
            method: 'post',
            url: http_url + "api/b_fscreen/hire_submit",
            data:data,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            alert("Submit Success!")
        });
    }
    $scope.F7SelDahangja = function(item_id){
        console.log("-------F7SelDahangja-----");
        console.log($scope.selectedDahangjastring);
        var idx = $scope.selectedDahangjastring.findIndex(x => x == item_id);
        if (idx > -1) {
            $scope.selectedDahangjastring.splice(idx, 1);
        }
        else {
            $scope.selectedDahangjastring.push(item_id);
        }
    }









    //F12
    $scope.F12displaysubsidylist=[];
    $scope.F12pagination = {
        totalitem:1,
        current_page:1,
        itemperpage:20
    }
    $scope.F12subsidy_index=0;
    $scope.F12Init = function(){
        /*{"user_id":"사용자id","current_page":"현재몇번째페지",
         "per_page":"한페지당개수"}*/
        var data = JSON.stringify({user_id:profile.loginid,
            current_page:0,
            per_page:20,
        });
        sessionStorage.F12refresshsenddata=data;
        sessionStorage.F12refresshsendurl="api/fscreen/correspond_policy";
        $scope.inlcudehtmlpath="html/Fpages/F12.html";
        directtoF12screen();
    }
    var directtoF12screen = function(){
        console.log("-----------directtoF12screen---------");
        console.log(sessionStorage.F12refresshsenddata);
        $http({
            method: 'post',
            url: http_url + sessionStorage.F12refresshsendurl,
            data:sessionStorage.F12refresshsenddata,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            console.log("-----------directtoF12screen---------");
            console.log(response.data);
            $scope.F12displaysubsidylist=response.data.result;
            $scope.F12pagination.totalitem=response.data.total_item_number;
            $scope.F12pagination.current_page=1;
            /*
             {"result": [ {"policy_id":"시책id","name":"시책타이틀",
             "register_insti":"등록기관","subscript_duration":"모집기간",
             "acquire_budget":"취득가능금액설정","image_id":"이미지id",
             "category":"카테고리", ,tag":"태그","region":"지역","update":"업데이트날자","target":"목적","info":"대상자의 정보","support_content":"지원내용",
             "support_scale":"지원규모","subscript_duration":"모집기간부",
             "object_duration":"대상기간","adopt_result":"채택결과부",
             "register_pdf":"등록pdf","inquiry":"문의부",
             "recom_bounty":"보조금", "title":"의뢰내용",
             "document_business_price":"서류대행비용",
             'request_business_price':"신청대행비용",
             "deposit_money":"착수금","content":"의뢰의 목적",
             "main_point": "중시하는점","sub_content":"보조설명" ,
             "file":"첨부파일 배렬","post_date":"시작날자",
             "complete_date":"완료날자","submit_date":"납기날자"} , ... ... ... ]}
             */
        });
    }
    $scope.F12paginationchange = function () {
        var data=JSON.parse(sessionStorage.F12refresshsenddata);
        data.current_page=$scope.F12pagination.current_page-1;
        data=JSON.stringify(data);
        $http({
            method: 'post',
            url: http_url + sessionStorage.F12refresshsendurl,
            data:data,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            $scope.F12displaysubsidylist=response.data.result;
            $scope.F12pagination.totalitem=response.data.total_item_number;
        });
    };




    //F13
    $scope.F13view_subsidy_detail = function (subsidyindex) {
        $scope.F12subsidy_index=subsidyindex;
        $scope.inlcudehtmlpath="html/Fpages/F13.html";
    };





    //F14
    $scope.F14view_subsidy_detail = function () {
        //$scope.F12subsidy_index=subsidyindex;
        $scope.inlcudehtmlpath="html/Fpages/F14.html";
    };






    //F15
    $scope.onClickF15 = function () {
        $scope.inlcudehtmlpath="html/Fpages/F15.html";
    };
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

}]);