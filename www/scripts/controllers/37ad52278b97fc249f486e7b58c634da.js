define(["../6e867381f6333fc9c95b78691e5477b1","../services/7010a8f5edd216bf92376cce561b22c5"],function(n){n.controller("FavController",["$scope","FavouriteFactory",function(n,o){n.clearList=function(){confirm("你确定要清空收藏列表吗？")&&o.clear().then(function(){n.list=[]})},n.list=[],n.loading=!0,o.read(!0)["finally"](function(){n.loading=!1}).then(function(o){n.list=o},function(){n.doNotSupport=!0})}])});