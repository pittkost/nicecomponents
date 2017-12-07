import _ from 'lodash'

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

let getPropertiesFromPrototypesChain = (object, parentProperties = []) => {
  let properties = Object.getOwnPropertyNames(object.__proto__).concat(parentProperties)

  if (object.__proto__.constructor && object.__proto__.constructor.name !== '_class') {
    properties = getPropertiesFromPrototypesChain(object.__proto__, properties)
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
  init() {}
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
    while(node && !node.matches(query)) {
      node = node.parentElement
    }
    return node ? node.$component : undefined
  }
  get $parent() {
    return this.$findParent()
  }
}
