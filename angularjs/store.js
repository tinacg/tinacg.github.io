(function () {

  var app = angular.module('store', []);

  app.controller('StoreController', function () {
    this.products = gems;
  });

  
  var gems = [
    {
      name: "dodeca",
      price: 2.95,
      desc: '',
      canPurchase: false,
    },
    {
      name: "pentagonal",
      price: 2.2,
    }
  ];

})();
