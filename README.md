# random-monitor
The most useless app ever. Available online at https://minhcly95.github.io/random-monitor.

This app draws a line chart of a randomly-walking variable, which is practically useless.
The variable is updated per 5ms (either +1 or -1) and the data for the chart is sampled per 50ms.
The color of the line, the total time and the theme (dark/light) could be set in the options dialog,
opened by clicking on the floating button at the bottom-right of the screen.

Used libraries:
- [Vue.js](https://vuejs.org): frontend framework, allowing dynamic binding between HTML and JavaScript.
- [Vuetify.js](https://vuetifyjs.com): Google's Material design for  Vue.js.
- [jQuery](https://jquery.com): convenient element-querying library.
- [Lodash](https://lodash.com): utility library (for `_.debounce` and `_.throttle` functions).
- [Chart.js](http://www.chartjs.org): chart engine.

This code is published under the [MIT license](https://raw.githubusercontent.com/minhcly95/random-monitor/master/LICENSE.txt).
