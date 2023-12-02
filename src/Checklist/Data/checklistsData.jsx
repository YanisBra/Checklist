const checklistsData = [
  {
    title: "Liste de Courses",
    description: "Les courses à faire cette semaine",
    id: 1,
    tasks: [
      { task: "Acheter du lait", done: false },
      { task: "Acheter des œufs", done: true },
      { task: "Acheter du pain", done: false },
    ],
    get taskDone() {
      return this.tasks.filter((task) => task.done).length;
    },
    get nbTask() {
      return this.tasks.length;
    },
  },
  {
    title: "Entraînement Sportif",
    description: "Routine d'entraînement pour la semaine",
    id: 2,
    tasks: [
      { task: "Course à pied", done: true },
      { task: "Exercices de musculation", done: false },
      { task: "Yoga", done: true },
    ],
    get taskDone() {
      return this.tasks.filter((task) => task.done).length;
    },
    get nbTask() {
      return this.tasks.length;
    },
  },
  {
    title: "Liste de Cuisine",
    description: "Recettes à essayer cette semaine",
    id: 3,
    tasks: [
      { task: "Faire une pizza maison", done: false },
      { task: "Essayer une nouvelle recette de pâtes", done: true },
      { task: "Préparer des cookies", done: false },
      { task: "Cuisiner un plat végétarien", done: true },
    ],
    get taskDone() {
      return this.tasks.filter((task) => task.done).length;
    },
    get nbTask() {
      return this.tasks.length;
    },
  },
  {
    title: "Projet DIY",
    description: "Projets de bricolage à réaliser",
    id: 4,
    tasks: [
      { task: "Fabriquer une étagère", done: true },
      { task: "Créer des décorations murales", done: false },
      { task: "Assembler un meuble", done: true },
    ],
    get taskDone() {
      return this.tasks.filter((task) => task.done).length;
    },
    get nbTask() {
      return this.tasks.length;
    },
  },
  {
    title: "Liste de Lecture",
    description: "Livres à lire ce mois-ci",
    id: 5,
    tasks: [
      { task: "Lire '1984' de George Orwell", done: false },
      { task: "Commencer 'Le Seigneur des Anneaux'", done: false },
      { task: "Terminer 'Dune' de Frank Herbert", done: true },
      { task: "Explorer des nouvelles œuvres de science-fiction", done: true },
    ],
    get taskDone() {
      return this.tasks.filter((task) => task.done).length;
    },
    get nbTask() {
      return this.tasks.length;
    },
  },
];

export default checklistsData;
