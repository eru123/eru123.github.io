



const routes = [];

app_data.forEach((r) => {
  if (typeof r.route != "undefined") {
    routes.push(r.route)
  }
  if (typeof r.page != "undefined") {
    store.state.menu.push({
      name: r.page,
      icon: r.icon || "mdi-alert",
      link: "#" + r.route.path
    })
  }
});

console.log(store.state)

console.log(routes)
var router = new VueRouter({ routes: routes });

new Vue({
  el: "#app",
  data: store.state,
  created(){
    document.body.style.display = "block";
  },
  store,
  router,
  vuetify: new Vuetify({})
});
