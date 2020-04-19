// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App' 
import UUID from 'vue-uuid'

Vue.use(UUID); 

Vue.config.productionTip = false

import { firestorePlugin } from 'vuefire'

 Vue.use(firestorePlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data() {
    return {
      info: null
    }
  },
  components: { App },
  template: '<App/>'
})
