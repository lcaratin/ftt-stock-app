(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProductService', Service);

    function Service($http, $q) {
        var apiURL = "http://localhost:9050/api/products";
        var service = {};

        service.GetToken = GetToken;
        service.GetAll = GetAll;
        service.Create = Create;
        service.Delete = Delete;
        
        return service;

        function GetToken() {
            // get userId token from server
            return $.get('/app/token');
        }   

        function GetAll() {
            return $http.get(apiURL).then(handleSuccess, handleError);
        }


        function Create(question_html) {
            return $http.post(apiURL + '/register' , {question:question_html}).then(handleSuccess, handleError);
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
        
    }

})();
