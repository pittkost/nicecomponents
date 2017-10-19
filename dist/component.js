'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getComponentsFromNodes = function getComponentsFromNodes(node) {
  var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  nodes = [].slice.call(nodes);
  if (nodes.indexOf(node) > -1) {
    nodes.splice(nodes.indexOf(node), 1);
  }
  var components = [];
  nodes.forEach(function (node) {
    if (node.$component) {
      components.push(node.$component);
    }
  });
  return components;
};

var _class = function () {
  function _class(node) {
    var _this = this;

    _classCallCheck(this, _class);

    this.$node = node;
    this.init();
    Object.getOwnPropertyNames(this.__proto__).forEach(function (property) {
      if (property.charAt(0) === '@') {
        _this.$node.addEventListener(property.substring(1), _this[property].bind(_this));
      }
    });
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {}
  }, {
    key: '$findSiblings',
    value: function $findSiblings(componentName) {
      var query = componentName ? ':scope > [data-component=\'' + componentName + '\']' : ':scope > [data-component]';
      return getComponentsFromNodes(this.$node, this.$node.parentNode.querySelectorAll(query));
    }
  }, {
    key: '$findChildren',
    value: function $findChildren(componentName) {
      var query = componentName ? ':scope [data-component=\'' + componentName + '\']' : ':scope [data-component]';
      return getComponentsFromNodes(this.$node, this.$node.querySelectorAll(query));
    }
  }, {
    key: '$findParent',
    value: function $findParent(componentName) {
      var query = componentName ? '[data-component=\'' + componentName + '\']' : '[data-component]';
      var node = this.$node.parentElement;
      while (node && !node.matches(query)) {
        node = node.parentElement;
      }
      return node ? node.$component : undefined;
    }
  }, {
    key: '$siblings',
    get: function get() {
      return this.$findSiblings();
    }
  }, {
    key: '$children',
    get: function get() {
      return this.$findChildren();
    }
  }, {
    key: '$parent',
    get: function get() {
      return this.$findParent();
    }
  }]);

  return _class;
}();

exports.default = _class;
module.exports = exports['default'];