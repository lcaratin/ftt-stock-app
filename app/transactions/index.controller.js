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
        var productName;
        vm.productName = productName;
        GetProductById();
        vm.GetProductById = GetProductById;

        vm.transact = {
            "date" : null,
            "transact" : null,
            "name" : null,
            "productId" : id,
            "quantity" : 0,
        };

        function GetAll() {
            transactionsService.GetAll()
                .then(function (list_) {
                    vm.lista_back = list_.reverse();
                    console.log(vm.lista_back);
                })
                .catch(function (error) {
                    console.log(error);
                    FlashService.Error(error);
                });

        }

        function CreateTransact(){
            if(vm.transact.transact == "ENTRADA")
               vm.transact.transact = true;
            else
                vm.transact.transact = false;

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;

            vm.transact.date = today;

            vm.transact.name = vm.productName;

            transactionsService.Create(vm.transact)
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

        function GetProductById(){
            transactionsService.GetProductById($stateParams.id)
             .then(function (resp) {
                vm.productName = resp.name;
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
        }
    }
})();