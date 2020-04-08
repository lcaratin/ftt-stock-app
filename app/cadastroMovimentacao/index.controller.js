(function () {
    'use strict';

    angular
        .module('app')
        .controller('CadastroMovimentacao.IndexController', Controller);

    function Controller(cadastroMovimentacaoService,FlashService,$location, $stateParams) {
        var id = $stateParams.id;
        var vm = this;
        vm.transact = {
            "date" : null,
            "transact" : null,
            "productId" : id,
            "quantity" : 0,
        };
        // vm.GetAll = GetAll;
        // var lista_back;
        // vm.lista_back = lista_back;
        vm.DeleteTransaction = DeleteTransaction;
        vm.createTransact = CreateTransact;
        GetAll();
        
        

        function GetAll() {
            cadastroMovimentacaoService.GetAll()
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
            if(vm.transact.transact == "ENTRADA")
               vm.transact.transact = true;
            else
                vm.transact.transact = false;
            cadastroMovimentacaoService.Create(vm.transact)
            .then(function () {
                FlashService.Success('Movimento realizado');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
        }


        function DeleteTransaction(id) {
            cadastroMovimentacaoService.Delete(id)
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