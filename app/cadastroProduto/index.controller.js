(function () {
    'use strict';

    angular
        .module('app')
        .controller('CadastroProduto.IndexController', Controller);

    function Controller($window, cadastroProdutoService, FlashService) {
        var vm = this;

        vm.produto = {
            "name":null,
            "type":null,
            "brand":null,
            "characteristic":null,
            "color":null,
            "size":null,
            "purchaseTagPrice":0,
            "purchasePrice": 0,
            "hundredPercentPrice": 0,
            "suggestedPrice": 0,
            "stockQuantity": 0

        };
        vm.saveProduto = saveProduto;
        vm.deleteProduto = deleteProduto;


        function saveProduto() {
            vm.produto.hundredPercentPrice = vm.produto.purchasePrice * 2;
            cadastroProdutoService.Create(vm.produto)
                .then(function () {
                    FlashService.Success('Produto cadastrado');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteProduto() {
            cadastroProdutoService.Delete(vm.produto._id)
                .then(function () {
                    // log user out
                    // $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();