'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (components) {
  window.$components = [];

  document.body.addEventListener('DOMSubtreeModified', function (event) {
    var nodes = event.target.querySelectorAll('[data-component]');

    nodes.forEach(function (node) {
      var componentName = node.dataset.component;

      if (!node.$component) {
        if (components[componentName]) {
          try {
            node.$component = new components[componentName](node);
            window.$components.push(node.$component);
          } catch (error) {
            console.warn(componentName + ' is not a valid component');
          }
        } else {
          console.warn(componentName + ' does not exist in components registry');
        }
      }
    });
  }, false);
};

var _component = require('./component');

Object.defineProperty(exports, 'Component', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_component).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }