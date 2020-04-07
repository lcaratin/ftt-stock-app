(function () {
    'use strict';

    angular
        .module('app')
        .controller('Transactions.IndexController', Controller);

    function Controller(transactionsService,FlashService,$location) {
        var vm = this;
        vm.GetAll = GetAll;
        var lista_back;
        vm.lista_back = lista_back;
        vm.DeleteTransaction = DeleteTransaction;
        GetAll();

        function GetAll() {
            transactionsService.GetAll()
                .then(function (list_) {
                    vm.lista_back = list_;
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function DeleteTransaction(id) {
            transactionsService.Delete(id)
                .then(function () {
                    FlashService.Success('Deleted');
                    GetAll();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }
})();