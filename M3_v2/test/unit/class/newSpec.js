describe("M3.Class.New Object test", function() {
    "use strict";
    
    var constructors = {
        constuctor1: function () {
            this.foo = function(){
                return "This is foo";
            };
        },
        constuctor2: function () {
            this.foo2 = function(){
                return "This is foo2";
            };
        },
        constuctor3: function () {
            var ff = this.foo2;
            this.foo2 = function(){
                return ff() + " from constructor3";
            };
        },
        constuctor4: function () {
            var f = this.foo;
            this.foo = function(){
                return "This is foo from constructor4";
            };
            this.foo3 = function() {
                return f();
            };
            
            var ff2 = this.foo2;
            this.foo2 = function(){
                return ff2() + " from constructor4";
            };
        }
    };

    it("M3.Class.New reference have to exist", function() {
        expect(M3.Class.New).toBeDefined();
        expect(M3.Class.New).not.toBeNull();
    });
    
    describe("Create a new class", function() {
        it("Crate a anonimous class", function() {
            var FooClass = M3.Class.New();
            var foo = null;
            
            expect(function() { foo = new FooClass(); }).not.toThrow();
            expect(foo instanceof Object).toBeTruthy();
            expect(foo instanceof FooClass).toBeTruthy();
        });
        
        it("Crate class with Name", function() {
            var FooClass = M3.Class.New("MyClass");
            var foo = null;
            
            expect(function() { foo = new FooClass(); }).not.toThrow();
            expect(foo instanceof Object).toBeTruthy();
            expect(foo instanceof FooClass).toBeTruthy();
        });
        
        it("Crate class with Name and constructor", function() {
            var FooClass = M3.Class.New("MyClass", constructors.constuctor1);
            var foo = null;
            
            expect(function() { foo = new FooClass(); }).not.toThrow();
            expect(foo instanceof Object).toBeTruthy();
            expect(foo instanceof FooClass).toBeTruthy();
            expect(foo.foo).toBeDefined();
        });
        
        it("Crate class with Name, constructor and inherits", function() {
            var FooClass1 = M3.Class.New("MyClass", constructors.constuctor1);
            var FooClass2 = M3.Class.New("Foo2", constructors.constuctor2, FooClass1);
            
            var foo = null;
            
            expect(function() { foo = new FooClass2(); }).not.toThrow();
            expect(foo instanceof Object).toBeTruthy();
            expect(foo instanceof FooClass1).toBeTruthy();
            expect(foo instanceof FooClass2).toBeTruthy();
            expect(foo.foo).toBeDefined();
            expect(foo.foo2).toBeDefined();
        });
    });
    
    describe("Check proctected methods override", function(){
        
        it("Create a basic class", function(){
            var FooClass = M3.Class.New("Foo", constructors.constuctor1);
            
            var foo = new FooClass();
            
            expect(foo.foo()).toEqual("This is foo");
        });
        
        it("Create a class with one level of inherit", function() {
            var FooClass1 = M3.Class.New("Foo", constructors.constuctor1);
            var FooClass2 = M3.Class.New("Foo2", constructors.constuctor2, FooClass1);
            
            var foo = new FooClass2();
            
            expect(foo.foo()).toEqual("This is foo");
            expect(foo.foo2()).toEqual("This is foo2");
        });
        
        it("Create a class with two level of inherit", function() {
            var FooClass1 = M3.Class.New("Foo", constructors.constuctor1);
            var FooClass2 = M3.Class.New("Foo2", constructors.constuctor2, FooClass1);
            var FooClass3 = M3.Class.New("Foo3", constructors.constuctor3, FooClass2);
            
            var foo = new FooClass3();
            
            expect(foo.foo()).toEqual("This is foo");
            expect(foo.foo2()).toEqual("This is foo2 from constructor3");
        });
        
        it("Create a class with three level of inherit", function() {
            var FooClass1 = M3.Class.New("Foo", constructors.constuctor1);
            var FooClass2 = M3.Class.New("Foo2", constructors.constuctor2, FooClass1);
            var FooClass3 = M3.Class.New("Foo3", constructors.constuctor3, FooClass2);
            var FooClass4 = M3.Class.New("Foo4", constructors.constuctor4, FooClass3);
            
            var foo = new FooClass4();
            
            expect(foo.foo()).toEqual("This is foo from constructor4");
            expect(foo.foo3()).toEqual("This is foo");
            expect(foo.foo2()).toEqual("This is foo2 from constructor3 from constructor4");
        });
    });
});