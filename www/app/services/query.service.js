angular.module('lasius')
.factory('query.service',[
  '$q',
  function($q){
      var Query = function(model, options){
        if(!model){
          console.error("needs a model to search in");
          return;
        }

        if(typeof model.esSearch !== 'function'){
          console.error("the model needs to implement the esSearch function");
          return;
        }

        if(!options)
          options = {};

        options.ignoreEmpty = typeof options.ignoreEmpty === 'boolean' ? options.ignoreEmpty : true;

        this.options = options;
        this.model = model;
      };

      Query.prototype.search = function(queryString){
        if(this.options.ignoreEmpty && queryString.length === 0)
          return $q.resolve({});

        return this.model.esSearch({
          queryString: queryString,
          method: 'esSearch'
        }).$promise;
      };

      return Query;
  }
]);
