export const STATIC_ROUTES = [
    { path: '/', file: 'src/pages/employers.tsx' },
    { path: '/employers/portfolio', file: 'src/pages/portfolio.tsx' },
    { path: '/spreadsheet-automation', file: 'src/pages/spreadsheet-automation.tsx' },
    { path: '/software-on-demand', file: 'src/pages/software-on-demand.tsx' },
];

export const STATIC_PATHS = STATIC_ROUTES.map(route => route.path);
