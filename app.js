const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto labore debitis suscipit esse, consectetur cum, vitae laborum aliquid facilis nam a accusantium perspiciatis maxime illo voluptate, dolorum numquam assumenda ducimus.";
const sample_yte =
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/rpQhIdRwNMA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

const sources = [
  {
    name: "books",
    links: [
      // "api/bookshelf.json",
      "https://eru123.github.io/api/bookshelf.json",
    ],
  },
  {
    name: "videos",
    links: [
      // "api/videos.json", 
      "https://eru123.github.io/api/videos.json"
    ],
  },
  {
    name: "articles",
    links: [
      // "api/articles.json", 
      "https://eru123.github.io/api/articles.json"
    ],
  },
  {
    name: "announcements",
    links: [
      // "api/announcements.json",
      "https://eru123.github.io/api/announcements.json",
    ],
  },
  {
    name: "reddit",
    links: [
      "https://www.reddit.com/r/PampamilyangPaoLUL.json",
      "https://www.reddit.com/r/goodanimemes.json",
      "https://www.reddit.com/r/Animemes.json",
      "https://www.reddit.com/r/goodanimememes.json",
      "https://www.reddit.com/r/ProgrammerHumor.json",
      "https://www.reddit.com/r/programmingmemes.json",
      "https://www.reddit.com/r/wholesomememes.json",
      "https://www.reddit.com/r/ComedyCemetery.json",
      "https://www.reddit.com/r/sadcringe.json",
      "https://www.reddit.com/r/terriblefacebookmemes.json",
      "https://www.reddit.com/r/im14andthisisdeep.json",
      "https://www.reddit.com/r/pewdiepie.json",
      "https://www.reddit.com/r/PewdiepieSubmissions.json",
      "https://www.reddit.com/r/meme.json",
      "https://www.reddit.com/r/memes.json",
      "https://www.reddit.com/r/dankmemes.json",
      "https://www.reddit.com/r/redditmoment.json",
      "https://www.reddit.com/r/bestmemes.json",
      "https://www.reddit.com/r/Cringetopia.json",
      "https://www.reddit.com/r/ForShub.json",
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
            posts: [],
          };
        },
        created() {
          changeDocTitle("Books");
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

          while (store.state.sourcesFetchStatus.fetching) {
            await delay(0.5);
          }

          this.retrieveCategories();
        },
        methods: {
          retrieveCategories: async function () {
            this.posts = [];

            var links = getLinksFromSource(sources, "videos");
            var data = getDataFromLinks(links, "id");
            await delay(0.1);
            if (data.length > 0) {
              this.posts = [
                {
                  type: "heading",
                  level: 1,
                  content: "Categories",
                },
                {
                  type: "videos-categories",
                  items: data,
                },
              ];
            } else {
              this.posts = [
                {
                  type: "paragraph",
                  alignment: "center",
                  content: "No video categories fetched.",
                },
                {
                  type: "reload",
                },
              ];
            }
          },
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
          while (store.state.sourcesFetchStatus.fetching) {
            await delay(0.5);
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

            var links = getLinksFromSource(sources, "videos");
            var data = getDataFromLinks(links, "id");
            await delay(0.1);
            if (data.length > 0) {
              data.forEach((x) => {
                if (x.id == this.$route.params.category) {
                  if (x.childs && x.childs.length > 0) {
                    console.log(x.childs);
                    this.posts.push({
                      type: "videos-playlists",
                      items: x.childs,
                    });
                  } else {
                    this.posts.push({
                      type: "paragraph",
                      alignment: "left",
                      content: "No Playlists",
                    });
                    this.posts.push({
                      type: "reload",
                    });
                  }
                }
              });
            } else {
              this.posts.push({
                type: "paragraph",
                alignment: "left",
                content: "No Playlists",
              });
              this.posts.push({
                type: "reload",
              });
            }
          },
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
            posts: [
              {
                type: "loading",
              },
            ],
          };
        },
        created: async function () {
          changeDocTitle("Memes");
          while (store.state.sourcesFetchStatus.fetching) {
            await delay(0.5);
          }
          this.refreshMemes();
        },
        methods: {
          refreshMemes: async function () {
            this.posts = [];
            var reddit = [];
            var memesCounter = 0;
            await sources.forEach(async (source) => {
              if (source.name == "reddit") {
                var rtd = [];
                await source.links.forEach(async (link) => {
                  var xdta = await idbKeyval.get(link);
                  if (typeof xdta == "object") {
                    var xdtb = [];
                    await xdta.data.children.forEach(async (xChild) => {
                      var title = xChild.data.title || null;
                      var subtitle = xChild.data.subreddit || null;
                      var imageUrl = xChild.data.url_overridden_by_dest || null;
                      var content = xChild.data.selftext || null;
                      if (imageChecker(imageUrl)) {
                        await xdtb.push({
                          type: "card",
                          title: xChild.data.title || null,
                          subtitle: xChild.data.subreddit || null,
                          imageUrl: xChild.data.url_overridden_by_dest || null,
                          content: xChild.data.selftext || null,
                        });
                      }
                    });

                    await rtd.push(xdtb);
                    memesCounter = memesCounter + xdtb.length;
                  }
                });
                await delay(0.2);
                for (var i = 0; i < 30; i++) {
                  for (dt in rtd) {
                    if (rtd[dt][i]) {
                      reddit.push(rtd[dt][i]);
                    }
                  }
                }
                this.posts = reddit;
              }
            });
            await delay(0.3);
            console.log("[MEMES] " + memesCounter + " image links fetched.");
            if (this.posts.length == 0) {
              this.posts = [
                {
                  type: "paragraph",
                  alignment: "center",
                  content: "No data",
                },
                {
                  type: "reload",
                },
              ];
            }
          },
        },
      },
    },
  },
  {
    page: "About",
    icon: "mdi-alpha-a-circle",
    route: {
      name: "About",
      icon: "mdi-info",
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
  /*
  {
    page: "Contact us",
    icon: "mdi-email",
    route: {
      name: "ContactUs",
      path: "/contactus",
      component: {
        template: "#xdata",
        data() {
          return {
            posts: [
              {
                type: "heading",
                level: 1,
                content: "Contact us on",
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
                title: "Phone",
                subtitle: "(+63) 936 852 3483",
              },
            ],
          };
        },
        created() {
          changeDocTitle("Red Mantis");
        },
      },
    },
  },
  {
    page: "Donate",
    icon: "mdi-heart",
    route: {
      name: "Donate",
      path: "/donate",
      component: {
        template: "#xdata",
        data() {
          return {
            posts: [
              {
                type: "heading",
                level: 1,
                content: "Send Coffee on",
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
          changeDocTitle("Red Mantis");
        },
      },
    },
  },
  */
];
