import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { loadFonts } from './plugins/webfontloader'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret,faTrash,faPenToSquare,faBan,faCheck } from '@fortawesome/free-solid-svg-icons'


library.add(faUserSecret,faTrash,faPenToSquare,faBan,faCheck)


loadFonts()

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
