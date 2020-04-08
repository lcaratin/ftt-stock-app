(function () {
    'use strict';

    angular
        .module('app')
        .factory('cadastroMovimentacaoService', Service);

    function Service($http, $q) {
        var apiURL = "http://localhost:9050/api/transactions";
        var service = {};

        service.GetToken = GetToken;
        service.GetAll = GetAll;
        service.Delete = Delete;
        service.Create = Create;
        service.GetById = GetById;

        // service.Edit = Edit;


        return service;

        function GetToken() {
            // get userId token from server
            return $.get('/app/token');
        }   

        function GetAll() {
            return $http.get(apiURL).then(handleSuccess, handleError);
        }
        function Create(transact) {
            return $http.post(apiURL + '/register' , transact).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete(apiURL + '/' + _id).then(handleSuccess, handleError);
        }
        // function Edit(_id,objTransaction) {
        //     return $http.put(apiURL + '/' + _id, objTransaction).then(handleSuccess, handleError);
        // }

        function GetById(_id) {
            return $http.get(apiURL + '/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }

        
        
    }

})();
