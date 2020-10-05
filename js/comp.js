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
    openBrowser(state, value) {
      state.browser = true;
      state.browserLink = value.link;
      state.browserTitle = value.title || "";
    },
    closeBrowser(state) {
      state.browser = false;
      state.browserLink = null;
      state.browserTitle = null;
    },
    source(state, value) {
      state.source = value;
    },
    data(state, value) {
      state.data = value;
    },
    stopFetching(state) {
      state.fetching = false;
    },
    startFetching(state) {
      state.fetching = true;
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
function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function app__videos(playlist_id = null) {
  var videos = [];
  var playlist = [];
  if (localStorage.getItem("source")) {
    var vids = JSON.parse(localStorage.getItem("source")).videos;
    if (Array.isArray(vids)) {
      for (r in vids) {
        var sr = vids[r];
        if (localStorage.getItem(sr)) {
          var d = JSON.parse(localStorage.getItem(sr));
          RedMantis.foreach(d, function (v) {
            var dups = false;
            RedMantis.foreach(videos, function (vv) {
              if (v.id == vv.id) {
                dups = true;
              }
            });
            if (!dups) {
              videos.push(v);
            }
          });
        }
      }
    }
  }
  if (playlist_id) {
    RedMantis.foreach(videos, function (ctg) {
      if (ctg.id === playlist_id) {
        playlist = ctg.childs;
      }
    });
    return playlist;
  }
  return videos;
}
function app__books() {
  var books = [];
  if (localStorage.getItem("source")) {
    var bks = JSON.parse(localStorage.getItem("source")).books;
    if (Array.isArray(bks)) {
      RedMantis.foreach(bks, function (bk) {
        if (JSON.parse(localStorage.getItem(bk))) {
          var b = JSON.parse(localStorage.getItem(bk));
          RedMantis.foreach(b, function (itm) {
            var dups = false;
            RedMantis.foreach(books, function (book) {
              if (book.link === itm.link) {
                dups = true;
              }
            });
            if (!dups) {
              books.push(itm);
            }
          });
        }
      });
    }
  }
  return books;
}
function app__booksCategories() {
  var books = app__books();
  var categories = [];
  RedMantis.foreach(books, function (book) {
    var dups = false;
    RedMantis.foreach(categories, function (ctg) {
      if (ctg === book.category) {
        dups = true;
      }
    });
    if (!dups) {
      categories.push(book.category);
    }
  });
  return categories;
}
function app__booksTags() {
  var books = app__books();
  var tags = [];
  RedMantis.foreach(books, function (book) {
    RedMantis.foreach(book.tags, function (ctg) {
      var dups = false;
      RedMantis.foreach(tags, function (v) {
        if (v === ctg) {
          dups = true;
        }
      });
      if (!dups) {
        tags.push(ctg);
      }
    });
  });
  return tags;
}
function app__booksTagsFromCategory(category) {
  var books = app__books();
  var tags = [];
  RedMantis.foreach(books, function (book) {
    RedMantis.foreach(book.tags, function (ctg) {
      if (book.category === category) {
        var dups = false;
        RedMantis.foreach(tags, function (v) {
          if (v === ctg) {
            dups = true;
          }
        });
        if (!dups) {
          tags.push(ctg);
        }
      }
    });
  });
  return tags;
}
function app__booksFromCategory(category) {
  var books = app__books();
  var result = [];
  RedMantis.foreach(books, function (book) {
    if (book.category === category) {
      result.push(book);
    }
  });

  return result;
}
function app__announcements() {
  var announcements = [];
  var announce_data = [];
  if (localStorage.getItem("source")) {
    var sources = JSON.parse(localStorage.getItem("source")).announce;
    for (source in sources) {
      var src = sources[source];
      if (localStorage.getItem(src)) {
        var d = JSON.parse(localStorage.getItem(src));
        announce_data.push(d.data.children);
      }
    }
    for (var i = 0; i < 31; i++) {
      RedMantis.foreach(announce_data, function (r) {
        if (r[i] && r[i].data && r[i].kind == "t3") {
          var d = r[i].data;
          var ttl = d.title || null;
          var img = d.url_overridden_by_dest || null;
          var subtl = d.subreddit || d.author || "reddit";
          var txt = d.selftext || null;
          var htm = d.selftext_html || null;
          var thmb = "img/loading.gif";
          if (RedMantis.imgChk(img)) {
            announcements.push({
              title: ttl,
              subtitle: "r/" + subtl,
              imageUrl: img,
              content: txt,
              html: htm,
              thumbnail: thmb,
            });
          } else {
            announcements.push({
              title: ttl,
              subtitle: "r/" + subtl,
              html: htm,
              content: txt,
            });
          }
        }
      });
    }
  }
  return announcements;
}
function app__memes() {
  var memes = [];
  var reddit = [];
  if (localStorage.getItem("source")) {
    var sources = JSON.parse(localStorage.getItem("source")).memes;
    for (source in sources) {
      var src = sources[source];
      if (localStorage.getItem(src)) {
        var d = JSON.parse(localStorage.getItem(src));
        reddit.push(d.data.children);
      }
    }
    for (var i = 0; i < 31; i++) {
      RedMantis.foreach(reddit, function (r) {
        if (r[i] && r[i].data) {
          if (RedMantis.imgChk(r[i].data.url_overridden_by_dest)) {
            memes.push(r[i].data);
          }
        }
      });
    }
  }
  return memes;
}
