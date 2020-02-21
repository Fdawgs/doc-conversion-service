## 1.3.0 (2020-02-21)

-   docs(middleware): add JSDoc tags ([1923e2d](https://github.com/Fdawgs/doc-conversion-service/commit/1923e2d))
-   docs(middleware): fix jsdoc param tag ([58fdacd](https://github.com/Fdawgs/doc-conversion-service/commit/58fdacd))
-   docs(readme): add install steps for pm2 ([b21c568](https://github.com/Fdawgs/doc-conversion-service/commit/b21c568))
-   chore: add pm2 config file ([e1a7ba8](https://github.com/Fdawgs/doc-conversion-service/commit/e1a7ba8))
-   chore(config): add accept params ([0e3d4e7](https://github.com/Fdawgs/doc-conversion-service/commit/0e3d4e7))
-   chore(deps-dev): bump eslint-plugin-json from 2.0.1 to 2.1.0 ([00944a8](https://github.com/Fdawgs/doc-conversion-service/commit/00944a8))
-   chore(deps-dev): bump typescript from 3.7.5 to 3.8.2 ([dd84433](https://github.com/Fdawgs/doc-conversion-service/commit/dd84433))
-   chore(deps): bump express-winston from 4.0.2 to 4.0.3 ([9ec8a85](https://github.com/Fdawgs/doc-conversion-service/commit/9ec8a85))
-   chore(deps): bump jsdom from 16.1.0 to 16.2.0 ([b0f6a2c](https://github.com/Fdawgs/doc-conversion-service/commit/b0f6a2c))
-   chore(middleware): remove redundant eslint comment ([dfa7e90](https://github.com/Fdawgs/doc-conversion-service/commit/dfa7e90))
-   chore(middleware): update JSDoc tags ([4ce3517](https://github.com/Fdawgs/doc-conversion-service/commit/4ce3517))
-   chore(routes): add sanitize middleware ([142228c](https://github.com/Fdawgs/doc-conversion-service/commit/142228c))
-   chore(routes): rename win1252 middleware variable ([2e608e2](https://github.com/Fdawgs/doc-conversion-service/commit/2e608e2))
-   chore(routes): update JSDoc tags ([7478234](https://github.com/Fdawgs/doc-conversion-service/commit/7478234))
-   chore(routes): update JSDoc tags ([8b15854](https://github.com/Fdawgs/doc-conversion-service/commit/8b15854))
-   chore(server): alphabetically sort import routes ([f6af209](https://github.com/Fdawgs/doc-conversion-service/commit/f6af209))
-   style(middleware): alphabetically sort imports ([592a209](https://github.com/Fdawgs/doc-conversion-service/commit/592a209))
-   style(server): alphabetically sort imports ([bebfc6c](https://github.com/Fdawgs/doc-conversion-service/commit/bebfc6c))
-   fix(middleware): resolve err_http_headers_sent output ([f76ae39](https://github.com/Fdawgs/doc-conversion-service/commit/f76ae39))
-   refactor(middleware): make config params optional ([27332ac](https://github.com/Fdawgs/doc-conversion-service/commit/27332ac))
-   refactor(middleware): replace contents middleware with dep function ([563853d](https://github.com/Fdawgs/doc-conversion-service/commit/563853d))
-   refactor(routes): use route function ([46931f0](https://github.com/Fdawgs/doc-conversion-service/commit/46931f0))
-   feat(middleware): add sanitization middleware ([78820ec](https://github.com/Fdawgs/doc-conversion-service/commit/78820ec))
-   feat(routes): add sanitize and passport middleware to all routes ([ac96dd2](https://github.com/Fdawgs/doc-conversion-service/commit/ac96dd2))
-   tests(middleware): add sanitization middleware tests ([caacd39](https://github.com/Fdawgs/doc-conversion-service/commit/caacd39))
-   tests(middleware): increase coverage for sanitization middleware ([f9b0fee](https://github.com/Fdawgs/doc-conversion-service/commit/f9b0fee))
-   tests(middleware): update sanitize middleware tests ([94fb690](https://github.com/Fdawgs/doc-conversion-service/commit/94fb690))
-   tests(middleware): update tests to use mock response function ([50ce136](https://github.com/Fdawgs/doc-conversion-service/commit/50ce136))

## <small>1.2.1 (2020-02-10)</small>

-   fix(routes): add passport middleware to routes ([4c2fa95](https://github.com/Fdawgs/doc-conversion-service/commit/4c2fa95))
-   fix(server): correct middleware name ([7eaaee0](https://github.com/Fdawgs/doc-conversion-service/commit/7eaaee0))

## 1.2.0 (2020-02-10)

-   chore: tidy files ([f598f9a](https://github.com/Fdawgs/doc-conversion-service/commit/f598f9a))
-   chore(config): tidy in-line comment ([99d42aa](https://github.com/Fdawgs/doc-conversion-service/commit/99d42aa))
-   feat(server): use passportjs middleware for authentication ([f929b7b](https://github.com/Fdawgs/doc-conversion-service/commit/f929b7b))
-   tests(middleware): add param-check middleware tests ([cc58fc7](https://github.com/Fdawgs/doc-conversion-service/commit/cc58fc7))
-   tests(server): add server tests ([f1fa720](https://github.com/Fdawgs/doc-conversion-service/commit/f1fa720))
-   refactor(server): rename enableRoutes function to configureRoutes ([9f32692](https://github.com/Fdawgs/doc-conversion-service/commit/9f32692))

### BREAKING CHANGE

-   `authConfig` object has been removed from config file, contents moved to `serverConfig.auth.apiKeys`

## 1.1.0 (2020-02-10)

-   docs: add prerequisites, contributing, and license sections ([e9e4362](https://github.com/Fdawgs/doc-conversion-service/commit/e9e4362))
-   docs: correct Dependabot URI path ([72dfb90](https://github.com/Fdawgs/doc-conversion-service/commit/72dfb90))
-   docs(readme): add deployment section ([38cb494](https://github.com/Fdawgs/doc-conversion-service/commit/38cb494))
-   refactor(server): remove port param from listen function ([abff4c7](https://github.com/Fdawgs/doc-conversion-service/commit/abff4c7))
-   refactor(server): use name key value from package.json ([8da4f79](https://github.com/Fdawgs/doc-conversion-service/commit/8da4f79))
-   feat(server): add winston logging ([21dc19e](https://github.com/Fdawgs/doc-conversion-service/commit/21dc19e))
-   chore: add changelog gen script ([691282d](https://github.com/Fdawgs/doc-conversion-service/commit/691282d))
-   chore: add prettierignore file ([c210b74](https://github.com/Fdawgs/doc-conversion-service/commit/c210b74))
-   chore: add winser scripts ([ac69dc3](https://github.com/Fdawgs/doc-conversion-service/commit/ac69dc3))
-   chore(config): set x-frame-options to deny ([7f20da4](https://github.com/Fdawgs/doc-conversion-service/commit/7f20da4))
-   chore(deps-dev): bump eslint-config-prettier from 6.9.0 to 6.10.0 ([69a0830](https://github.com/Fdawgs/doc-conversion-service/commit/69a0830))
-   chore(deps-dev): bump eslint-plugin-import from 2.20.0 to 2.20.1 ([bba2776](https://github.com/Fdawgs/doc-conversion-service/commit/bba2776))
-   chore(deps-dev): bump eslint-plugin-jest from 23.6.0 to 23.7.0 ([53d791c](https://github.com/Fdawgs/doc-conversion-service/commit/53d791c))
-   chore(deps-dev): bump jest from 24.9.0 to 25.1.0 ([8a9c4e6](https://github.com/Fdawgs/doc-conversion-service/commit/8a9c4e6))
-   chore(deps): bump jsdom from 16.0.1 to 16.1.0 ([6655acc](https://github.com/Fdawgs/doc-conversion-service/commit/6655acc))
-   perf: set node_env variables for test, dev and production ([2cee1cd](https://github.com/Fdawgs/doc-conversion-service/commit/2cee1cd))
-   style: remove excess whitespace ([eb1ba13](https://github.com/Fdawgs/doc-conversion-service/commit/eb1ba13))
-   ci(travis): fix build config ([6d6a10f](https://github.com/Fdawgs/doc-conversion-service/commit/6d6a10f))

### BREAKING CHANGE

-   `port` param for listen function of Server class removed. Added ability for listen function to use env port
