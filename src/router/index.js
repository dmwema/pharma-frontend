import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/fac";

Vue.use(VueRouter);

let routes = [
  {
    // will match everything
    path: "*",
    layout: "default",
    component: () => import("../views/404.vue"),
  },
  {
    path: "/",
    name: "Home",
    redirect: "/t/dashboards/",
  },
  {
    path: "/t/dashboards/",
    name: "DashboardsTeacher",
    layout: "teacher",
    meta: {
      title: "Tableau de bord",
      sidebarMap: ["dashboards"],
      breadcrumbs: ["Dashboards", "Teacher"],
    },
    component: () => import("../views/Dashboards/Teacher.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authentificated"]) {
        return next({
          name: "LoginPage",
        });
      }

      next();
    },
  },
  {
    path: "/t/deliberation/:promotion_id",
    name: "DeliberationTeacher",
    layout: "teacher",
    meta: {
      title: "délibération de l'année academique 2020-2021",
      sidebarMap: ["deliberation"],
      breadcrumbs: ["Dashboards", "Deliberation"],
    },
    component: () => import("../views/Teacher/Deliberation.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authentificated"]) {
        return next({
          name: "LoginPage",
        });
      }

      next();
    },
  },
  {
    path: "/t/jury/:promotion_id/:professor_id",
    name: "JuryTeacher",
    layout: "teacher",
    meta: {
      title: "Jury",
      sidebarMap: ["Jury"],
      breadcrumbs: ["Dashboards", "Jury"],
    },
    component: () => import("../views/Teacher/Jury.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authentificated"]) {
        return next({
          name: "LoginPage",
        });
      }

      next();
    },
  },
  {
    path: "/t/jury/:promotion_id/:professor_id/result/:deliberation_id",
    name: "JuryTeacherResult",
    layout: "teacher",
    meta: {
      title: "JuryResult",
      sidebarMap: ["Jury"],
      breadcrumbs: ["Dashboards", "Jury", "Résultats"],
    },
    component: () => import("../views/Teacher/Results.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authentificated"]) {
        return next({
          name: "LoginPage",
        });
      }

      next();
    },
  },
  {
    path: "/t/courses",
    name: "TeacherCourses",
    layout: "teacher",
    meta: {
      title: "Tous vos cours",
      layoutClass: "teacher-dashboard",
      sidebarMap: ["courses"],
      breadcrumbs: ["Pages", "Teacher", "Courses"],
    },
    component: () => import("../views/Teacher/Courses.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authentificated"]) {
        return next({
          name: "LoginPage",
        });
      }

      next();
    },
  },
  {
    path: "/t/epreuves",
    name: "TeacherTestes",
    layout: "teacher",
    meta: {
      title: "Toutes les épreuves",
      layoutClass: "teacher-dashboard",
      sidebarMap: ["tests"],
      breadcrumbs: ["Pages", "Teacher", "Tests"],
    },
    component: () => import("../views/Teacher/Tests.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authentificated"]) {
        return next({
          name: "LoginPage",
        });
      }

      next();
    },
  },
  {
    path: "/t/ratings",
    name: "TeacherRatings",
    layout: "teacher",
    meta: {
      title: "Gérer les cotes de la g1 Informatique",
      layoutClass: "teacher-dashboard",
      sidebarMap: ["ratings"],
      breadcrumbs: ["Pages", "Teacher", "Ratings"],
    },
    component: () => import("../views/Teacher/Ratings.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authentificated"]) {
        return next({
          name: "LoginPage",
        });
      }

      next();
    },
  },
  {
    path: "/f/dashboards/",
    name: "DashboardsFac",
    layout: "fac",
    meta: {
      title: "Tableau de bord",
      sidebarMap: ["dashboards"],
      breadcrumbs: ["Dashboards"],
    },
    component: () => import("../views/Dashboards/Fac.vue"),
  },
  {
    path: "/f/teachers/",
    name: "DashboardsFacTeachers",
    layout: "fac",
    meta: {
      title: "Tous les professeurs",
      sidebarMap: ["Professeurs"],
      breadcrumbs: ["Dashboards", "Teachers"],
    },
    component: () => import("../views/Fac/Teachers.vue"),
  },

  {
    path: "/f/courses/:promo_id",
    name: "DashboardsFacCourses",
    layout: "fac",
    meta: {
      title: "Tous les cours de la promotion",
      sidebarMap: ["Cours"],
      breadcrumbs: ["Dashboards", "courses"],
    },
    component: () => import("../views/Fac/Courses.vue"),
  },

  {
    path: "/f/deliberation/:promo_id",
    name: "DashboardsFacDeliberation",
    layout: "fac",
    meta: {
      title: "Bureaux Jury",
      sidebarMap: ["Delibération"],
      breadcrumbs: ["Dashboards", "délibérations"],
    },
    component: () => import("../views/Fac/Deliberation.vue"),
  },

  {
    path: "/f/session/:promo_id",
    name: "DashboardsFacSession",
    layout: "fac",
    meta: {
      title: "Sessions",
      sidebarMap: ["Séssions"],
      breadcrumbs: ["Dashboards", "séssions"],
    },
    component: () => import("../views/Fac/Session.vue"),
  },

  {
    path: "/f/students/:promo_id",
    name: "DashboardsFacStudent",
    layout: "fac",
    meta: {
      title: "Etudiants",
      sidebarMap: ["Student"],
      breadcrumbs: ["Dashboards", "students"],
    },
    component: () => import("../views/Fac/Students.vue"),
  },

  {
    path: "/pages/profile/profile-overview",
    name: "ProfileOverview",
    layout: "dashboard",
    meta: {
      title: "Overview",
      layoutClass: "layout-profile",
      sidebarMap: ["pages", "profile", "profile-overview"],
      breadcrumbs: ["Pages", "Profile", "Overview"],
    },
    component: () => import("../views/Profile/ProfileOverview.vue"),
  },
  {
    path: "/pages/profile/all-projects",
    name: "AllProjects",
    layout: "dashboard",
    meta: {
      title: "All Projects",
      layoutClass: "layout-profile",
      sidebarMap: ["pages", "profile", "all-projects"],
      breadcrumbs: ["Pages", "Profile", "All Projects"],
    },
    component: () => import("../views/Profile/AllProjects.vue"),
  },
  {
    path: "/pages/users/new-user",
    name: "NewUser",
    layout: "dashboard",
    meta: {
      title: "New User",
      sidebarMap: ["pages", "users", "new-user"],
      breadcrumbs: ["Pages", "Users", "New User"],
    },
    component: () => import("../views/Users/New.vue"),
  },
  {
    path: "/pages/account/settings",
    name: "Settings",
    layout: "dashboard",
    meta: {
      title: "Settings",
      sidebarMap: ["pages", "account", "settings"],
      breadcrumbs: ["Pages", "Account", "Settings"],
    },
    component: () => import("../views/Account/Settings.vue"),
  },
  {
    path: "/pages/account/billing",
    name: "Billing",
    layout: "dashboard",
    meta: {
      title: "Billing",
      sidebarMap: ["pages", "account", "billing"],
      breadcrumbs: ["Pages", "Account", "Billing"],
    },
    component: () => import("../views/Account/Billing.vue"),
  },
  {
    path: "/pages/account/invoice",
    name: "Invoice",
    layout: "dashboard",
    meta: {
      title: "Invoice",
      sidebarMap: ["pages", "account", "invoice"],
      breadcrumbs: ["Pages", "Account", "Invoice"],
    },
    component: () => import("../views/Account/Invoice.vue"),
  },
  {
    path: "/pages/projects/timeline",
    name: "Timeline",
    layout: "dashboard",
    meta: {
      title: "Timeline",
      sidebarMap: ["pages", "projects", "timeline"],
      breadcrumbs: ["Pages", "Projects", "Timeline"],
    },
    component: () => import("../views/Projects/Timeline.vue"),
  },
  {
    path: "/pages/pricing",
    name: "Pricing",
    meta: {
      layoutClass: "layout-pricing",
      title: "Pricing",
    },
    component: () => import("../views/Pricing.vue"),
  },
  {
    path: "/pages/rtl",
    name: "RTL",
    layout: "dashboard-rtl",
    meta: {
      layoutClass: "dashboard-rtl",
      title: "RTL",
      sidebarMap: ["pages", "rtl"],
      breadcrumbs: ["Pages", "RTL"],
    },
    component: () => import("../views/RTL.vue"),
  },
  {
    path: "/pages/charts",
    name: "Charts",
    layout: "dashboard",
    meta: {
      layoutClass: "dashboard",
      title: "Charts",
      sidebarMap: ["pages", "charts"],
      breadcrumbs: ["Pages", "Charts"],
    },
    component: () => import("../views/Charts.vue"),
  },
  {
    path: "/pages/alerts",
    name: "Alerts",
    layout: "dashboard",
    meta: {
      layoutClass: "dashboard",
      title: "Alerts",
      sidebarMap: ["pages", "alerts"],
      breadcrumbs: ["Pages", "Alerts"],
    },
    component: () => import("../views/Alerts.vue"),
  },
  {
    path: "/pages/notifications",
    name: "Notifications",
    layout: "dashboard",
    meta: {
      layoutClass: "dashboard",
      title: "Notifications",
      sidebarMap: ["pages", "notifications"],
      breadcrumbs: ["Pages", "Notifications"],
    },
    component: () => import("../views/Notifications.vue"),
  },
  {
    path: "/applications/calendar",
    name: "Calendar",
    layout: "dashboard",
    meta: {
      title: "Calendar",
      sidebarMap: ["applications"],
      breadcrumbs: ["Applications", "Calendar"],
    },
    component: () => import("../views/Applications/Calendar.vue"),
  },
  {
    path: "/applications/kanban",
    name: "Kanban",
    layout: "dashboard",
    meta: {
      title: "Kanban",
      sidebarMap: ["applications"],
      breadcrumbs: ["Applications", "Kanban"],
    },
    component: () => import("../views/Applications/Kanban.vue"),
  },
  {
    path: "/applications/wizard",
    name: "Wizard",
    layout: "dashboard",
    meta: {
      title: "Wizard",
      sidebarMap: ["applications"],
      breadcrumbs: ["Applications", "Wizard"],
    },
    component: () => import("../views/Applications/Wizard.vue"),
  },
  {
    path: "/applications/datatables",
    name: "DataTables",
    layout: "dashboard",
    meta: {
      title: "DataTables",
      sidebarMap: ["applications"],
      breadcrumbs: ["Applications", "DataTables"],
    },
    component: () => import("../views/Applications/DataTables.vue"),
  },
  {
    path: "/ecommerce/products/new-product",
    name: "New Product",
    layout: "dashboard",
    meta: {
      layoutClass: "layout-profile",
      title: "New Product",
      sidebarMap: ["ecommerce", "products", "new-product"],
      breadcrumbs: ["Ecommerce", "Products", "New Product"],
    },
    component: () => import("../views/Ecommerce/Products/NewProduct.vue"),
  },
  {
    path: "/ecommerce/products/edit-product",
    name: "Edit Product",
    layout: "dashboard",
    meta: {
      title: "Edit Product",
      sidebarMap: ["ecommerce", "products", "edit-product"],
      breadcrumbs: ["Ecommerce", "Products", "Edit Product"],
    },
    component: () => import("../views/Ecommerce/Products/EditProduct.vue"),
  },
  {
    path: "/ecommerce/products/product-page",
    name: "Product Page",
    layout: "dashboard",
    meta: {
      title: "Product Page",
      sidebarMap: ["ecommerce", "products", "product-page"],
      breadcrumbs: ["Ecommerce", "Products", "Product Page"],
    },
    component: () => import("../views/Ecommerce/Products/ProductPage.vue"),
  },
  {
    path: "/ecommerce/orders/orders-list",
    name: "Orders List",
    layout: "dashboard",
    meta: {
      title: "Orders List",
      sidebarMap: ["ecommerce", "orders", "orders-list"],
      breadcrumbs: ["Ecommerce", "Orders", "Orders List"],
    },
    component: () => import("../views/Ecommerce/Orders/OrdersList.vue"),
  },
  {
    path: "/ecommerce/orders/orders-details",
    name: "Orders Details",
    layout: "dashboard",
    meta: {
      title: "Orders Details",
      sidebarMap: ["ecommerce", "orders", "orders-details"],
      breadcrumbs: ["Ecommerce", "Orders", "Orders Details"],
    },
    component: () => import("../views/Ecommerce/Orders/OrdersDetails.vue"),
  },
  {
    path: "/t/sign-up/:link",
    name: "Illustration Sign Up",
    layout: "default",
    meta: {
      layoutClass: "layout-sign-up-illustration",
      title: "Illustration Sign Up",
      sidebarMap: ["authentication", "sign-up", "illustration"],
      breadcrumbs: ["Authentication", "Sign Up", "Illustration"],
      nofooter: true,
    },
    component: () => import("../views/Authentication/Sign-Up/Illustration.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    layout: "default",
    meta: {
      layoutClass: "layout-sign-up-illustration",
      title: "Illustration Sign Up",
      sidebarMap: ["authentication", "sign-up", "illustration"],
      breadcrumbs: ["Authentication", "Sign Up", "Illustration"],
      nofooter: true,
    },
    component: () => import("../views/Authentication/Sign-Up/Login.vue"),
  },
  {
    path: "/edit-credentials",
    name: "Editcredentials",
    layout: "default",
    meta: {
      layoutClass: "layout-sign-up-illustration",
      title: "Edit Credentials",
      sidebarMap: ["authentication", "sign-up", "illustration"],
      breadcrumbs: ["Authentication", "Sign Up", "Illustration"],
      nofooter: true,
    },
    component: () =>
      import("../views/Authentication/Sign-Up/EditCredentials.vue"),
  },
  {
    path: "/layout",
    name: "Layout",
    layout: "dashboard",
    component: () => import("../views/Layout.vue"),
  },
];

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute(route, parentLayout = "teacher") {
  route.meta = route.meta || {};
  route.meta.layout = route.layout || parentLayout;

  if (route.children) {
    route.children = route.children.map((childRoute) =>
      addLayoutToRoute(childRoute, route.meta.layout)
    );
  }
  return route;
}

routes = routes.map((route) => addLayoutToRoute(route));

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    }
    return {
      x: 0,
      y: 0,
      behavior: "smooth",
    };
  },
});

export default router;
