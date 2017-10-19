# Nice Components
This is a simple vanilla JavaScript library for making encapsulated components. Using Nice Components it's easy to manage events and keep your code well organized.

## Basic Concept
With NiceComponents we attach encapsulated JavaScript logic to HTML node, by adding `data-component` attribute.
```
<div data-component="RemoveOnClick" id="#node1">
</div>
```
Once `NiceComponents` is called, it will browse your DOM and apply the proper components from the collection of objects passed as it's argument.
```
import NiceComponents from 'nicecomponents'
import Component from 'nicecomponents/component'

NiceComponents({
  RemoveOnClick: class extends Component {
    init() {
      console.log('Component ready!')
    }
    '@click'() {
      this.$node.remove()
    }
  }
})
```
Now our "RemoveOnClick" component does two things. First - it console-logs "Component ready!" right after instantiation, second - it removes own HTML node when user clicks on it.

## Good to knows
1. Nice Components brings you a sugar-syntax for making Event Listeners. Every component's method declared with an `@` sign on the beginning constitutes an event callback.
1. You can access a "carrier" HTML node from the component instance with a `$node` property.
1. You can access a component instance from the "carrier" HTML node with a `$component` property.
1. You can get an array of all the components instances through `window.$components`.
1. When a node with `data-component` is appended to the DOM, Nice Components automatically associates it with a fresh component instance.
1. You can access the closest parent component from within your component with `$parent` property, or with `$findParent(componentName)` method. The same with `$children`/``$findChildren(componentName)` and `$siblings`/``$findSiblings(componentName)`.
