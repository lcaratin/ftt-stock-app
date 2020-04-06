(function () {
    'use strict';

    angular
        .module('app')
        .controller('Produto.IndexController', Controller);

    function Controller(cadastroProdutoService,FlashService,$location) {
        var vm = this;
        vm.GetAll = GetAll;
        var lista_back;
        vm.lista_back = lista_back;
        vm.DeleteProduct = DeleteProduct;
        vm.EditProduct = EditProduct;
        GetAll();

        function GetAll() {
            cadastroProdutoService.GetAll()
                .then(function (list_) {
                    vm.lista_back = list_;
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function DeleteProduct(id) {
            cadastroProdutoService.Delete(id)
                .then(function () {
                    FlashService.Success('Deleted');
                    GetAll();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function EditProduct(id) {
            $location.path("/cadastroProduto/"+id)
           
        }

    }
})();