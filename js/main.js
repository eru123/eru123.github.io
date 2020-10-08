const routes = [];

try {
  app_data.forEach((r) => {
    if (typeof r.route != "undefined") {
      routes.push(r.route);
    }

    if (typeof r.page != "undefined") {
      store.state.menu.push({
        name: r.page,
        icon: r.icon || "mdi-alert",
        link: "#" + r.route.path,
      });
    }
  });

  if (routes.length > 0) {
    console.log("[ROUTER] " + routes.length + " routes compiled.");
  } else {
    console.warn("[ROUTER] 0 routes compiled");
  }
} catch (e) {
  console.error("[APP_DATA] Failed to compile");
}

var router = new VueRouter({ routes: routes });

Vue.directive('md', {
  bind(el){
    el.innerHTML = RedMantisTextParser.toMarkdown(el.textContent)
  }
})

new Vue({
  el: "#app",
  data: store.state,
  created() {
    this.$store.commit("stopFetching");
    document.body.style.display = "block";
    changeDocTitle("App");
    this.fetchSource();
  },
  methods: {
    fetchSource: function () {
      this.$store.commit("startFetching");
      RedMantis.source({
        main: ["https://cors-anywhere.herokuapp.com/https://eru123.github.com/api/sources.json"],
        backup: ["api/sources.json"],
      }).then((a) => {
        this.$store.commit("source", a);
        RedMantis.data(a).then((b) => {
          this.$store.commit("data", b);
          this.$store.commit("stopFetching");
        });
      });
    },
    closeBrowser: function () {
      this.$store.commit("closeBrowser");
    },
  },
  store,
  router,
  vuetify: new Vuetify({}),
});
