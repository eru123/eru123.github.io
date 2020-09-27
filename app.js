const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto labore debitis suscipit esse, consectetur cum, vitae laborum aliquid facilis nam a accusantium perspiciatis maxime illo voluptate, dolorum numquam assumenda ducimus.";
const sample_yte =
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/rpQhIdRwNMA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

const sources = [
  {
    name: "books",
    links: [
      "api/books.json",
      // "https://eru123.github.io/api/books.json",
    ],
  },
  {
    name: "videos",
    links: [
      "api/videos.json", 
      // "https://eru123.github.io/api/videos.json"
    ],
  },
  {
    name: "articles",
    links: [
      "api/articles.json", 
      // "https://eru123.github.io/api/articles.json"
    ],
  },
  {
    name: "announce",
    links: [
      "api/announce.json",
      // "https://eru123.github.io/api/announce.json",
    ],
  },
  {
    name: "reddit",
    links: [
      // "https://www.reddit.com/r/PampamilyangPaoLUL.json",
      // "https://www.reddit.com/r/goodanimemes.json",
      // "https://www.reddit.com/r/Animemes.json",
      // "https://www.reddit.com/r/goodanimememes.json",
      // "https://www.reddit.com/r/ProgrammerHumor.json",
      // "https://www.reddit.com/r/programmingmemes.json",
      // "https://www.reddit.com/r/wholesomememes.json",
      // "https://www.reddit.com/r/ComedyCemetery.json",
      // "https://www.reddit.com/r/sadcringe.json",
      // "https://www.reddit.com/r/terriblefacebookmemes.json",
      // "https://www.reddit.com/r/im14andthisisdeep.json",
      // "https://www.reddit.com/r/pewdiepie.json",
      // "https://www.reddit.com/r/PewdiepieSubmissions.json",
      // "https://www.reddit.com/r/meme.json",
      // "https://www.reddit.com/r/memes.json",
      // "https://www.reddit.com/r/dankmemes.json",
      // "https://www.reddit.com/r/redditmoment.json",
      // "https://www.reddit.com/r/bestmemes.json",
      // "https://www.reddit.com/r/Cringetopia.json",
      // "https://www.reddit.com/r/ForShub.json",
    ],
  },
];

const sample_posts = [
  {
    type: "heading",
    level: 1,
    content: "Heading 1",
  },
  {
    type: "heading",
    level: 2,
    content: "Heading 2",
  },
  {
    type: "heading",
    level: 3,
    content: "Heading 3",
  },
  {
    type: "heading",
    level: 4,
    content: "Heading 4",
  },
  {
    type: "heading",
    level: 5,
    content: "Heading 5",
  },
  {
    type: "heading",
    level: 6,
    content: "Heading 6",
  },
  {
    type: "paragraph",
    alignment: "left",
    content: "left paragraph - " + lorem + lorem,
  },
  {
    type: "paragraph",
    alignment: "center",
    content: "center paragraph - " + lorem + lorem,
  },
  {
    type: "paragraph",
    alignment: "right",
    content: "right paragraph - " + lorem + lorem,
  },
  {
    type: "paragraph",
    alignment: "justify",
    content: "justify paragraph - " + lorem + lorem,
  },
  {
    type: "carousel",
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
  },
  {
    type: "card",
    avatar: false,
    img: "img/facebook_logo.png",
    icon: "mdi-home",
    title: "I AM A CARD",
    subtitle: "subtitle",
    content: lorem + lorem,
    actions: [
      {
        name: "Try it",
        link: "",
      },
      {
        name: "Demo",
        link: "",
      },
    ],
  },
  {
    type: "youtube",
    link: "https://www.youtube.com/embed/rpQhIdRwNMA",
  },
];

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
    page: "Books",
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

          while (store.state.sourcesFetchStatus.fetching) {
            await delay(0.5);
          }
          
          await this.retrieveBooks()
        },
        methods: {
          retrieveBooks: async function () {
            this.posts = [];

            // var books = await this.bookList();

            // if (books.length > 0) {

            //   var recommendedBooks = await this.randomBookList(5);

            //   console.log(recommendedBooks)
            //   this.posts.push({
            //     type: "heading",
            //     level: 3,
            //     content: "Recommended"
            //   })
            //   this.posts.push({
            //     type: "books-recommended",
            //     items: recommendedBooks
            //   })
            // } else {
            //   this.posts = [
            //     {
            //       type: "paragraph",
            //       alignment: "center",
            //       content: "No Data"                  
            //     },
            //     {
            //       type: "reload"
            //     }
            //   ]
            // }
            
          },
          bookList: async function(){
            // var links = getLinksFromSource(sources, "books");
            // var data = getDataFromLinks(links, "link");
            // await delay(0.1);
            // return data;
          },
          randomBookList: async function(show = 10){
            var books = await this.bookList()
            return shuffleArray(books).slice(0,show)
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
          changeDocTitle("Video Categories");
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
                  level: 1,
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
          changeDocTitle("Video Playlists");
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
                level: 1,
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
                    level: 1,
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
                level: 1,
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
