function AbstractM3() {}
AbstractM3.prototype = Object.create(Object);
AbstractM3.prototype.constructor = AbstractM3;
AbstractM3.prototype.__super__ = Object;

AbstractM3.prototype.config = {};
AbstractM3.prototype.data = null;

AbstractM3.prototype.draw = function(data, conf) {
    this.data = data;
    this.config = $.extend({},conf);
    this.beforeDraw();
    this.drawInner();
    this.afterDraw();
}

AbstractM3.prototype.beforeDraw = function() {
}

AbstractM3.prototype.afterDraw = function() {
}

AbstractM3.prototype.drawInner = function() {
}

AbstractM3.prototype.raw = function() {
}