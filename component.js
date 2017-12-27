import _ from 'lodash'
import 'element-qsa-scope'

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector
}

let getComponentsFromNodes = (node, nodes = []) => {
  nodes = [].slice.call(nodes)
  if (nodes.indexOf(node) > -1) {
    nodes.splice(nodes.indexOf(node), 1)
  }
  let components = []
  _.each(nodes, (node) => {
    if (node.$component) {
      components.push(node.$component)
    }
  })
  return components
}

let getPropertiesFromPrototypesChain = (obj, parentProperties = []) => {
  if (obj == null || (typeof obj !== 'object') || !obj.__proto__) {
    return
  }

  var properties = Object.getOwnPropertyNames(obj.__proto__).concat(parentProperties)

  if (obj.__proto__.constructor && obj.__proto__.constructor.name !== '_class') {
    properties = getPropertiesFromPrototypesChain(obj.__proto__, properties)
  }

  return properties
}

export default class {
  constructor(node) {
    this.$node = node
    this.init()
    _.each(getPropertiesFromPrototypesChain(this), (property) => {
      if (property.charAt(0) === '@') {
        this.$node.addEventListener(property.substring(1), this[property].bind(this))
      }
    })
  }
  init() { }
  $findSiblings(componentName) {
    let query = componentName ? `:scope > [data-component='${componentName}']` : ':scope > [data-component]'
    return getComponentsFromNodes(this.$node, this.$node.parentNode.querySelectorAll(query))
  }
  get $siblings() {
    return this.$findSiblings()
  }
  $findChildren(componentName) {
    let query = componentName ? `:scope [data-component='${componentName}']` : ':scope [data-component]'
    return getComponentsFromNodes(this.$node, this.$node.querySelectorAll(query))
  }
  get $children() {
    return this.$findChildren()
  }
  $findParent(componentName) {
    let query = componentName ? `[data-component='${componentName}']` : '[data-component]'
    let node = this.$node.parentElement
    while (node && !node.matches(query)) {
      node = node.parentElement
    }
    return node ? node.$component : undefined
  }
  get $parent() {
    return this.$findParent()
  }
}
