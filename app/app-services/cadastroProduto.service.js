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
        
        return service;

        function GetToken() {
            // get userId token from server
            return $.get('/app/token');
        }   

        function GetAll() {
            return $http.get(apiURL).then(handleSuccess, handleError);
        }


        function Create(nomeProduto) {
            return $http.post(apiURL + '/register' , {productParam:nomeProduto}).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete(apiURL + '/' + _id).then(handleSuccess, handleError);
        }

        function Edit(_id,objProduct) {
            return $http.put(apiURL + '/' + _id, {productParam:objProduct}).then(handleSuccess, handleError);
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
