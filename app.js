const app_data = [
  {
    route: {
      name: "Default",
      path: "",
      redirect: "/home",
    },
  },
  {
    page: "Home",
    icon: "mdi-home",
    route: {
      name: "Home",
      path: "/home",
      component: {
        template: "#xdata",
        data() {
          return {
            posts: [],
          };
        },
        created() {
          changeDocTitle("Red Mantis");
        },
      },
    },
  },
  {
    page: "Library",
    icon: "mdi-book-open-variant",
    route: {
      name: "Books",
      path: "/books",
      component: {
        template: "#xdata",
        data() {
          return {
            posts: [
              {
                type:"loading"
              }
            ],
          };
        },
        created: async function() {
          changeDocTitle("Books");

          while (this.$store.state.fetching) {
            await delay(0.5);
          }
          
          await this.retrieveBooks()
        },
        methods: {
          retrieveBooks: async function () {
            this.posts = [];
            var books = app__books();
            var categories = app__booksCategories();
            var tags = app__booksTags();
            var tagsFromCategory = app__booksTagsFromCategory("kdrama")
            if (books.length > 0) {

              var recommended =  this.recommend();

              this.posts.push({
                type: "heading",
                level: 3,
                content: "Recommended"
              })
              this.posts.push({
                type: "books-recommended",
                items: recommended
              })

              if (categories.length > 0) {
                this.posts.push({
                  type: "heading",
                  level: 3,
                  content: "Categories"
                })
                var ctgs_final = []

                RedMantis.foreach(categories,function(ctg){
                  var ctgs = app__booksTagsFromCategory(ctg)
                  ctgs_final.push({
                    category: ctg,
                    tags: ctgs
                  })
                })
                
                this.posts.push({
                  type: "books-categories",
                  items: ctgs_final
                })
              }

            } else {
              this.posts = [
                {
                  type: "paragraph",
                  alignment: "center",
                  content: "No Data"                  
                },
                {
                  type: "reload"
                }
              ]
            }
            
          },
          recommend:  function(show = 10){
            var books =  app__books();
            return RedMantis.shuffleArray(books).slice(0,show)
          },
          openBook: function(title,link){
            this.$store.commit("openBrowser",{title:title,link:link})
          }
        },
      },
    },
  },
  {
    page: "Videos",
    icon: "mdi-youtube",
    route: {
      name: "Videos",
      path: "/videos",
      component: {
        template: "#xdata",
        data() {
          return {
            posts: [
              {
                type: "loading",
              },
            ],
          };
        },
        created: async function () {
          changeDocTitle("Videos");
          while (this.$store.state.fetching) {
            await delay(0.1);
          }
          this.retrieveCategories();
        },
        methods: {
          retrieveCategories: async function () {
            this.posts = [];
            var videos = app__videos() || [];
            if (videos.length > 0) {
              this.posts = [
                {
                  type: "heading",
                  level: 3,
                  content: "Categories",
                },
                {
                  type: "videos-categories",
                  items: videos,
                },
              ];
            } else {
              this.posts = [
                {
                  type: "paragraph",
                  alignment: "center",
                  content: "No data, try restarting the app to retrieve new posts"
                },
                {
                  type: "restart"
                }
              ]
            }
          }
        },
      },
    },
  },
  {
    route: {
      name: "VideoPlaylists",
      path: "/videos/:category",
      component: {
        template: "#xdata",
        data() {
          return {
            posts: [
              {
                type: "loading",
              },
            ],
          };
        },
        created: async function () {
          changeDocTitle("Videos");
          while (this.$store.state.fetching) {
            await delay(0.1);
          }
          this.retrieveCategories();
        },
        methods: {
          retrieveCategories: async function () {
            
            this.posts = [
              {
                type: "back",
                name: "Back to Categories",
                link: "#/videos",
              },
              {
                type: "heading",
                level: 3,
                content: "Playlists",
              },
            ];

            var ctg = app__videos(this.$route.params.category);
            if (ctg.length > 0) {
              this.posts.push({
                type: "videos-playlists",
                items: ctg,
              });
            } else {
              this.posts.push({
                type: "paragraph",
                alignment: "left",
                content: "No data, try restarting the app to retrieve new posts"
              })
              this.posts.push({ type: "restart"})
            }
          },
          openYT: function(name,code){
            this.$store.commit('openBrowser',{title:name,link: "https://www.youtube.com/embed/" + code})
          }
        },
      },
    },
  },
  {
    route: {
      name: "VideoPlay",
      path: "/videos/:category/:playlist/:code",
      component: {
        template: "#xdata",
        data() {
          return {
            posts: [{ type: "loading" }],
          };
        },
        created: async function () {
          changeDocTitle("Playback");

          while (store.state.sourcesFetchStatus.fetching) {
            await delay(0.5);
          }

          this.posts = [
            {
              type: "back",
              name: "Back to Playlists",
              link: "#/videos/" + this.$router.currentRoute.params.category,
            },
            {
              type: "videos-playback",
              code: this.$router.currentRoute.params.code,
            },
          ];
        },
      },
    },
  },
  {
    page: "Memes",
    icon: "mdi-dance-pole",
    route: {
      name: "Memes",
      path: "/memes",
      component: {
        template: "#xdata",
        data() {
          return {
            mobile: true,
            posts: [
              {
                type: "loading",
              },
            ]
          };
        },
        created: async function () {
          changeDocTitle("Memes");
          while (this.$store.state.fetching) {
            await delay(0.1);
          }
          this.refreshMemes();
        },
        methods: {
          refreshMemes: function () {
            this.posts = [];
            var reddit = [];
            var final = [];
            if (localStorage.getItem("source")) {
              var subr = JSON.parse(localStorage.getItem("source")).memes

              if (Array.isArray(subr)){
                this.posts = [
                  {
                    type: "heading",
                    level: 3,
                    content: "May post na wait kalang ha! love you!"
                  }
                ]

                for (r in subr){
                  var sr = subr[r];
                  if (localStorage.getItem(sr)) {
                    var d = JSON.parse(localStorage.getItem(sr))
                    reddit.push(d.data.children)
                  }
                }
                var totalPosts = 0;
                var totalImages = 0

                for (var i = 0; i < 31; i++) {
                  RedMantis.foreach(reddit,function(r){
                    if (r[i] && r[i].data) {
                      totalPosts++;
                      var d = r[i].data;
                      var ttl = d.title || null
                      var img = d.url_overridden_by_dest || null
                      var thmb = 'img/loading.gif'
                      var subtl = d.subreddit || d.data.title  || null
                      var txt = d.selftext || null
                      if (RedMantis.imgChk(img)) {
                        totalImages++;
                        final.push({
                          type: "card-mobile",
                          title: ttl,
                          subtitle: subtl,
                          imageUrl: img,
                          download: img,
                          content: txt,
                          thumbnail: thmb
                        })
                      }
                    }
                  })
                }

                if (final.length > 0) {
                  this.posts = final
                  this.posts.push({
                    type: "paragraph",
                    alignment: "center",
                    content: "End of Result"
                  })
                  console.log("[MEMES] Showing " + totalImages + " of " + totalPosts + " memes.")
                } else {
                  this.posts = [
                    {
                      type: "paragraph",
                      alignment: "center",
                      content: "No data, try restarting the app to retrieve new posts"
                    },
                    {
                      type: "restart"
                    }
                  ]
                }

              }
            } else {
              this.posts = [
                {
                  type: "paragraph",
                  alignment: "center",
                  content: "No data, try restarting the app to retrieve new posts"
                },
                {
                  type: "restart"
                }
              ]
            }
          },
          forceFileDownload(response,filename){
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', filename) //or any other extension
            document.body.appendChild(link)
            link.click()
          },
          download(url){
            axios({
              method: 'get',
              url: url,
              responseType: 'arraybuffer'
            })
            .then(response => {
              console.log(response)
            })
            .catch(() => alert("Check you Internet and Enable CORS"))
          }
        },
      },
    },
  },
  {
    page: "About",
    icon: "mdi-alpha-a-circle",
    route: {
      name: "About",
      path: "/about",
      component: {
        template: "#xdata",
        data() {
          return {
            posts: [
              {
                type: "heading",
                level: 1,
                content: "Red Mantis",
              },
              {
                type: "paragraph",
                alignment: "justify",
                content:
                  "A free and open-source platform that provides collection of Web Services, Informations, Videos, Books and Entertainments. Our mission is to give free and reliable information and expand the open-source community to help everyone in their careers specially students and self-taught developers.",
              },
              {
                type: "heading",
                level: 3,
                content: "Support",
              },
              {
                type: "card",
                avatar: true,
                my: 4,
                img: "img/facebook_logo.png",
                title: "Facebook",
                subtitle: "@lighty262",
              },
              {
                type: "card",
                avatar: true,
                my: 4,
                img: "img/instagram_logo.png",
                title: "Instagram",
                subtitle: "@yeoligo123",
              },
              {
                type: "card",
                avatar: true,
                my: 4,
                img: "img/github_logo.png",
                title: "Github",
                subtitle: "@eru123",
              },
              {
                type: "card",
                avatar: true,
                my: 4,
                img: "img/gmail_logo.png",
                title: "Gmail",
                subtitle: "yeoligoakino@gmail.com",
              },
              {
                type: "card",
                avatar: true,
                my: 4,
                icon: "mdi-phone",
                title: "Mobile Phone",
                subtitle: "(+63) 936 852 3483",
              },
              {
                type: "card",
                avatar: true,
                my: 4,
                img: "img/patreon_logo.png",
                title: "Patreon",
                subtitle: "patreon.com/JAquino",
              },
              {
                type: "card",
                avatar: true,
                my: 4,
                img: "img/paypal_logo.png",
                title: "PayPal",
                subtitle: "paypal.me/ja1030",
              },
            
            ],
          };
        },
        created() {
          changeDocTitle("About");
        },
      },
    },
  },
  {
    route: {
      name: "InvalidLink",
      path: "/*",
      component: {
        template: "#xdata",
        data() {
          return {
            posts: [
              {
                type: 404
              }
            ],
          };
        },
        created() {
          changeDocTitle("Red Mantis");
        },
      },
    },
  }
];
