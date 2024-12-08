
import "vue-toastification/dist/index.css";
import { POSITION } from 'vue-toastification';
import  Toast  from 'vue-toastification';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,

  });
});
