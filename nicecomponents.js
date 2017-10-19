export default function(components) {
  window.$components = []

  document.body.addEventListener('DOMSubtreeModified', function (event) {
    let nodes = event.target.querySelectorAll('[data-component]')

    nodes.forEach((node) => {
      let componentName = node.dataset.component

      if (!node.$component) {
        if (components[componentName]) {
          try {
            node.$component = new components[componentName](node)
            window.$components.push(node.$component)
          } catch(error) {
            console.warn(`${componentName} is not a valid component`)
          }
        } else {
          console.warn(`${componentName} does not exist in components registry`)
        }
      }
    })
  }, false);
}

export { default as Component } from './component'
