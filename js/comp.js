Vue.use(Vuex);
Vue.use(Vuetify);


const store = new Vuex.Store({
  state: {
    drawer: null,
    pageName: "Application",
    menu:[],
    sources:[],
    sourcesFetchStatus:{
    	fetching: false,
    	fetch: 0,
    	error: 0,
    	toBeFetch: true
    }
  }
});

function changeDocTitle(t = false) {
  document.title = t;
  store.state.pageName = t;
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function delay(seconds){
	return new Promise((resolve,reject) => {
		setTimeout(function(){resolve(seconds * 1000)}, seconds * 1000)
	})
}