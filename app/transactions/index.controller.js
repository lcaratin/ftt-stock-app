(function () {
    'use strict';

    angular
        .module('app')
        .controller('Transactions.IndexController', Controller);

    function Controller(transactionsService,FlashService,$location, $stateParams) {
        var id = $stateParams.id;
        var vm = this;
        vm.GetAll = GetAll;
        var lista_back;
        vm.lista_back = lista_back;
        vm.DeleteTransaction = DeleteTransaction;
        vm.createTransact = CreateTransact;
        GetAll();
        
        vm.transact = {
            "date" : null,
            "transact" : null,
            "productId" : id,
            "quantity" : 0,
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

        function CreateTransact(){
            debugger;
            if(vm.transact.transact == "ENTRADA")
               vm.transact.transact = true;
            else
                vm.transact.transact = false;
            transactionsService.Create(vm.transact)
            .then(function () {
                debugger;
                FlashService.Success('Movimento realizado');
            })
            .catch(function (error) {
                debugger;
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