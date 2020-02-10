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
