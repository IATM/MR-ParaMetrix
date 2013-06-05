// Load Google Charts package
google.load('visualization', '1', {packages: ['corechart']});

// Begin AngularJS module, include dependencies
var MRParaMetrix = angular.module('MRParaMetrix', ['CornerCouch','googlechart.directives']);


// ******************************** CouchDB service (factory) ******************************** 
MRParaMetrix.factory('CouchDBService', function (cornercouch) { 
  var server = cornercouch();
  var mrdb = server.getDB('mrparametrix_small');
  var CouchDBService = {

    // Get available parameter views in couchdb database
    getParameterList: function () {
      var doc_object = mrdb.newDoc();
          
      var promise = doc_object.load("_design/MR-ParaMetrix")
                      .then(function (response) {
                        console.log(response.data);
                        var pl =[];
                        angular.forEach(response.data.views, function(view,key){
                          if (view.type == "parameter") {
                            this.push(key);
                          }
                        },pl);
                        return pl;
      });
      console.info("Getting parameter list (CouchDB views) from service");
      return promise;
    },


    // Get scanner list
    getScannerList: function () {
      var promise = mrdb.query("MR-ParaMetrix", "scanners", { group: true,descending: true })
                      .then(function (response) {
                        console.log(response.data);
                        return response.data;
      });
      console.info("Getting scanner list from service");
      return promise;
    },

    // Get study list based on selected scanner
    getStudyList: function (selectedScanner) {
      var sc = selectedScanner.key;
      console.debug("getStudyList invoked with selectedScanner: %O", sc);
      var promise = mrdb.query("MR-ParaMetrix", "studies", {
                                        startkey: [sc,0,0],
                                        endkey: [sc,{},{}],
                                        group: true})
                      .then(function (response) {
                        console.log(response.data);
                        return response.data;
      });
      console.info("Getting study list from service");
      return promise;
    },

    // Get study list based on selected scanner
    getSeriesList: function (selectedScanner,selectedStudy) {
      var sc = selectedScanner.key;
      var st = selectedStudy[1];
      console.debug("getSeriesList invoked with selectedScanner: %O and selectedStudy: %O", sc, st);
      var promise = mrdb.query("MR-ParaMetrix", "series", {
                                        startkey: [sc,st,0],
                                        endkey: [sc,st,{}],
                                        group: true})
                      .then(function (response) {
                        console.log(response.data);
                        return response.data;
      });
      console.info("Getting series list from service");
      return promise;
    },

    // Get study list based on selected scanner
    getResults: function (selectedScanner,selectedStudy,selectedSeries,selectedParameter) {
      var sc = selectedScanner.key;
      var st = selectedStudy[1];
      var se = selectedSeries[2];
      var p = selectedParameter;
      console.debug("getResults invoked with selectedScanner: %O, selectedStudy: %O, selectedSeries %O and selectedParameter %O", sc, st, se, p);
      var promise = mrdb.list("MR-ParaMetrix", "chart", p, {
                                            startkey: [sc,st,se,0],
                                            endkey: [sc,st,se,{}],
                                            group: true})
                      .then(function (response) {
                        // console.log(response.data);
                        return response.data;
      });
      console.info("Getting results for final query from service");
      return promise;
    }

  };

  return CouchDBService;

});
// ******************************** End CouchDB service ********************************



// ******************************** Begin MRParaMetrix main app ************************

// MR ParaMetrix app main controller
MRParaMetrix.controller('MainCtrl', function($scope, cornercouch, CouchDBService) {
  $scope.couchdb = CouchDBService;

  // Initialize query parameters, results and charts models
  $scope.qParams = {};
  $scope.couchdb.results = {};
  $scope.charts = {};

  // Initialize a parameter to query
  // $scope.qParams.selectedParameter = "TR";

  // Get available parameter list  - based on the CouchDB views
  CouchDBService.getParameterList()
    .then(function (param_list) {
        console.info("Got available parameter list from service");
        $scope.couchdb.parameterlist = param_list;
    });

  // Get scanner list - the only initial query needed
  CouchDBService.getScannerList()
    .then(function (sc_list) {
        console.info("Got scanner list from service");
        $scope.couchdb.scannerlist = sc_list;
    });

  // Trigger query for study list
  $scope.$watch('qParams.selectedScanner', function(){
    if (!angular.isUndefined($scope.qParams.selectedScanner)) {
      CouchDBService.getStudyList($scope.qParams.selectedScanner)
      .then(function (st_list) {
          console.info("Got study list from service");
          $scope.couchdb.studylist = st_list;
      });
    }
  });

  // Trigger query for series list
  $scope.$watch('qParams.selectedStudy', function(){
    if (!angular.isUndefined($scope.qParams.selectedScanner) && !angular.isUndefined($scope.qParams.selectedStudy)) {
      CouchDBService.getSeriesList($scope.qParams.selectedScanner,$scope.qParams.selectedStudy)
      .then(function (se_list) {
          console.info("Got series list from service");
          $scope.couchdb.serieslist = se_list;
      });
    }
  });

  // Watch for query parameters change, query for final results
  $scope.$watch('qParams', function(){
    if (isQueryComplete()) {
      angular.forEach($scope.couchdb.parameterlist, function(sel_param){
        CouchDBService.getResults($scope.qParams.selectedScanner,$scope.qParams.selectedStudy, $scope.qParams.selectedSeries, sel_param)
        .then(function (r) {
            console.info("Got results from service");
            $scope.couchdb.results[sel_param] = r;
        });
      });
    }
  }, true);

  function isQueryComplete() {
    if (  !angular.isUndefined($scope.qParams.selectedScanner) &&
          !angular.isUndefined($scope.qParams.selectedStudy) &&
          !angular.isUndefined($scope.qParams.selectedSeries)) {
      console.info("Query parameters are complete");
      return true;
    }
    else {
      return false;
    }
  };

  // Trigger chart creation
  $scope.$watch('couchdb.results', function(){
    if (!angular.isUndefined($scope.couchdb.results)) {
      angular.forEach($scope.couchdb.parameterlist, function(sel_param){
        $scope.charts[sel_param] = {};
        $scope.charts[sel_param].type = "ColumnChart";
        $scope.charts[sel_param].options = {  title: sel_param,
                                              legend: {
                                                position: 'none'
                                              },
                                              titleTextStyle: {
                                                fontSize: 14
                                              },
                                              bar: {
                                                groupWidth: 20
                                              }
                                            };
        $scope.charts[sel_param].displayed = false;
        $scope.charts[sel_param].cssStyle = "height:100%; width:50%;";
        $scope.charts[sel_param].data = $scope.couchdb.results[sel_param];
      });
    }
  }, true);

 } 
);
