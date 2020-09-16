const cfg = {
  packageName: "com.skidd.redmantis",
  appName: "Red Mantis",
  appItemIcon: "img/app_item_default.png",
  gameItemIcon: "img/game_item_default.png",
  version: "0.0.1-alpha",
  copyright: "MIT LICENCE SKIDD@2020",
  description:"A collections of free games and applications for entertainment, education, and online services that can give you points to exchange great rewards. This project is pure experimental and free to use with the intention to endorse or showcase the developer's skill in terms of web development. This also serves as my contribution to my country Philippines.",
  contacts: [
    {
      img: "img/facebook_logo.png",
      title: "facebook.com/lighty262",
    },
    {
      img: "img/github_logo.png",
      title: "github.com/eru123",
    },
    {
      img: "img/gmail_logo.png",
      link: "mailto:yeoligoakino@gmail.com",
      title: "yeoligoakino@gmail.com",
    },
  ],
  apps: [
    { 
      title: "Cryptography",
      icon: "img/cryptography_logo.png",
      description:
        "Encrypt and Decrypt secret message to make information invisible to others",
      link: { name: "AppCryptography" },
      back: { name: "Apps" },
    },
    {
      title: "Binary Calculator",
      icon: "img/cryptography_logo.png",
      description: "Teaches and Helps you calculating binary numbers",
      link: { name: "AppBinaryCalculator" },
      back: { name: "Apps" },
    },
  ],
  games: [
    {
      title: "Math Saya",
      icon: "img/mathsaya_logo.jpeg",
      description:
        "Mag-aral at matuto ng Matematika habang nagpapalipas ng oras habang nagsasaya sa Math Saya. This game has 3 mode of difficulties and each has a specific time limit.",
      link: { name: "GameMathsaya" },
      back: { name: "Games" },
    },
    {
      title: "Sudoku ",
      icon: "img/sudoku_logo.jpeg",
      description:
        "Maglaro at matuto gamit ang classic sudoku app. This game consists of 3 modes to play with set difficulties. One of the all time favorite game in early nineties of our grand fathers in the tabloid every morning.",
      link: { name: "GameSudoku" },
      back: { name: "Games" },
    },
    {
      title: "Jack & Poy",
      icon: "img/jacknpoy_logo.jpeg",
      description:
        "Maglaro ng classic pinoy game Jack & Poy. This game is a one of the filipino most played games in their childhood, even elders play this game with bets for the winner.",
      link: { name: "GameJacknpoy" },
      back: { name: "Games" },
    },
  ],
  sidebarItems: [
    {
      name: "Home",
      title: "Red",
      link: { name: "Home" },
    },
    {
      name: "Apps",
      link: { name: "Apps" },
    },
    {
      name: "Games",
      link: { name: "Games" },
    },
    {
      name: "About",
      link: { name: "About" },
    },
  ],
  posts: [
    {
      type: "announcement",
      title: "Welcome",
      content: "Thank you for using our service, this app is only a demo version which will be the container for my future web applications. Currently i am researching for differents methods on how to can integrate web apps and web games using this wrapper and using only the front-end javascript programming language and to not depends on technologies like deno and node.js, this will be not just a web app wrapper but also a web framework and a game engine that follows the wrapper's algorithm."
    }
  ]
};

const AppComponents = {
  Mathsaya: {
    template: "#app_uc"
  },
  Sudoku: {
    template: "#app_uc"
  },
  Jacknpoy: {
    template: "#app_uc"
  },
  Cryptography: {
    template: "#app_uc"
  },
  BinaryCalculator: {
    template: "#app_uc"
  },
};

routesExt = [
  {
    name: "GameMathsaya",
    path: "/game/mathsaya",
    component: AppComponents.Mathsaya,
  },
  {
    name: "GameSudoku",
    path: "/game/sudoku",
    component: AppComponents.Sudoku,
  },
  {
    name: "GameJacknpoy",
    path: "/game/jacknpoy",
    component: AppComponents.Jacknpoy,
  },
  {
    name: "AppCryptography",
    path: "/game/cryptography",
    component: AppComponents.Cryptography,
  },
  {
    name: "AppBinaryCalculator",
    path: "/game/binarycalculator",
    component: AppComponents.BinaryCalculator,
  },
];
