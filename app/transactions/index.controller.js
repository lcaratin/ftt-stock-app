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
        
        vm.transact = {
            "date" : null,
            "transact" : null,
            "productId" : null,
            "quantity" : 0,
            "name" : null

        };

        function GetAll() {
            transactionsService.GetAll()
                .then(function (list_) {
                    vm.lista_back = list_;
                    console.log(vm.lista_back);
                })
                .catch(function (error) {
                    console.log(error);
                    FlashService.Error(error);
                });
            
        }

        function createTransact(){
            //vm.transact = time.now();
            transactionsService.create(cm.transact)
            .then(function () {
                FlashService.Success('Movimento realizado');
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