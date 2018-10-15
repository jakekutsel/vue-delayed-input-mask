# Vue Delayed mask input

[![N|Solid](http://careers.invento.by/wp-content/uploads/2018/02/logo.png)](http://invento-labs.com/)


**Vue.js component for delayed masked input. Currently used for password fields.**

### Installation
```sh
$ npm i vue-delayed-input-mask
```
### External libs used
* [vue]
* [lodash]
* [webpack]

### Configuration
```js
import VueDelayedInputMask from "vue-delayed-input-mask";
Vue.use(VueDelayedInputMask);
```
##### Properties
- *id*
- *value*
- *name (required)*
- *placeholder*
- *wrapperClassName*
- *classNames*
- *debounceTime (default: 1000ms)*
- *fillChar (default: "*")*
- *needClearOnFocus (default: false)*
- *needFillOnBlur (default: true)*
- *disabled (default: false)*
- *keyEnter*
- *hideFieldType*
### How it work
[![N|Solid](https://image.ibb.co/cOx6W9/example.gif)](https://image.ibb.co/cOx6W9/example.gif)

### Example
```js
<vue-delayed-input-mask
    name="password"
    v-model="password"
    placeholder="Password"
    :classNames="['input']"
    @keyup.enter="action">
</vue-delayed-input-mask>
```
### Known bugs

- [x] Fast input broken clear value

### Todos
- [ ] Add default slot for mouseenter event for show hidden input value

License
----

MIT


[//]: # ()


   [vue-delayed-input-mask]: <https://github.com/jakekutsel/vue-delayed-input-mask>
   [lodash]: <https://lodash.com>
   [example]: https://github.com/jakekutsel/vue-delayed-input-mask/assets/example/example.gif
   [vue]: <https://vuejs.org/>
   [invento]: <http://invento-labs.com/>
   [webpack]: <https://webpack.js.org/>
