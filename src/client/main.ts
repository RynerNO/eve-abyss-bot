import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {Quasar} from 'quasar';

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue';

import router from './router';

const app = createApp(App);

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

// Assumes you have a <div id="app"></div> in your index.html
app.use(createPinia()); //use pinia
app.use(router); //use router
app.mount('#app');
