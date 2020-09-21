const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto labore debitis suscipit esse, consectetur cum, vitae laborum aliquid facilis nam a accusantium perspiciatis maxime illo voluptate, dolorum numquam assumenda ducimus."
const sample_yte = '<iframe width="560" height="315" src="https://www.youtube.com/embed/rpQhIdRwNMA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

const sources = [
	{
		name: "books",
		links:[
			"api/bookshelf.json",
			"https://eru123.github.io/api/bookshelf.json"
		]
	},
	{
		name: "videos",
		links:[
			"api/videos.json",
			"https://eru123.github.io/api/videos.json"
		]
	},
	{
		name: "articles",
		links:[
			"api/articles.json",
			"https://eru123.github.io/api/articles.json"
		]
	},
	{
		name: "announcements",
		links:[
			"api/announcements.json",
			"https://eru123.github.io/api/announcements.json"
		]
	},
	{

	}
]

const sample_posts = [
	{
		type: "heading",
		level: 1,
		content: "Heading 1"
	},
	{
		type: "heading",
		level: 2,
		content: "Heading 2"
	},
	{
		type: "heading",
		level: 3,
		content: "Heading 3"
	},
	{
		type: "heading",
		level: 4,
		content: "Heading 4"
	},
	{
		type: "heading",
		level: 5,
		content: "Heading 5"
	},
	{
		type: "heading",
		level: 6,
		content: "Heading 6"
	},
	{
		type: "paragraph",
		alignment: "left",
		content: "left paragraph - " + lorem + lorem
	},
	{
		type: "paragraph",
		alignment: "center",
		content: "center paragraph - " + lorem + lorem
	},
	{
		type: "paragraph",
		alignment: "right",
		content: "right paragraph - " + lorem + lorem
	},
	{
		type: "paragraph",
		alignment: "justify",
		content: "justify paragraph - " + lorem + lorem
	},
	{
		type: "carousel",
		items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
	},
	{
		type: "card",
		avatar: false,
		img:"img/facebook_logo.png",
		icon:"mdi-home",
		title: "I AM A CARD",
		subtitle: "subtitle",
		content: lorem + lorem,
		actions: [
			{
				name: "Try it",
				link: ""
			},
			{
				name: "Demo",
				link: ""
			}
		]
	},
	{
		type: "youtube",
		link: "https://www.youtube.com/embed/rpQhIdRwNMA"
	}
];

const app_data = [
	{ 	
		route : {
			name : "Default",
			path: "",
			redirect : "/home"
		}
	},	
	{
		page : "Home",
		icon : "mdi-home",
		route : {
			name : "Home",
			path : "/home",
			component : {
				template: "#xdata",
				data(){
					return {
						posts: []
					}
				},
				created(){
					changeDocTitle("Red Mantis")
				}
			}
		}
	},
	{
		page: "Books",
		route : {
			name : "Books",
			path : "/books",
			component : {
				template: "#xdata",
				data(){
					return {
						posts: []
					}
				},
				created(){
					changeDocTitle("Books")
				}
			}
		}
	},
	{
		page: "Videos",
		route : {
			name : "Videos",
			path : "/videos",
			component : {
				template: "#xdata",
				data(){
					return {
						posts: []
					}
				},
				created(){
					changeDocTitle("Videos")
				}
			}
		}
	},
	{
		page: "About",
		route : {
			name : "About",
			icon: "mdi-info",
			path : "/about",
			component : {
				template: "#xdata",
				data(){
					return {
						posts: [
							{
								type: "heading",
								level: 1,
								content: "Red Mantis"
							},
							{
								type: "paragraph",
								alignment: "justify",
								content: "A free and open-source platform that provides collection of Web Services, Informations, Videos, Books and Entertainments. Our mission is to give free and reliable information and expand the open-source community to help everyone in their careers specially students and self-taught developers."
							}
						]
					}
				},
				created(){
					changeDocTitle("About")
				}
			}
		}
	},
	{
		page: "Contact us",
		icon: "mdi-email",
		route: {
			name: "ContactUs",
			path: "/contactus",
			component: {
				template: "#xdata",
				data(){
					return {
						posts: [
							{
								type: "heading",
								level: 1,
								content: "Contact us on"
							},
							{
								type: "card",
								avatar: true,
								my: 4,
								img:"img/facebook_logo.png",
								title: "Facebook",
								subtitle: "@lighty262"
							},
							{
								type: "card",
								avatar: true,
								my: 4,
								img:"img/instagram_logo.png",
								title: "Instagram",
								subtitle: "@yeoligo123"
							},
							{
								type: "card",
								avatar: true,
								my: 4,
								img:"img/github_logo.png",
								title: "Github",
								subtitle: "@eru123"
							},
							{
								type: "card",
								avatar: true,
								my: 4,
								img:"img/gmail_logo.png",
								title: "Gmail",
								subtitle: "yeoligoakino@gmail.com"
							},
							{
								type: "card",
								avatar: true,
								my: 4,
								icon: "mdi-phone",
								title: "Phone",
								subtitle: "(+63) 936 852 3483"
							},
						]
					}
				},
				created(){
					changeDocTitle("Red Mantis")
				}
			}
		}
	},
	{
		page: "Donate",
		icon: "mdi-heart",
		route: {
			name: "Donate",
			path: "/donate",
			component: {
				template: "#xdata",
				data(){
					return {
						posts: [
							{
								type: "heading",
								level: 1,
								content: "Send Coffee on"
							},
							{
								type: "card",
								avatar: true,
								my: 4,
								img:"img/patreon_logo.png",
								title: "Patreon",
								subtitle: "patreon.com/JAquino"
							},
							{
								type: "card",
								avatar: true,
								my: 4,
								img:"img/paypal_logo.png",
								title: "PayPal",
								subtitle: "paypal.me/ja1030"
							}
						]
					}
				},
				created(){
					changeDocTitle("Red Mantis")
				}
			}
		}
	}
]