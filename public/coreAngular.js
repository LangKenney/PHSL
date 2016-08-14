var PHSLApp = angular.module('PHSLApp', ['ngRoute']);

PHSLApp.config(function ($routeProvider) {

    $routeProvider
            .when('/', {
                templateUrl: 'pages/login.html',
                controller: 'loginController'
            })
            .when('/all', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                domain: ''
            })

            .when('/avionics', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                domain: 'avionics'
            })

            .when('/controls', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                domain: 'controls'
            })

            .when('/gse', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                domain: 'GSE'
            })

            .when('/initiation', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                domain: 'initiation'
            })

            .when('/propulsion', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                domain: 'propulsion'
            })

            .when('/power', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                domain: 'power'
            })
            .when('/rf', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                domain: 'rf'
            })

            .when('/structures', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                domain: 'structures'
            })

            .when('/NF', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                stage: 'NF'
            })

            .when('/PA', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                stage: 'PA'
            })

            .when('/SS', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                stage: 'SS'
            })

            .when('/IS', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                stage: 'IS'
            })

            .when('/FS', {
                templateUrl: 'pages/all.html',
                controller: 'mainController',
                stage: 'FS'
            })

            .when('/new', {
                templateUrl: 'pages/new.html',
                controller: 'mainController'
            })
});

