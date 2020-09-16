function changeDocTitle(t = false) {
  document.title = t === false ? cfg.appName : t + " | " + cfg.appName;
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    loading: true,
    loadingMessage: "",
    error: false,
    errorMessage: "",
  },
  mutations: {
    loading(state) {
      state.loading = true;
    },
    loadingStop(state) {
      state.loading = false;
    },
  },
});

Vue.component("loading", {
  template: '<div class="loading"><div class="loader"></div></div>',
});
Vue.component("sidebar", {
  template: "#sidebar",
  data() {
    return {
      sbMenuClass: "sidebar-menu",
      sbBlankClass: "sidebar-blank",
      title: cfg.appName,
      back: { name: "Default" },
      list: cfg.sidebarItems,
    };
  },
  methods: {
    open: function () {
      this.sbMenuClass = "sidebar-menu sb-open";
      this.sbBlankClass = "sidebar-blank sb-open";
    },
    close: function () {
      this.sbMenuClass = "sidebar-menu sb-close";
      this.sbBlankClass = "sidebar-blank sb-close";
    },
  },
  created: function () {
    console.log("SB");
    var currentName = router.currentRoute.name;

    var title = this.title;
    var isMainRoute = false;
    cfg.sidebarItems.forEach((n) => {
      var pageRouteName = n.link.name;
      if (pageRouteName == currentName) {
        title = n.link.title || n.link.name;
        isMainRoute = true
      }
    });


    if (!isMainRoute) {

      cfg.apps.forEach((x) => {
        if(x.link.name == currentName){
          title = x.title
        }
      })

      cfg.games.forEach((x) => {
        if(x.link.name == currentName){
          title = x.title
        }
      })
    }


    if (title !== cfg.appName) {
      console.log("changing app name")
      changeDocTitle(title);
      this.title = title;
    }

  },
});
Vue.component("under-construction", {
  template:
    '<div class="text-center container"><h1 class="mt-4">SORRY, COME BACK LATER!</h1><img src="img/under_construction_sign.jpg" style="width:80%;height:auto;margin:auto"></div>',
});
Vue.component("card", {
  template: '<div class="my-card"><slot></slot></div>',
});
Vue.component("mobile", {
  template:
    '<div class="mobile-width-only"><div class="container"><slot></slot></div></div>',
});
Vue.component("app-wrapper", {
  template: "<div><sidebar /><slot></slot></div>",
});
Vue.component("page-wrapper", {
  template: "<div><sidebar /><mobile><slot></slot></mobile></div>",
});

var Home = {
  template: "#home",
  data() {
    return {
      defaultAppIcon: cfg.defaultAppIcon,
      defaultGameIcon: cfg.defaultGameIcon,
      rApps: [],
      rGames: [],
      rPages: [],
      rPosts: cfg.posts
    };
  },
  created: function () {
    var appsList = cfg.apps;
    var gamesList = cfg.games;

    function recommendFromList(list, n = 1) {
      var pList = [];
      if (list.length > 0) {
        var cN = 0;
        list.forEach((x) => {
          if (n !== cN) {
            if (rand(0, 1) == 1) {
              pList.push(x);
              n++;
            }
          }
        });
      }

      if (pList.length == 0 && list.length > 0 && n > 0) {
        return recommendFromList(list,n)
      }

      return pList;
    }

    this.rApps = recommendFromList(appsList, 3);
    this.rGames = recommendFromList(gamesList, 3);
  },
  methods: {
    follow: function (link) {
      router.push(link);
    },
  },
};
var Apps = {
  template: "#apps",
  data() {
    return {
      list: cfg.apps,
      defaultIcon: cfg.appItemIcon,
    };
  },
  methods: {
    follow: function (link) {
      router.push(link);
    },
  },
};
var Games = {
  template: "#apps",
  data() {
    return {
      list: cfg.games,
      defaultIcon: cfg.gameItemIcon,
    };
  },
  methods: {
    follow: function (link) {
      router.push(link);
    },
  },
};
var About = {
  template: "#about",
  data(){
    return {
      appName: cfg.appName,
      contacts: cfg.contacts,
      version: cfg.version,
      license: cfg.copyright,
      description: cfg.description
    }
  }
};
var routes = [
  {
    name: "Default",
    path: "",
    redirect: "/home",
  },
  {
    name: "Home",
    path: "/home",
    component: Home,
  },
  {
    name: "Apps",
    path: "/apps",
    component: Apps,
  },
  {
    name: "Games",
    path: "/games",
    component: Games,
  },
  {
    name: "About",
    path: "/about",
    component: About,
  },
];

routes = routes.concat(routesExt);

var router = new VueRouter({ routes: routes });

new Vue({
  el: "#app",
  data: store.state,
  created: function () {
    console.log("APP STARTED");
    store.commit("loadingStop");
  },
  store,
  router,
});
