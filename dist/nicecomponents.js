'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (components) {
  window.$components = [];

  new MutationObserver(function (records) {
    records.forEach(function (record) {
      var nodes = record.target.querySelectorAll('[data-component]');
      bindComponentsToNodes(nodes, components);
    });
  }).observe(document.body, { childList: true, subtree: true });
};

var _component = require('./component');

Object.defineProperty(exports, 'Component', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_component).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bindComponentsToNodes(nodes, components) {
  nodes.forEach(function (node) {
    var componentName = node.dataset.component;

    if (!node.$component) {
      if (components[componentName]) {
        node.$component = new components[componentName](node);
        window.$components.push(node.$component);
      } else {
        console.warn(componentName + ' does not exist in components registry');
      }
    }
  });
}