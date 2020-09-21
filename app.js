const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto labore debitis suscipit esse, consectetur cum, vitae laborum aliquid facilis nam a accusantium perspiciatis maxime illo voluptate, dolorum numquam assumenda ducimus."

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
						posts: sample_posts
					}
				},
				created(){
					changeDocTitle("Red Mantis")
				}
			}
		}
	},
	{
		page : "About",
		route : {
			name : "About",
			path : "/about",
			component : {
				template: "#xdata",
				data(){
					return {
						posts: sample_posts
					}
				},
				created(){
					changeDocTitle("About")
				}
			}
		}
	}
]