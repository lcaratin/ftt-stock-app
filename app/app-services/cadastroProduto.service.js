(function () {
    'use strict';

    angular
        .module('app')
        .factory('cadastroProdutoService', Service);

    function Service($http, $q) {
        var apiURL = "http://localhost:9050/api/products";
        var service = {};

        service.GetToken = GetToken;
        service.GetAll = GetAll;
        service.Create = Create;
        service.Delete = Delete;
        service.Edit = Edit;
        service.GetById = GetById;

        
        return service;

        function GetToken() {
            // get userId token from server
            return $.get('/app/token');
        }   

        function GetAll() {
            return $http.get(apiURL).then(handleSuccess, handleError);
        }


        function Create(nomeProduto) {
            return $http.post(apiURL + '/register' , nomeProduto).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete(apiURL + '/' + _id).then(handleSuccess, handleError);
        }

        function Edit(_id,objProduct) {
            return $http.put(apiURL + '/' + _id, objProduct).then(handleSuccess, handleError);
        }

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
