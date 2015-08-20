(function(ns){
	ns.ClassFactory = ns.ClassFactory || function(){

		/**
		 * Factory Class to have the logic to create classes (OOP way).
		 *
		 * @class ClassFactory
		 * @memberOf M3.Core
		 * @constructor
		 */
		function ClassFactory() {}

		/**
		 * Factory method.
		 * Responsable to create a new Class with the configuration passed by parameters.
		 *
		 * @memberOf ClassFactory
		 * @method  create
		 * @param  {[String]} 	className   The name of the class we want to create.
		 * @param  {[Function]} initializer Function that works as constructor.
		 * @param  {[Function]} inherits    Parent Class.
		 * @return {[Function]}             A new class that inherits all the method from its parent.
		 */
		ClassFactory.create = function(className, initializer, inherits) {
            inherits = inherits || Object;

            this[className] = function(){
                if (inherits) {
                    if (inherits.constructor) {
                        inherits.constructor.call(this);
                    }
                    inherits.call(this);
                }
                if (initializer) {
                    initializer.call(this);
                }
            };
            this[className].prototype = Object.create(inherits.prototype);
            this[className].prototype.constructor = this[className];
            
            return this[className];
        };

        return ClassFactory;
	}();

	/**
	 * Alias of ClassFactory
	 *
	 * @class  Class
	 * @memberOf M3.Core
	 */
	ns.Class = ns.ClassFactory;
	
})(window.M3.Core);