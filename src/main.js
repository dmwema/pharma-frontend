// VueJS
import Vue from "vue";

require("./store/subscriber");

// Ant Design Vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

//sheet alert
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

// Photoswipe Gallery
import Photoswipe from "vue-pswipe";
Vue.use(Photoswipe);

// Template Layouts
import TeacherLayout from "./layouts/Teacher.vue";
import FacLayout from "./layouts/Fac.vue";
import defaultLayout from "./layouts/Default.vue"; // without sidebar

// Adding template layouts to the vue components.
Vue.component("layout-teacher", TeacherLayout);

// Adding template layouts to the vue components.
Vue.component("layout-fac", FacLayout);

// Adding template layouts to the vue components.
Vue.component("layout-default", defaultLayout);

// Main application view
import App from "./App.vue";

// Vue Router
import router from "./router";

// App Styling
import "./scss/app.scss";

import store from "./store/fac";

Vue.config.productionTip = false;

//event bus
Vue.prototype.$eventHub = new Vue(); // Global event bus

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  // Initialize Vue
  new Vue({
    router,
    render: (h) => h(App),
    store,
  }).$mount("#app");
});
