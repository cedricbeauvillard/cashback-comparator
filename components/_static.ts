export const rankingIcons = [
  '/ranking/medaille-or-classement-cashback.webp',
  '/ranking/medaille-argent-classement-cashback.webp',
  '/ranking/medaille-bronze-classement-cashback.webp',
  '/ranking/4eme.webp',
  '/ranking/5eme.webp',
  '/ranking/6eme.webp',
  '/ranking/7eme.webp',
  '/ranking/8eme.webp',
  '/ranking/9eme.webp',
  '/ranking/10eme.webp',
];

export type ImportResults = {
  totalOperations: number;
  totalSuccess: number;
  add: {
    ADD_SUCCESS: number;
    // INVALID ARGUMENTS
    ADD_400: number;
    // RIGHTS OR PRISMA ERROR
    ADD_403: number;
    // SELLER ALREADY EXISTS
    ADD_409: number;
    // INTERNAL SERVER ERROR
    ADD_500: number;
  };
  edit: {
    EDIT_SUCCESS: number;
    // INVALID ARGUMENTS
    EDIT_400: number;
    // RIGHTS OR PRISMA ERROR
    EDIT_403: number;
    // SELLER NOT FOUND
    EDIT_404: number;
    // INTERNAL SERVER ERROR
    EDIT_500: number;
  };
  remove: {
    REMOVE_SUCCESS: number;
    // INVALID ARGUMENTS
    REMOVE_400: number;
    // RIGHTS OR PRISMA ERROR
    REMOVE_403: number;
    // SELLER NOT FOUND
    REMOVE_404: number;
    // INTERNAL SERVER ERROR
    REMOVE_500: number;
  };
};

export const defaultResults: ImportResults = {
  totalOperations: 0,
  totalSuccess: 0,
  add: {
    ADD_SUCCESS: 0,
    ADD_400: 0,
    ADD_403: 0,
    ADD_409: 0,
    ADD_500: 0,
  },
  edit: {
    EDIT_SUCCESS: 0,
    EDIT_400: 0,
    EDIT_403: 0,
    EDIT_404: 0,
    EDIT_500: 0,
  },
  remove: {
    REMOVE_SUCCESS: 0,
    REMOVE_400: 0,
    REMOVE_403: 0,
    REMOVE_404: 0,
    REMOVE_500: 0,
  },
};

export const footerData = [
  {
    title: 'Pages',
    links: [
      {
        label: 'Accueil',
        link: '/',
      },
      {
        label: 'Meilleurs sites de cashback',
        link: '/cashbackers',
      },
      {
        label: 'Liste des marchands',
        link: '/sellers',
      },
      {
        label: 'Top marchands',
        link: '/topsellers',
      },
    ],
  },
  {
    title: 'Info',
    links: [
      {
        label: 'Contact',
        link: '/contact',
      },
      {
        label: 'Mentions légales',
        link: '/cgu',
      },
    ],
  },
];
