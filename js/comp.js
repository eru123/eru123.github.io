Vue.use(Vuex);
Vue.use(Vuetify);

const store = new Vuex.Store({
  state: {
    drawer: null,
    pageName: "Application",
    menu: [],
    sources: [],
    sourcesFetchStatus: {
      fetching: false,
      fetch: 0,
      error: 0,
      toBeFetch: true,
    },
  },
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
function getLinksFromSource(src, name) {
  var res = [];
  src.forEach((e) => {
    if (e.name == name) {
      res = e.links;
    }
  });
  return res;
}
function getDataFromLinks(links, key = null) {
  var res = [];
  links.forEach(async (link) => {
    var cp = res;
    await idbKeyval.get(link).then((e) => {
      e.forEach((f) => {
        var b = true;
        if (key) {
          res.forEach((d) => {
            if (d[key] == f[key]) {
              b = false;
            }
          });
        }
        if (b) {
          res.push(f);
        }
      });
    });
  });
  return res;
}
