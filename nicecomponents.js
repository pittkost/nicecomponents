function bindComponentsToNodes(nodes, components) {
  nodes.forEach((node) => {
    let componentName = node.dataset.component

    if (!node.$component) {
      if (components[componentName]) {
        node.$component = new components[componentName](node)
        window.$components.push(node.$component)
      } else {
        console.warn(`${componentName} does not exist in components registry`)
      }
    }
  })
}

export default function(components) {
  window.$components = []

  new MutationObserver((records) => {
    records.forEach((record) => {
      let nodes = record.target.querySelectorAll('[data-component]')
      bindComponentsToNodes(nodes, components)
    })
  }).observe(document.body, { childList: true, subtree: true })
}

export { default as Component } from './component'