//function mainController($scope, $http){ }
PHSLApp.controller('mainController', ['$scope', '$http', '$route','$filter', function ($scope, $http, $route, $filter) {
    // var middleware = require("../middleware"); //will auto include /index.js
    
        function getQueryVariable(variable){
           var query = window.location.search.substring(1);
           var vars = query.split("&");
           for (var i=0;i<vars.length;i++) {
                   var pair = vars[i].split("=");
                   if(pair[0] == variable){return pair[1];}
           }
           return(false);
        }
        $scope.user = getQueryVariable('user');
        console.log($scope.user)
        $scope.pass = getQueryVariable('pass');

        $scope.nameSearch = $route.current.$$route.name;
        $scope.domainSearch = $route.current.$$route.domain;
        $scope.stageSearch = $route.current.$$route.stage;
        
        $scope.weightTotal = 0;
        $scope.costTotal = 0;
        $scope.powerTotal = 0;
        //$scope.components = [];


        //     $scope.costTotal = $scope.costTotal + cost;
        //     return $scope.costTotal
        // }
        //{{ costAdd() }}
        
        
        //=========HTTP ROUTING=========
        
        //GET (READ) COMPONENTES
        $http.get('/api/components')
                .success(function (data) {
                    $scope.components = data;
                    console.log('---From view Components---');
                    console.log($scope.components);
                })
                .error(function (data) {
                    console.log('Error:' + data);
                });
        
        //CREATE COMPONENT
        $scope.createComponent = function () {
            $scope.formData = {
                number: $scope.components.length,
                name: $scope.name,
                WBS: $scope.WBS,
                image: $scope.image,
                domain: $scope.domain,
                responsibleEngineer: $scope.responsibleEngineer,
                stage: $scope.stage,
                description: $scope.description,
                quantity: $scope.quantity,
                FTU: $scope.FTU,
                EDU: $scope.EDU,
                GTU: $scope.GTU,
                MM_DM: $scope.MM_DM,
                makeVsBuy: $scope.makeVsBuy,
                weight: $scope.weight,
                power: $scope.power,
                size: $scope.size,
                vendor: $scope.vendor,
                cost: $scope.cost,
                added: $scope.added
            };
            //console.log($scope.formData)
            $http.post('/api/components', $scope.formData)
                    .success(function (data) {
                        $scope.formData
                        $scope.count_add = 1;
                        $scope.name = '';
                        $scope.WBS = '';
                        $scope.image = '';
                        $scope.domain,
                        $scope.responsibleEngineer = '';
                        $scope.stage = '';
                        $scope.description = '';
                        $scope.quantity = '';
                        $scope.FTU = '';
                        $scope.EDU = '';
                        $scope.GTU = '';
                        $scope.MM_DM = '';
                        $scope.makeVsBuy = '';
                        $scope.weight = '';
                        $scope.power = '';
                        $scope.size = '';
                        $scope.vendor = '';
                        $scope.cost = '';
                        $scope.added = '';
                        // console.log($scope)
                        $scope.components = data;
                        console.log('---From created component---');
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
        };
        
        //UPDATE COMPONENET
        $scope.editComponent = function (id, component) {
            $scope.formData = component;
            console.log($scope.formData)
            $http.put('/api/components/' + id, $scope.formData)
                    .success(function (data) {
                        $scope.formData = {};
                        // console.log($scope)
                        $scope.components = data;
                        console.log('---From Updated component---');
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
        };
        
        
        //DELETE COMPONENT (after checking it)
        $scope.deleteComponent = function (id) {
            $http.delete('/api/components/' + id)
                    .success(function (data) {
                        $scope.components = data;
                        console.log('---From deleted component---');
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error:' + data);
                    });
        };
        //=========END HTTP ROUTING=========
        
        
        // var test = $filter('thisIsMyFilter')($scope.components, $scope.nameSearch, function(actual, expected){
        //     return actual
        // })
        
        
        //=========SUMMING FUNCTIONS=========
        $scope.weightAdd = function () {
            var weightTotal = 0;
            //console.log($scope.components)
            var components = $scope.components;
            var weight = $scope.components.weight; 
            
            components.forEach(function(component) {
                weightTotal += (component.weight);
                // console.log('Weight:'+weight.weight)
                // console.log($scope.components.weight)
            // })
            // for (var i = 0; i < $scope.components.length; i++) {
            //     //console.log(i)
            //     //console.log($scope.components.length)
            //     //var product = $scope.cart.products[i];
            //     weightTotal += ($scope.components[i].weight);
            // }
            // console.log(weightTotal)
            //$filter('filter')(component, mySearch)
            // $filter('myfilter')($scope.components, component.weight, function(actual, expected){
                
            })
            return weightTotal;
        };
        
        // $scope.weightAdd = function () {
        //     var weightArray = [];
        //     var i = 0;
        //     //console.log($scope.components)
        //     var components = $scope.components;
        //     var weight = $scope.components.weight; 
            
        //     components.forEach(function(component) {
        //         weightArray[i] = (component.weight);
        //         i++;
        //         // console.log('Weight:'+weight.weight)
        //         // console.log($scope.components.weight)
        //     })
        //     // for (var i = 0; i < $scope.components.length; i++) {
        //     //     //console.log(i)
        //     //     //console.log($scope.components.length)
        //     //     //var product = $scope.cart.products[i];
        //     //     weightTotal += ($scope.components[i].weight);
        //     // }
        //     console.log(weightArray)
        //     $filter('filter')(weightArray, $scope.weightTotal)
        //     return weightTotal;
        // };
        
        // $scope.weightAdd = function (weight) {
        //     $scope.weightTotal = $scope.weightTotal + weight;
        // };
        //{{ weightAdd() }}
        $scope.costAdd = function (cost) {
            var costTotal = 0;
            var components = $scope.components;
            var cost = $scope.components; 
            // console.log(cost)
            components.forEach(function(component) {
                costTotal += (component.cost);
                // console.log('Weight:'+weight.weight)
                // console.log($scope.components.weight)
            })
            //console.log($scope.components)
            // for (var i = 0; i < $scope.components.length; i++) {
            //     //var product = $scope.cart.products[i];
            //     costTotal += (Number($scope.components[i].cost));
            // }
            return costTotal;
        };
        $scope.powerAdd = function (power) {
            var powerTotal = 0;
            //console.log($scope.components)
            var components = $scope.components;
            var power = $scope.components.power; 
            components.forEach(function(component) {
                powerTotal += (component.power);
                // console.log('Weight:'+weight.weight)
                // console.log($scope.components.weight)
            })
            // for (var i = 0; i < $scope.components.length; i++) {
            //     //var product = $scope.cart.products[i];
            //     powerTotal += ($scope.components[i].power);
            // }
            return powerTotal;
        };
        //=========END SUMMING FUNCTIONS=========
}]);

PHSLApp.controller('loginController', ['$scope', '$http', '$route','$filter', function ($scope, $http, $route, $filter) {
    
}])

