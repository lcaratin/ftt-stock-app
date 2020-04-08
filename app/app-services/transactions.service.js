(function () {
    'use strict';

    angular
        .module('app')
        .factory('transactionsService', Service);

    function Service($http, $q) {
        var apiURL = "http://localhost:9050/api/transactions";
        var service = {};

        service.GetToken = GetToken;
        service.GetAll = GetAll;
        service.Delete = Delete;
        service.Create = Create;

        return service;

        function GetToken() {
            // get userId token from server
            return $.get('/app/token');
        }   

        function GetAll() {
            return $http.get(apiURL).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete(apiURL + '/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }

        function Create(transact) {
            return $http.post(apiURL + '/register' , transact).then(handleSuccess, handleError);
        }
        
    }

})();
