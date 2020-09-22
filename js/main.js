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

new Vue({
  el: "#app",
  data: store.state,
  created() {
    document.body.style.display = "block";
    changeDocTitle("App");
    this.fetchSource();
    setInterval(() => this.fetchSource(), 1000 * 60 * 10);
  },
  methods: {
    fetchSource: function () {
      this.sources = [];
      this.sourcesFetchStatus.fetch = 0;
      this.sourcesFetchStatus.error = 0;
      if (this.sourcesFetchStatus.toBeFetch) {
        try {
          sources.forEach((category) => {
            if (category.links && category.links.length > 0) {
              category.links.forEach((link) => {
                this.sources.push(link);
              });
            }
          });
        } catch (e) {
          console.error("[SOURCES] Failed to compile.");
        }

        if (this.sources.length > 0) {
          console.log(
            "[SOURCES] Fetching " + this.sources.length + " sources."
          );
          this.sourcesFetchStatus.fetching = true;
          this.sources.forEach((link) => {
            fetch(link)
              .then((r) => {
                return r.json();
              })
              .then(async (r) => {
                this.sourcesFetchStatus.fetch =
                  this.sourcesFetchStatus.fetch + 1;
                await idbKeyval.del(link);
                await delay(0.1);
                await idbKeyval.set(link, r);
              })
              .catch((e) => {
                this.sourcesFetchStatus.error =
                  this.sourcesFetchStatus.error + 1;
              })
              .finally(async () => {
                if (
                  this.sourcesFetchStatus.error +
                    this.sourcesFetchStatus.fetch ==
                  this.sources.length
                ) {
                  console.log(
                    "[SOURCES] " +
                      this.sourcesFetchStatus.fetch +
                      " source fetched, " +
                      this.sourcesFetchStatus.error +
                      " source failed."
                  );
                  await delay(2);
                  this.sourcesFetchStatus.fetching = false;
                }
                store.state.sources = this.sources;
                store.state.sourcesFetchStatus = this.sourcesFetchStatus;
                store.state.sources = this.sources;
              });
          });
        } else {
          console.warn("[SOURCES] No source to fetch.");
        }
      }
    },
  },
  store,
  router,
  vuetify: new Vuetify({}),
});
