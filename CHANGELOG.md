## 3.0.0 (2020-03-11)

-   docs(readme): add step to generate api docs ([620aa3e](https://github.com/Fdawgs/doc-conversion-service/commit/620aa3e))
-   docs(readme): clarify pm2 usage ([3bfdf68](https://github.com/Fdawgs/doc-conversion-service/commit/3bfdf68))
-   docs(readme): correct doc path ([49cc8d9](https://github.com/Fdawgs/doc-conversion-service/commit/49cc8d9))
-   docs(routes): add apidoc tags to html route ([805992f](https://github.com/Fdawgs/doc-conversion-service/commit/805992f))
-   docs(routes): add fhir/documentreference route api docs ([8c6e928](https://github.com/Fdawgs/doc-conversion-service/commit/8c6e928))
-   chore(config): add sanitize config for fhir/binary route ([3c86121](https://github.com/Fdawgs/doc-conversion-service/commit/3c86121))
-   chore(deps-dev): bump eslint-plugin-jest from 23.8.1 to 23.8.2 ([4e53f7f](https://github.com/Fdawgs/doc-conversion-service/commit/4e53f7f))
-   chore(deps): bump cross-env from 7.0.0 to 7.0.1 ([70c8584](https://github.com/Fdawgs/doc-conversion-service/commit/70c8584))
-   chore(deps): bump cross-env from 7.0.1 to 7.0.2 ([1a43905](https://github.com/Fdawgs/doc-conversion-service/commit/1a43905))
-   chore(deps): bump jsdom from 16.2.0 to 16.2.1 ([3cb8391](https://github.com/Fdawgs/doc-conversion-service/commit/3cb8391))
-   chore(deps): bump sanitize-middleware from 1.0.0 to 1.0.1 ([c4fc7e2](https://github.com/Fdawgs/doc-conversion-service/commit/c4fc7e2))
-   chore(deps): bump uuid from 7.0.1 to 7.0.2 ([0853db1](https://github.com/Fdawgs/doc-conversion-service/commit/0853db1))
-   chore(package): add apidoc config ([4994d04](https://github.com/Fdawgs/doc-conversion-service/commit/4994d04))
-   chore(package): change documentation route folder ([bed785d](https://github.com/Fdawgs/doc-conversion-service/commit/bed785d))
-   chore(routes): remove redundant sentence ([557885e](https://github.com/Fdawgs/doc-conversion-service/commit/557885e))
-   chore(routes): tidy route api docs ([a23ca7d](https://github.com/Fdawgs/doc-conversion-service/commit/a23ca7d))
-   chore(server): add missing comment ([428b320](https://github.com/Fdawgs/doc-conversion-service/commit/428b320))
-   feat(server): add docs route ([94ad69d](https://github.com/Fdawgs/doc-conversion-service/commit/94ad69d))
-   refactor(routes): split fhir route file into two ([f288d72](https://github.com/Fdawgs/doc-conversion-service/commit/f288d72))
-   build(deps): add apidoc ([1c1a6cf](https://github.com/Fdawgs/doc-conversion-service/commit/1c1a6cf))
-   build(deps): move cross-env to dev dependencies ([96303d3](https://github.com/Fdawgs/doc-conversion-service/commit/96303d3))
-   fix(routes): change html conversion route from put to post ([49ce491](https://github.com/Fdawgs/doc-conversion-service/commit/49ce491))

### BREAKING CHANGE

-   HTML conversion route changed to accept POST, not PUT requests as results are not idempotent

## <small>2.0.1 (2020-03-02)</small>

-   fix(middleware): resolve uuid deprecation warning ([7452352](https://github.com/Fdawgs/doc-conversion-service/commit/7452352))
-   refactor(middleware): move sanitization middleware to own module ([eb3e63e](https://github.com/Fdawgs/doc-conversion-service/commit/eb3e63e))
-   chore(deps-dev): bump eslint-plugin-jest from 23.8.0 to 23.8.1 ([1c15407](https://github.com/Fdawgs/doc-conversion-service/commit/1c15407))
-   chore(deps-dev): bump typescript from 3.8.2 to 3.8.3 ([a5a7e2a](https://github.com/Fdawgs/doc-conversion-service/commit/a5a7e2a))

## 2.0.0 (2020-02-28)

-   chore(config): Add `removealt`key to accepted_params object ([f8869fd](https://github.com/Fdawgs/doc-conversion-service/commit/f8869fd))
-   chore(config): remove redundant `fontsize`key from accepted_params object ([035cc14](https://github.com/Fdawgs/doc-conversion-service/commit/035cc14))
-   chore(config): Remove unused values ([1383eea](https://github.com/Fdawgs/doc-conversion-service/commit/1383eea))
-   tests(middleware): update tests for cleanCssMiddleware function ([c12c820](https://github.com/Fdawgs/doc-conversion-service/commit/c12c820))
-   tests(middleware): update tests for embedHtmlImagesMiddleware function ([7728b8d](https://github.com/Fdawgs/doc-conversion-service/commit/7728b8d))
-   refactor(middleware): remove `imageFormat` and `removeAltAtt` argument ([fedb2b3](https://github.com/Fdawgs/doc-conversion-service/commit/fedb2b3))
-   feat(middleware): font of output document defined by `fonts` option ([3ca3e88](https://github.com/Fdawgs/doc-conversion-service/commit/3ca3e88))

### BREAKING CHANGE

-   `fonts` and `fontSize` arguments removed from cleanCssMiddleware function.
-   `imageFormat` and `removeAltAtt` arguments removed from emedHtmlImagesMiddleware function. Option to remove alt attribute from img tags now toggled by `removealt` query option.

## <small>1.5.1 (2020-02-27)</small>

-   fix(middleware): add document language ([69c3a94](https://github.com/Fdawgs/doc-conversion-service/commit/69c3a94))
-   fix(middleware): add regexp to remove orphaned comment tags ([b0d4977](https://github.com/Fdawgs/doc-conversion-service/commit/b0d4977))
-   fix(middleware): add step to remove style type ([85f1ae3](https://github.com/Fdawgs/doc-conversion-service/commit/85f1ae3))
-   fix(middleware): remove check for style type as it is optional attr ([39b502a](https://github.com/Fdawgs/doc-conversion-service/commit/39b502a))
-   fix(middleware): remove excess meta and title tags genned by poppler ([a4c9f49](https://github.com/Fdawgs/doc-conversion-service/commit/a4c9f49))
-   fix(middleware): remove illegal space from src element of image ([821a674](https://github.com/Fdawgs/doc-conversion-service/commit/821a674))
-   fix(middleware): resolve uuid deprecation warning ([e2b4b13](https://github.com/Fdawgs/doc-conversion-service/commit/e2b4b13))
-   fix(routes): add doctype to outbound html ([7372ba6](https://github.com/Fdawgs/doc-conversion-service/commit/7372ba6))
-   chore(config): remove redundant config value ([b32a2a4](https://github.com/Fdawgs/doc-conversion-service/commit/b32a2a4))

## 1.5.0 (2020-02-26)

-   chore(deps): bump uuid from 7.0.0 to 7.0.1 ([7e66d00](https://github.com/Fdawgs/doc-conversion-service/commit/7e66d00))
-   chore(deps): remove redundant winser dependency ([3722379](https://github.com/Fdawgs/doc-conversion-service/commit/3722379))
-   chore(package): remove winser scripts ([39510e5](https://github.com/Fdawgs/doc-conversion-service/commit/39510e5))
-   docs(readme): add pm2 windows service steps ([6ed6b4e](https://github.com/Fdawgs/doc-conversion-service/commit/6ed6b4e))
-   refactor(middleware): return entire error rather than just message ([a0db147](https://github.com/Fdawgs/doc-conversion-service/commit/a0db147))
-   feat(server): add basic error handling ([32c49fa](https://github.com/Fdawgs/doc-conversion-service/commit/32c49fa))

## 1.4.0 (2020-02-25)

-   chore: convert pm2 config file from yml to js ([6ecb8a6](https://github.com/Fdawgs/doc-conversion-service/commit/6ecb8a6))
-   chore(config): add additional required params for fhir docref endpoint ([2e48337](https://github.com/Fdawgs/doc-conversion-service/commit/2e48337))
-   chore(deps-dev): bump eslint-plugin-jest from 23.7.0 to 23.8.0 ([beb2d4e](https://github.com/Fdawgs/doc-conversion-service/commit/beb2d4e))
-   chore(deps): bump helmet from 3.21.2 to 3.21.3 ([7e68b0b](https://github.com/Fdawgs/doc-conversion-service/commit/7e68b0b))
-   chore(deps): bump node-poppler from 1.5.0 to 1.5.1 ([ada162c](https://github.com/Fdawgs/doc-conversion-service/commit/ada162c))
-   chore(deps): bump sanitize-html from 1.21.1 to 1.22.0 ([11193f9](https://github.com/Fdawgs/doc-conversion-service/commit/11193f9))
-   chore(deps): bump uuid from 3.4.0 to 7.0.0 ([3fbd77e](https://github.com/Fdawgs/doc-conversion-service/commit/3fbd77e))
-   tests(middleware): add basic test for fhir docref middleware ([12094df](https://github.com/Fdawgs/doc-conversion-service/commit/12094df))
-   tests(middleware): add basic tests for fhir binary middleware ([9fdf338](https://github.com/Fdawgs/doc-conversion-service/commit/9fdf338))
-   tests(middleware): extend fhir binary middleware tests ([be0e0f4](https://github.com/Fdawgs/doc-conversion-service/commit/be0e0f4))
-   tests(middleware): update sanitize middleware tests ([3ffed7b](https://github.com/Fdawgs/doc-conversion-service/commit/3ffed7b))
-   tests(middleware): use http mock requests ([be7d0b4](https://github.com/Fdawgs/doc-conversion-service/commit/be7d0b4))
-   fix(middleware): convert moment object to native date object ([d8af872](https://github.com/Fdawgs/doc-conversion-service/commit/d8af872))
-   fix(middleware): resolve err_http_headers_sent output ([1d2b369](https://github.com/Fdawgs/doc-conversion-service/commit/1d2b369))
-   feat(middleware): add validation and deriving to sanitize middleware ([96d8f3a](https://github.com/Fdawgs/doc-conversion-service/commit/96d8f3a))
-   refactor(middleware): add check for type value ([36b69a4](https://github.com/Fdawgs/doc-conversion-service/commit/36b69a4))
-   refactor(middleware): merge sanitize and param-check middleware ([56f5ef5](https://github.com/Fdawgs/doc-conversion-service/commit/56f5ef5))

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
