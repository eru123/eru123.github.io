Vue.use(Vuex);
Vue.use(Vuetify);


const store = new Vuex.Store({
  state: {
    drawer: null,
    pageName: "Application",
    menu:[]
  }
});

function changeDocTitle(t = false) {
  document.title = t;
  store.state.pageName = t;
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}