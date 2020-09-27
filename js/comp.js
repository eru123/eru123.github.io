Vue.use(Vuex);
Vue.use(Vuetify);

const store = new Vuex.Store({
  state: {
    browser: false,
    browserLink: null,
    browserTitle: null,
    drawer: null,
    pageName: "Application",
    menu: [],
    sources: {},
    data: {},
    fetching: true,
  },
  mutations: {
    openBrowser(state,value){
      state.browser = true;
      state.browserLink = value.link;
      state.browserTitle = value.title || "";
    },
    closeBrowser(state){
      state.browser = false;
      state.browserLink = null
      state.browserTitle = null
    },
    source(state,value){
      state.source = value
    },
    data(state,value){
      state.data = value
    },
    stopFetching(state){
      state.fetching = false;
    },
    startFetching(state){
      state.fetching = true;
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
function delay(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(seconds * 1000);
    }, seconds * 1000);
  });
}
function imageChecker(str) {
  var regex = /(\.jpg|\.png|\.gif|\.jpeg|\.img)/gm;
  if (regex.exec(str)) {
    return true;
  }
  return false;
}
function objectsAreSame(x, y) {
  var objectsAreSame = true;
  for (var propertyName in x) {
    if (x[propertyName] !== y[propertyName]) {
      objectsAreSame = false;
      break;
    }
  }
  return objectsAreSame;
}
function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function app__videos(playlist_id = null){
  var videos = [];
  var playlist = [];
  if (localStorage.getItem("source")) {
    var vids = JSON.parse(localStorage.getItem("source")).videos
    if (Array.isArray(vids)){
      for (r in vids){
        var sr = vids[r];
        if (localStorage.getItem(sr)) {
          var d = JSON.parse(localStorage.getItem(sr))
          RedMantis.foreach(d,function(v){
            var dups = false
            RedMantis.foreach(videos,function(vv){
              if (v.id == vv.id) {dups = true}
            })
            if (!dups) {
              videos.push(v)
            }

          })
        }
      }
    }
  } 
  if (playlist_id) {
    RedMantis.foreach(videos,function(ctg){
      if (ctg.id === playlist_id) {playlist = ctg.childs}
    })
    return playlist;
  }
  return videos;
}