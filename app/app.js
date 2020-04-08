(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('produto', {
                url: '/produto',
                templateUrl: 'produto/index.html',
                controller: 'Produto.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'produto' }
            })
            .state('cadastroProduto', {
                url: '/cadastroProduto/{id}',
                templateUrl: 'cadastroProduto/index.html',
                controller: 'CadastroProduto.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'cadastroProduto' }
            })
            .state('transactions', {
            url: '/transactions/{id}',
                templateUrl: 'transactions/index.html',
                controller: 'Transactions.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'transactions' }
             });
    }

    function run($http, $rootScope, $window) {
        // get JWT token from server
        $.get('/app/token', function (token) {
            // add JWT token as default auth header
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            // update active tab on state change
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.activeTab = toState.data.activeTab;
            });
        });
    }

    $(function () {
        angular.bootstrap(document, ['app']);
    });
})();