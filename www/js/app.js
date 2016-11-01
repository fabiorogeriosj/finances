var app = angular.module("finances", []);

app.controller("indexCtrl", function($scope, $http){
  $scope.contas = [];
  $scope.conta = {};

  $scope.listar = function(){
    $http.get("/api/finances").then(function(res){
      $scope.contas = res.data;
    });
  }
  $scope.listar();

  $scope.salvar = function(){
    $http.post("/api/finance", $scope.conta).then(function(res){
      $scope.conta = {};
      $scope.listar();
    });
  }

  $scope.editar = function(conta){
    $scope.conta = angular.copy(conta);
  }

  $scope.excluir = function(id){
    $http.post("/api/finance_del", {id: id}).then(function(res){
      $scope.listar();
    });
  }

});
