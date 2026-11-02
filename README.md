# news-JS

Run application:

-   Copy and rename `.env.example` to `.env` and set variables with your data
-   Install dependencies by running command `npm install` in your terminal
-   Run command in your terminal `npm start`

Scripts:

-   `npm run lint` - ESLint check for TypeScript files
-   `npm run typecheck` - TypeScript check without emitting files
-   `npm run build` - production build into `dist`
-   `npm run deploy` - build and publish `dist` to the `gh-pages` branch

News API accepts requests from `localhost` only. For the deployed version set `API_URL` in `.env` to the proxy `https://rss-news-api.onrender.com/` before running `npm run deploy`. To avoid exhausting the API key limit during development, use `https://rss-news-api.onrender.com/mocks/` as `API_URL`.
