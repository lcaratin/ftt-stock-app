(function () {
    'use strict';

    angular
        .module('app')
        .controller('CadastroProduto.IndexController', Controller);

    function Controller($location, cadastroProdutoService, FlashService,$stateParams) {
        var vm = this;
        var produtoNovo = true;
        var id = $stateParams.id;
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
        vm.editProduto = editProduto;
        vm.id = id;
        vm.produtoNovo = produtoNovo;
        verificaUpdate();



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

        function editProduto() {
            var objProdutoNovo = {
                _id: vm.id,
                name: vm.produto.name,
                type: vm.produto.type,
                brand: vm.produto.brand,
                characteristic: vm.produto.characteristic,
                color: vm.produto.color,
                size: vm.produto.size,
                purchaseTagPrice: vm.produto.purchaseTagPrice,
                purchasePrice: vm.produto.purchasePrice,
                hundredPercentPrice: vm.produto.hundredPercentPrice,
                suggestedPrice: vm.produto.suggestedPrice
            }
            cadastroProdutoService.Edit(vm.id, objProdutoNovo)
                .then(function () {
                    FlashService.Success("Produto alterado com sucesso");
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
        function GetById(id){
            cadastroProdutoService.GetById(id)
            .then(function (resp) {
                vm.produto.name = resp.name;
                vm.produto.type = resp.type;
                vm.produto.brand = resp.brand;
                vm.produto.characteristic = resp.characteristic;
                vm.produto.color = resp.color;
                vm.produto.size = resp.size;
                vm.produto.purchaseTagPrice = resp.purchaseTagPrice;
                vm.produto.purchasePrice = resp.purchasePrice;
                vm.produto.hundredPercentPrice = resp.hundredPercentPrice;
                vm.produto.suggestedPrice = resp.suggestedPrice;
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
        }

        function verificaUpdate() {
            console.log(vm.id,vm.produtoNovo)
           if (vm.id == ""){
            vm.produtoNovo = true;
           }
           else {
            vm.produtoNovo = false;
            GetById(vm.id)
           }
           
        }
    }

})();