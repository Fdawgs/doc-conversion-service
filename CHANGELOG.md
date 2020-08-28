## <small>6.0.2 (2020-08-28)</small>

-   build(deps-dev): add eslint-plugin-security dev dependency ([262a9b0](https://github.com/Fdawgs/doc-conversion-service/commit/262a9b0))
-   build(deps-dev): bump dev dependencies ([63cb778](https://github.com/Fdawgs/doc-conversion-service/commit/63cb778))
-   build(deps): bump apidoc from 0.24.0 to 0.25.0 ([27d8e87](https://github.com/Fdawgs/doc-conversion-service/commit/27d8e87))
-   build(deps): bump helmet from 4.0.0 to 4.1.0 ([bbfd9d6](https://github.com/Fdawgs/doc-conversion-service/commit/bbfd9d6))
-   build(deps): bump node-poppler from 1.8.2 to 1.8.3 ([86a02c9](https://github.com/Fdawgs/doc-conversion-service/commit/86a02c9))
-   build(deps): bump sanitize-middleware from 2.0.16 to 2.0.17 ([f000e62](https://github.com/Fdawgs/doc-conversion-service/commit/f000e62))
-   refactor(server): use address() for host and port logging ([b9827c4](https://github.com/Fdawgs/doc-conversion-service/commit/b9827c4))
-   chore: reduce minimum nodejs engine version from 12.x to 10.x ([d3c3568](https://github.com/Fdawgs/doc-conversion-service/commit/d3c3568))
-   chore(github): add issue templates ([7ce7389](https://github.com/Fdawgs/doc-conversion-service/commit/7ce7389))
-   chore(tests): correct file remover utility test description ([77449f0](https://github.com/Fdawgs/doc-conversion-service/commit/77449f0))

## <small>6.0.1 (2020-08-11)</small>

-   docs(readme): replace convoluted pm2 windows service deploy steps ([4bc2109](https://github.com/Fdawgs/doc-conversion-service/commit/4bc2109))
-   build(deps-dev): bump jest from 26.2.2 to 26.3.0 ([daa59fb](https://github.com/Fdawgs/doc-conversion-service/commit/daa59fb))
-   build(deps-dev): bump superagent from 5.3.1 to 6.0.0 ([c4b47b8](https://github.com/Fdawgs/doc-conversion-service/commit/c4b47b8))
-   build(deps): bump jsdom from 16.3.0 to 16.4.0 ([782788a](https://github.com/Fdawgs/doc-conversion-service/commit/782788a))
-   fix(routes): remove redundant query string params for pdf-to-txt ([84c9bc1](https://github.com/Fdawgs/doc-conversion-service/commit/84c9bc1))
-   fix(routes): remove xml output params for pdf-to-html: not supported ([b9082bb](https://github.com/Fdawgs/doc-conversion-service/commit/b9082bb))

## 6.0.0 (2020-08-05)

-   fix(config): remove hidepoweredby helmet config option; not supported ([4987c18](https://github.com/Fdawgs/doc-conversion-service/commit/4987c18))
-   build(deps-dev): bump dev dependencies to resolve security cve ([c8d6da4](https://github.com/Fdawgs/doc-conversion-service/commit/c8d6da4))
-   build(deps): bump helmet from 3.23.3 to 4.0.0 ([1d9bed6](https://github.com/Fdawgs/doc-conversion-service/commit/1d9bed6))
-   build(deps): bump sanitize-middleware from 2.0.14 to 2.0.15 ([5e8c431](https://github.com/Fdawgs/doc-conversion-service/commit/5e8c431))
-   build(deps): bump uuid from 8.2.0 to 8.3.0 ([5cf19dd](https://github.com/Fdawgs/doc-conversion-service/commit/5cf19dd))
-   build(env): remove quotation marks from api_bearer_token array value ([7285ead](https://github.com/Fdawgs/doc-conversion-service/commit/7285ead))
-   tests(routes): remove dud test ([4a7574e](https://github.com/Fdawgs/doc-conversion-service/commit/4a7574e))
-   chore(gitignore): add `src/server/temp1/*` used by pdf-to-txt tests ([fc70aed](https://github.com/Fdawgs/doc-conversion-service/commit/fc70aed))
-   chore(scripts): build api docs on launch of nodemon ([c00b51a](https://github.com/Fdawgs/doc-conversion-service/commit/c00b51a))
-   docs(contributing): clarification on env variables ([a604881](https://github.com/Fdawgs/doc-conversion-service/commit/a604881))
-   docs(readme): add tagline ([b877fc9](https://github.com/Fdawgs/doc-conversion-service/commit/b877fc9))
-   docs(routes): specify api query string params for pdf-to-txt ([a425faf](https://github.com/Fdawgs/doc-conversion-service/commit/a425faf))
-   feat(routes): add additional query param options for pdf-to-html ([abdcbd1](https://github.com/Fdawgs/doc-conversion-service/commit/abdcbd1))
-   style(middleware): correct camelcase of pdftohtmloptions param ([8b8a4a6](https://github.com/Fdawgs/doc-conversion-service/commit/8b8a4a6))

### BREAKING CHANGE

-   `removealt` query string param renamed to `removeAlt`; `backgroundcolor` query string param renamed to `backgroundColor`.

## <small>5.1.2 (2020-07-27)</small>

-   build(deps-dev): bump eslint-plugin-jest from 23.18.0 to 23.18.2 ([80717f3](https://github.com/Fdawgs/doc-conversion-service/commit/80717f3))
-   build(deps): bump node-poppler from 1.8.0 to 1.8.1 ([d2231bc](https://github.com/Fdawgs/doc-conversion-service/commit/d2231bc))
-   build(deps): bump sanitize-middleware from 2.0.13 to 2.0.14 ([32d82c4](https://github.com/Fdawgs/doc-conversion-service/commit/32d82c4))
-   build(docker): add poppler packages; move to debian from alpine ([e259054](https://github.com/Fdawgs/doc-conversion-service/commit/e259054))
-   build(docker): use .env file for config ([5b8463b](https://github.com/Fdawgs/doc-conversion-service/commit/5b8463b))

## <small>5.1.1 (2020-07-23)</small>

-   docs(readme): add poppler binary prerequisites for linux users ([57e0c84](https://github.com/Fdawgs/doc-conversion-service/commit/57e0c84))
-   docs(readme): remove inactive dependabot badge ([eaf7d6b](https://github.com/Fdawgs/doc-conversion-service/commit/eaf7d6b))
-   build(deps-dev): bump eslint-plugin-jsdoc from 30.0.2 to 30.0.3 ([4bb60c1](https://github.com/Fdawgs/doc-conversion-service/commit/4bb60c1))
-   build(deps-dev): bump eslint-plugin-json from 2.1.1 to 2.1.2 ([64a59fc](https://github.com/Fdawgs/doc-conversion-service/commit/64a59fc))
-   build(deps): bump node-poppler from 1.7.6 to 1.8.0 ([1c9eb68](https://github.com/Fdawgs/doc-conversion-service/commit/1c9eb68))
-   build(travis): add linux test deployment ([3411434](https://github.com/Fdawgs/doc-conversion-service/commit/3411434))
-   build(travis): add osx image ([c534a01](https://github.com/Fdawgs/doc-conversion-service/commit/c534a01))
-   build(travis): make scripts multiline ([293409e](https://github.com/Fdawgs/doc-conversion-service/commit/293409e))
-   build(travis): update linux dist to latest lts ([2baccfa](https://github.com/Fdawgs/doc-conversion-service/commit/2baccfa))
-   fix(middleware): move error throw to start of module ([ff2bd09](https://github.com/Fdawgs/doc-conversion-service/commit/ff2bd09))
-   tests(middleware): remove race conditions ([e142060](https://github.com/Fdawgs/doc-conversion-service/commit/e142060))
-   chore(eslint): ignore rules for apidoc tags ([92b4d9a](https://github.com/Fdawgs/doc-conversion-service/commit/92b4d9a))
-   refactor(config): change htmltidy config values to boolean from string ([cc292e9](https://github.com/Fdawgs/doc-conversion-service/commit/cc292e9))
-   style(readme): add whitespace ([18a5a73](https://github.com/Fdawgs/doc-conversion-service/commit/18a5a73))

## 5.1.0 (2020-07-20)

Main feature of this release is the addition of a PDF-to-TXT route, found at `api/converter/text`, check the generated API docs for options!

-   build(deps-dev): bump dev dependencies ([1ee980d](https://github.com/Fdawgs/doc-conversion-service/commit/1ee980d))
-   build(deps-dev): remove typescript ([e382363](https://github.com/Fdawgs/doc-conversion-service/commit/e382363))
-   build(deps): bump apidoc from 0.23.0 to 0.24.0 ([a12482a](https://github.com/Fdawgs/doc-conversion-service/commit/a12482a))
-   build(deps): bump node-poppler from 1.7.4 to 1.7.6 ([d8fbbf2](https://github.com/Fdawgs/doc-conversion-service/commit/d8fbbf2))
-   build(deps): bump sanitize-middleware from 2.0.12 to 2.0.13 ([087aa23](https://github.com/Fdawgs/doc-conversion-service/commit/087aa23))
-   build(travis): add test step ([1437870](https://github.com/Fdawgs/doc-conversion-service/commit/1437870))
-   build(travis): suppress git log; structure job stages ([f5aa1e4](https://github.com/Fdawgs/doc-conversion-service/commit/f5aa1e4))
-   build(travis): temporarily remove linux os from testing ([1a7a01c](https://github.com/Fdawgs/doc-conversion-service/commit/1a7a01c))
-   docs(readme): expand on supported conversions ([b072765](https://github.com/Fdawgs/doc-conversion-service/commit/b072765))
-   chore: clarify on poppler binary requirements ([307f9a3](https://github.com/Fdawgs/doc-conversion-service/commit/307f9a3))
-   chore(middleware): fix options link ([72b1fe8](https://github.com/Fdawgs/doc-conversion-service/commit/72b1fe8))
-   chore(middleware): remove incorrect text from jsdoc tag ([4f906da](https://github.com/Fdawgs/doc-conversion-service/commit/4f906da))
-   chore(middleware): sort param jsdoc tags alphabetically ascending order ([550f6e0](https://github.com/Fdawgs/doc-conversion-service/commit/550f6e0))
-   chore(routes): fix example option requests ([1338f00](https://github.com/Fdawgs/doc-conversion-service/commit/1338f00))
-   style(middleware): remove whitespace ([46d3508](https://github.com/Fdawgs/doc-conversion-service/commit/46d3508))
-   style(middleware): rename middleware to reflect function ([cc4ae95](https://github.com/Fdawgs/doc-conversion-service/commit/cc4ae95))
-   style(route): sort variables alphabetically ascending order ([c8289e6](https://github.com/Fdawgs/doc-conversion-service/commit/c8289e6))
-   style(tests): reorder tests for error throws to be at end ([98a8603](https://github.com/Fdawgs/doc-conversion-service/commit/98a8603))
-   tests(routes): test errors thrown on 400 code ([ea3342d](https://github.com/Fdawgs/doc-conversion-service/commit/ea3342d))
-   fix(middleware): throw error if object returned ([c0fb56e](https://github.com/Fdawgs/doc-conversion-service/commit/c0fb56e))
-   feat(routes): add pdf-to-txt conversion route ([34f323d](https://github.com/Fdawgs/doc-conversion-service/commit/34f323d))
-   refactor(middleware): remove outputencoding option, defaults to utf-8 ([f05f900](https://github.com/Fdawgs/doc-conversion-service/commit/f05f900))

## 5.0.0 (2020-07-14)

-   build(deps-dev): bump @commitlint/config-conventional ([28e7002](https://github.com/Fdawgs/doc-conversion-service/commit/28e7002))
-   build(deps-dev): bump eslint-plugin-jsdoc from 29.1.0 to 29.2.0 ([605dd83](https://github.com/Fdawgs/doc-conversion-service/commit/605dd83))
-   build(deps-dev): bump lodash from 4.17.15 to 4.17.19 ([618e1e0](https://github.com/Fdawgs/doc-conversion-service/commit/618e1e0))
-   build(deps): bump jsdom from 16.2.2 to 16.3.0 ([41381b6](https://github.com/Fdawgs/doc-conversion-service/commit/41381b6))
-   refactor(config): move api tokens to environment variables ([80327b0](https://github.com/Fdawgs/doc-conversion-service/commit/80327b0))

### BREAKING CHANGE

-   `auth.apiKeys` in `config.js` now uses `api_bearer_token_array` from .env file

## <small>4.3.3 (2020-07-08)</small>

-   fix(middleware): change import of fs promise module to support lts ([0bcffe6](https://github.com/Fdawgs/doc-conversion-service/commit/0bcffe6))
-   build(travis): use lts version of node for coverage tests ([7361fc7](https://github.com/Fdawgs/doc-conversion-service/commit/7361fc7))

## <small>4.3.2 (2020-07-08)</small>

-   build(deps-dev): bump eslint-plugin-jsdoc from 28.6.1 to 29.1.0 ([655be1a](https://github.com/Fdawgs/doc-conversion-service/commit/655be1a))
-   refactor(middleware): move html tidy elements out of poppler; rename ([b14b4eb](https://github.com/Fdawgs/doc-conversion-service/commit/b14b4eb))

## <small>4.3.1 (2020-07-07)</small>

-   style: parse with prettier ([1dff395](https://github.com/Fdawgs/doc-conversion-service/commit/1dff395))
-   style(routes): rename variable to better match middleware function ([f2dd543](https://github.com/Fdawgs/doc-conversion-service/commit/f2dd543))
-   style(tests): rename variable to be in line with other tests ([589025c](https://github.com/Fdawgs/doc-conversion-service/commit/589025c))
-   tests(routes): add smaller pdf for test ([83c0c2e](https://github.com/Fdawgs/doc-conversion-service/commit/83c0c2e))
-   tests(routes): define modified server config for each route test ([a51ff39](https://github.com/Fdawgs/doc-conversion-service/commit/a51ff39))
-   build(travis): update linux dist to latest lts ([e3b06a2](https://github.com/Fdawgs/doc-conversion-service/commit/e3b06a2))
-   fix(middleware): correct indication of whether images parsed ([792c0c6](https://github.com/Fdawgs/doc-conversion-service/commit/792c0c6))
-   fix(middleware): use fs module promise api for poppler conversion ([0f33e3c](https://github.com/Fdawgs/doc-conversion-service/commit/0f33e3c))
-   refactor(middleware): change rtfjs flow to be same as poppler ([8dc0f6c](https://github.com/Fdawgs/doc-conversion-service/commit/8dc0f6c))
-   refactor(middleware): remove redundant type checks ([b6d7da8](https://github.com/Fdawgs/doc-conversion-service/commit/b6d7da8))
-   refactor(middleware): use util.promisify for htmltidy2 function ([887ce23](https://github.com/Fdawgs/doc-conversion-service/commit/887ce23))

## 4.3.0 (2020-07-06)

-   build(deps-dev): bump development dependencies ([5f83f2b](https://github.com/Fdawgs/doc-conversion-service/commit/5f83f2b))
-   build(travis): remove windows os from allowed failures ([ba53364](https://github.com/Fdawgs/doc-conversion-service/commit/ba53364))
-   chore: add test rtf file ([d77fd28](https://github.com/Fdawgs/doc-conversion-service/commit/d77fd28))
-   chore: clarification of middleware purpose in jsdocs ([7cec4c8](https://github.com/Fdawgs/doc-conversion-service/commit/7cec4c8))
-   chore: fix jsdoc tags ([ecc1fff](https://github.com/Fdawgs/doc-conversion-service/commit/ecc1fff))
-   chore: grammatical fixes ([68441f5](https://github.com/Fdawgs/doc-conversion-service/commit/68441f5))
-   chore(middleware): standardise error variable naming ([cdbc386](https://github.com/Fdawgs/doc-conversion-service/commit/cdbc386))
-   chore(scripts): use gitignore for eslint ignore-path option ([73782b9](https://github.com/Fdawgs/doc-conversion-service/commit/73782b9))
-   chore(scripts): use gitignore for prettier ignore-path option ([6a7674e](https://github.com/Fdawgs/doc-conversion-service/commit/6a7674e))
-   tests(middleware): reorder expects to follow res, req, next input ([ce921e7](https://github.com/Fdawgs/doc-conversion-service/commit/ce921e7))
-   refactor(middleware): alter indication of whether html passed conversion ([5eb6145](https://github.com/Fdawgs/doc-conversion-service/commit/5eb6145))
-   refactor(middleware): make tempdirectory param mandatory ([23a6733](https://github.com/Fdawgs/doc-conversion-service/commit/23a6733))
-   refactor(middleware): remove unreachable promise return ([87b4a3c](https://github.com/Fdawgs/doc-conversion-service/commit/87b4a3c))
-   refactor(middleware): tidy function structure ([6166a48](https://github.com/Fdawgs/doc-conversion-service/commit/6166a48))
-   fix: add missing tempdirectory value ([be81bc8](https://github.com/Fdawgs/doc-conversion-service/commit/be81bc8))
-   fix(middleware): skip over rtf/pdf conversion if content-type invalid ([0af8ddd](https://github.com/Fdawgs/doc-conversion-service/commit/0af8ddd))
-   feat(middleware): add rtf conversion middleware ([1716b0b](https://github.com/Fdawgs/doc-conversion-service/commit/1716b0b))
-   feat(middleware): pass next error if invalid type passed ([18665c5](https://github.com/Fdawgs/doc-conversion-service/commit/18665c5))
-   feat(routes): add rtf support ([176b0cd](https://github.com/Fdawgs/doc-conversion-service/commit/176b0cd))
-   docs(readme): add missing step to pm2 windows service installation ([18251f5](https://github.com/Fdawgs/doc-conversion-service/commit/18251f5))

## <small>4.2.2 (2020-06-30)</small>

-   chore: create code_of_conduct.md ([70b2a27](https://github.com/Fdawgs/doc-conversion-service/commit/70b2a27))
-   chore: double pm2 instances ([9a65a53](https://github.com/Fdawgs/doc-conversion-service/commit/9a65a53))
-   chore(eslint): convert from json to js file format ([84563b4](https://github.com/Fdawgs/doc-conversion-service/commit/84563b4))
-   chore(scripts): remove prettier ignore-path option ([25a7bba](https://github.com/Fdawgs/doc-conversion-service/commit/25a7bba))
-   build(deps-dev): bump @commitlint/config-conventional ([8dab0b7](https://github.com/Fdawgs/doc-conversion-service/commit/8dab0b7))
-   build(deps-dev): bump eslint from 7.2.0 to 7.3.1 ([b16ba93](https://github.com/Fdawgs/doc-conversion-service/commit/b16ba93))
-   build(deps-dev): bump eslint-plugin-import from 2.21.2 to 2.22.0 ([856e86d](https://github.com/Fdawgs/doc-conversion-service/commit/856e86d))
-   build(deps-dev): bump eslint-plugin-jest from 23.13.2 to 23.17.1 ([7dd3be8](https://github.com/Fdawgs/doc-conversion-service/commit/7dd3be8))
-   build(deps-dev): bump eslint-plugin-jsdoc from 27.0.6 to 28.5.1 ([6e1b75f](https://github.com/Fdawgs/doc-conversion-service/commit/6e1b75f))
-   build(deps-dev): bump jest from 26.0.1 to 26.1.0 ([b1f287b](https://github.com/Fdawgs/doc-conversion-service/commit/b1f287b))
-   build(deps-dev): bump superagent from 5.2.2 to 5.3.1 ([43be108](https://github.com/Fdawgs/doc-conversion-service/commit/43be108))
-   build(deps): bump helmet from 3.22.1 to 3.23.3 ([89e2dcf](https://github.com/Fdawgs/doc-conversion-service/commit/89e2dcf))
-   build(deps): bump node-poppler from 1.7.2 to 1.7.4 ([6c88aa8](https://github.com/Fdawgs/doc-conversion-service/commit/6c88aa8))
-   build(deps): bump sanitize-middleware from 2.0.11 to 2.0.12 ([efc933f](https://github.com/Fdawgs/doc-conversion-service/commit/efc933f))
-   build(deps): bump uuid from 8.1.0 to 8.2.0 ([b1d8255](https://github.com/Fdawgs/doc-conversion-service/commit/b1d8255))
-   build(travis): copy template file ([e981e5b](https://github.com/Fdawgs/doc-conversion-service/commit/e981e5b))
-   Create Dependabot config file ([fbc6b20](https://github.com/Fdawgs/doc-conversion-service/commit/fbc6b20))

## <small>4.2.1 (2020-06-12)</small>

-   build(deps): bump sanitize-middleware from 2.0.8 to 2.0.11 ([ed8d308](https://github.com/Fdawgs/doc-conversion-service/commit/ed8d308))
-   fix(config): add backgroundcolor to accepted query params for sanitize ([a417c4e](https://github.com/Fdawgs/doc-conversion-service/commit/a417c4e))

## 4.2.0 (2020-06-12)

-   build(deps-dev): bump eslint from 6.8.0 to 7.2.0 ([953051e](https://github.com/Fdawgs/doc-conversion-service/commit/953051e))
-   build(deps-dev): bump eslint-config-airbnb-base from 14.1.0 to 14.2.0 ([6c2898b](https://github.com/Fdawgs/doc-conversion-service/commit/6c2898b))
-   build(deps-dev): bump eslint-plugin-import from 2.21.1 to 2.21.2 ([a82ef2e](https://github.com/Fdawgs/doc-conversion-service/commit/a82ef2e))
-   build(deps-dev): bump eslint-plugin-jsdoc from 27.0.4 to 27.0.6 ([0acb2d1](https://github.com/Fdawgs/doc-conversion-service/commit/0acb2d1))
-   build(deps): bump helmet from 3.22.0 to 3.22.1 ([78a709c](https://github.com/Fdawgs/doc-conversion-service/commit/78a709c))
-   feat(middleware): background color can be defined with query param ([f038607](https://github.com/Fdawgs/doc-conversion-service/commit/f038607))

## <small>4.1.4 (2020-06-08)</small>

-   build(deps-dev): bump eslint-plugin-import from 2.20.2 to 2.21.1 ([b295396](https://github.com/Fdawgs/doc-conversion-service/commit/b295396))
-   build(deps-dev): bump eslint-plugin-jsdoc from 27.0.3 to 27.0.4 ([f3c7549](https://github.com/Fdawgs/doc-conversion-service/commit/f3c7549))
-   build(deps-dev): bump typescript from 3.9.3 to 3.9.5 ([0268a51](https://github.com/Fdawgs/doc-conversion-service/commit/0268a51))
-   build(deps): bump node-poppler from 1.7.1 to 1.7.2 ([f50cb63](https://github.com/Fdawgs/doc-conversion-service/commit/f50cb63))
-   fix(config): set poppler binary path in environment variables ([d639963](https://github.com/Fdawgs/doc-conversion-service/commit/d639963))
-   chore: rename .env.test to .env.template; add .env.test to gitignore ([0161089](https://github.com/Fdawgs/doc-conversion-service/commit/0161089))
-   chore(scripts): expand coverage of eslint and prettier ([edb8f29](https://github.com/Fdawgs/doc-conversion-service/commit/edb8f29))
-   docs(contributing): add env variable reference ([bb864ae](https://github.com/Fdawgs/doc-conversion-service/commit/bb864ae))

## <small>4.1.3 (2020-06-04)</small>

-   chore: watch .env.production file for pm2 restarts ([417db37](https://github.com/Fdawgs/doc-conversion-service/commit/417db37))
-   chore(deps-dev): bump eslint-plugin-jsdoc from 26.0.2 to 27.0.3 ([74e76ed](https://github.com/Fdawgs/doc-conversion-service/commit/74e76ed))
-   chore(deps): bump sanitize-middleware from 2.0.7 to 2.0.8 ([7160f55](https://github.com/Fdawgs/doc-conversion-service/commit/7160f55))
-   docs(readme): correct spelling; simplify intro section ([0dff681](https://github.com/Fdawgs/doc-conversion-service/commit/0dff681))

## <small>4.1.2 (2020-06-02)</small>

-   chore(deps-dev): bump eslint-plugin-jsdoc from 26.0.1 to 26.0.2 ([4bd56eb](https://github.com/Fdawgs/doc-conversion-service/commit/4bd56eb))
-   fix(server): check for string instead of boolean to enable https ([2337673](https://github.com/Fdawgs/doc-conversion-service/commit/2337673))

## <small>4.1.1 (2020-06-01)</small>

-   chore: add missing @param descriptions ([8582340](https://github.com/Fdawgs/doc-conversion-service/commit/8582340))
-   chore: add missing @returns jsdoc tag ([879ebb4](https://github.com/Fdawgs/doc-conversion-service/commit/879ebb4))
-   chore: correct case of type for @param jsdoc tag ([abb936f](https://github.com/Fdawgs/doc-conversion-service/commit/abb936f))
-   chore: remove .env.test from dockerignore file ([5347db7](https://github.com/Fdawgs/doc-conversion-service/commit/5347db7))
-   chore: remove leftover eslint comment ([8ed2ca2](https://github.com/Fdawgs/doc-conversion-service/commit/8ed2ca2))
-   chore: remove misleading @param jsdoc tags ([17e7a1f](https://github.com/Fdawgs/doc-conversion-service/commit/17e7a1f))
-   chore: remove stray comment ([8de1fe6](https://github.com/Fdawgs/doc-conversion-service/commit/8de1fe6))
-   chore: update git and docker ignore files ([2c1a5cc](https://github.com/Fdawgs/doc-conversion-service/commit/2c1a5cc))
-   chore: update git and docker ignore files ([c109352](https://github.com/Fdawgs/doc-conversion-service/commit/c109352))
-   chore: use @returns jsdoc tag over synonym ([dc6b4fd](https://github.com/Fdawgs/doc-conversion-service/commit/dc6b4fd))
-   chore(deps-dev): bump eslint-plugin-jest from 23.10.0 to 23.13.2 ([364a1b9](https://github.com/Fdawgs/doc-conversion-service/commit/364a1b9))
-   chore(deps-dev): bump eslint-plugin-jsdoc from 25.4.3 to 26.0.1 ([a094a0d](https://github.com/Fdawgs/doc-conversion-service/commit/a094a0d))
-   chore(deps-dev): bump nodemon from 2.0.3 to 2.0.4 ([c7584d6](https://github.com/Fdawgs/doc-conversion-service/commit/c7584d6))
-   chore(deps-dev): bump typescript from 3.8.3 to 3.9.3 ([232e867](https://github.com/Fdawgs/doc-conversion-service/commit/232e867))
-   chore(deps): bump apidoc from 0.22.1 to 0.23.0 ([12b41ce](https://github.com/Fdawgs/doc-conversion-service/commit/12b41ce))
-   chore(deps): bump node-poppler from 1.7.0 to 1.7.1 ([9cf7aa0](https://github.com/Fdawgs/doc-conversion-service/commit/9cf7aa0))
-   chore(deps): bump sanitize-middleware from 2.0.6 to 2.0.7 ([baed676](https://github.com/Fdawgs/doc-conversion-service/commit/baed676))
-   chore(deps): bump uuid from 8.0.0 to 8.1.0 ([55f830e](https://github.com/Fdawgs/doc-conversion-service/commit/55f830e))
-   chore(eslintrc): add multi-line rule ([65661fe](https://github.com/Fdawgs/doc-conversion-service/commit/65661fe))
-   build(deps-dev): add eslint-plugin-jsdoc dep; update eslint conf ([db9d2d0](https://github.com/Fdawgs/doc-conversion-service/commit/db9d2d0))
-   build(deps-dev): add eslint-plugin-promise dep; update eslint conf ([51f1d99](https://github.com/Fdawgs/doc-conversion-service/commit/51f1d99))
-   build(deps-dev): replace supertest with superagent ([f75d1ca](https://github.com/Fdawgs/doc-conversion-service/commit/f75d1ca))
-   build(docker): add missing expose instruction ([1f9ec49](https://github.com/Fdawgs/doc-conversion-service/commit/1f9ec49))
-   build(docker): lint dockerfile ([6142847](https://github.com/Fdawgs/doc-conversion-service/commit/6142847))
-   build(docker): specify host for local port mapping ([be67264](https://github.com/Fdawgs/doc-conversion-service/commit/be67264))
-   refactor(middleware): remove async ([cdbf67c](https://github.com/Fdawgs/doc-conversion-service/commit/cdbf67c))
-   refactor(middleware): remove redundant then() method from async/await ([dc75f6d](https://github.com/Fdawgs/doc-conversion-service/commit/dc75f6d))
-   refactor(server): remove object setting from class constructor ([e8f5b04](https://github.com/Fdawgs/doc-conversion-service/commit/e8f5b04))
-   refactor(server): server force closes on shutdown, promise removed ([f3ee856](https://github.com/Fdawgs/doc-conversion-service/commit/f3ee856))
-   tests: rebuild server for each test ([706e743](https://github.com/Fdawgs/doc-conversion-service/commit/706e743))
-   tests: remove host value ([a53cc6d](https://github.com/Fdawgs/doc-conversion-service/commit/a53cc6d))
-   tests: use pseudo-real data to test input ([729fa75](https://github.com/Fdawgs/doc-conversion-service/commit/729fa75))
-   tests(middleware): remove redundant async/await usage ([8d03660](https://github.com/Fdawgs/doc-conversion-service/commit/8d03660))
-   tests(server): add additional test level ([dbfe508](https://github.com/Fdawgs/doc-conversion-service/commit/dbfe508))
-   tests(server): fix memory leaks in https server tests ([a2b1e6d](https://github.com/Fdawgs/doc-conversion-service/commit/a2b1e6d))
-   tests(server): remove server default variable tests ([ce2a6ee](https://github.com/Fdawgs/doc-conversion-service/commit/ce2a6ee))
-   tests(server): use lodash for deep cloning ([5ee14fe](https://github.com/Fdawgs/doc-conversion-service/commit/5ee14fe))
-   style: tidy whitespace ([64228c8](https://github.com/Fdawgs/doc-conversion-service/commit/64228c8))
-   style(tests): clarify expectations ([13f3084](https://github.com/Fdawgs/doc-conversion-service/commit/13f3084))
-   style(tests): structure by aaa pattern ([c1f24a9](https://github.com/Fdawgs/doc-conversion-service/commit/c1f24a9))
-   docs(readme): reference test env file instead of dev one ([88c22b2](https://github.com/Fdawgs/doc-conversion-service/commit/88c22b2))
-   ci(travis): allow test env for jest to run in ci ([fbc3587](https://github.com/Fdawgs/doc-conversion-service/commit/fbc3587))

## 4.1.0 (2020-05-12)

-   docs(contributing): update conventional commit link to latest version ([3921de6](https://github.com/Fdawgs/doc-conversion-service/commit/3921de6))
-   docs(readme): add docker deployment section ([0038825](https://github.com/Fdawgs/doc-conversion-service/commit/0038825))
-   docs(readme): update deployment steps to use env files ([44aa3a3](https://github.com/Fdawgs/doc-conversion-service/commit/44aa3a3))
-   build(deps): move apidoc from devdependencies ([3f1982c](https://github.com/Fdawgs/doc-conversion-service/commit/3f1982c))
-   build(docker): add .dockerignore file ([5689d11](https://github.com/Fdawgs/doc-conversion-service/commit/5689d11))
-   build(docker): add docker and docker-compose files ([9bc4eba](https://github.com/Fdawgs/doc-conversion-service/commit/9bc4eba))
-   fix(config): use env file for port, https and host ([08715f2](https://github.com/Fdawgs/doc-conversion-service/commit/08715f2))
-   refactor(server): separate instance and application configuration ([e4eccdc](https://github.com/Fdawgs/doc-conversion-service/commit/e4eccdc))

## <small>4.0.7 (2020-05-09)</small>

-   chore(deps-dev): bump conventional-changelog-cli from 2.0.31 to 2.0.34 ([86828b9](https://github.com/Fdawgs/doc-conversion-service/commit/86828b9))
-   chore(deps-dev): bump eslint-plugin-jest from 23.9.0 to 23.10.0 ([d11eeab](https://github.com/Fdawgs/doc-conversion-service/commit/d11eeab))
-   refactor(routes): use res.locals object for doc location object ([b758c71](https://github.com/Fdawgs/doc-conversion-service/commit/b758c71))
-   tests(middleware): consolidate object matchers ([b72b95f](https://github.com/Fdawgs/doc-conversion-service/commit/b72b95f))
-   tests(middleware): set res.locals object for missed mock responses ([0a76c4f](https://github.com/Fdawgs/doc-conversion-service/commit/0a76c4f))

## <small>4.0.6 (2020-05-08)</small>

-   chore(deps-dev): bump apidoc from 0.22.0 to 0.22.1 ([acf9542](https://github.com/Fdawgs/doc-conversion-service/commit/acf9542))
-   tests(middleware): extend test pass conditions ([31684a3](https://github.com/Fdawgs/doc-conversion-service/commit/31684a3))
-   tests(middleware): refactor undefined type checks ([0f6dc5f](https://github.com/Fdawgs/doc-conversion-service/commit/0f6dc5f))
-   tests(middleware): set res.locals object for mock response ([cc3e623](https://github.com/Fdawgs/doc-conversion-service/commit/cc3e623))
-   refactor(middleware): use res.locals object for req scoped variables ([8fade83](https://github.com/Fdawgs/doc-conversion-service/commit/8fade83))

## <small>4.0.5 (2020-05-06)</small>

-   tests(middleware): check style elements still parsed with no type attr ([716edaa](https://github.com/Fdawgs/doc-conversion-service/commit/716edaa))
-   tests(middleware): reorder expects to follow res, req, next input ([e8917ef](https://github.com/Fdawgs/doc-conversion-service/commit/e8917ef))
-   tests(server): add test self-signed localhost pfx, key, and cert files ([889855f](https://github.com/Fdawgs/doc-conversion-service/commit/889855f))
-   tests(server): align modified server config variable name across tests ([ee54684](https://github.com/Fdawgs/doc-conversion-service/commit/ee54684))
-   tests(server): replace shallow spread with deep copies ([8afa4b2](https://github.com/Fdawgs/doc-conversion-service/commit/8afa4b2))
-   refactor(middleware): pass error to next on failure to embed images ([14133cd](https://github.com/Fdawgs/doc-conversion-service/commit/14133cd))
-   fix(config): add missing pfx passphrase key ([33156b2](https://github.com/Fdawgs/doc-conversion-service/commit/33156b2))
-   fix(middleware): add missing else path ([b98052f](https://github.com/Fdawgs/doc-conversion-service/commit/b98052f))
-   chore(deps-dev): bump eslint-plugin-jest from 23.8.2 to 23.9.0 ([209f485](https://github.com/Fdawgs/doc-conversion-service/commit/209f485))
-   chore(deps-dev): bump jest from 25.5.3 to 26.0.1 ([f0982cd](https://github.com/Fdawgs/doc-conversion-service/commit/f0982cd))
-   chore(deps): bump node-poppler from 1.6.0 to 1.7.0 ([b9aef3a](https://github.com/Fdawgs/doc-conversion-service/commit/b9aef3a))

## <small>4.0.4 (2020-05-01)</small>

-   chore(deps-dev): bump apidoc from 0.20.1 to 0.22.0 ([7879b32](https://github.com/Fdawgs/doc-conversion-service/commit/7879b32))
-   chore(deps-dev): bump coveralls from 3.0.11 to 3.1.0 ([cdf4f93](https://github.com/Fdawgs/doc-conversion-service/commit/cdf4f93))
-   chore(deps-dev): bump eslint-config-prettier from 6.10.1 to 6.11.0 ([dd7818d](https://github.com/Fdawgs/doc-conversion-service/commit/dd7818d))
-   chore(deps-dev): bump jest from 25.3.0 to 25.5.1 ([e783209](https://github.com/Fdawgs/doc-conversion-service/commit/e783209))
-   chore(deps-dev): bump jest from 25.5.1 to 25.5.2 ([0e299df](https://github.com/Fdawgs/doc-conversion-service/commit/0e299df))
-   chore(deps-dev): bump jest from 25.5.2 to 25.5.3 ([40d8095](https://github.com/Fdawgs/doc-conversion-service/commit/40d8095))
-   chore(deps-dev): bump prettier from 2.0.4 to 2.0.5 ([995b4c2](https://github.com/Fdawgs/doc-conversion-service/commit/995b4c2))
-   chore(deps): bump sanitize-middleware from 2.0.5 to 2.0.6 ([53149b9](https://github.com/Fdawgs/doc-conversion-service/commit/53149b9))
-   chore(deps): bump uuid from 7.0.3 to 8.0.0 ([3aaef48](https://github.com/Fdawgs/doc-conversion-service/commit/3aaef48))
-   tests: ignore index and config in coverage collection ([6581ad9](https://github.com/Fdawgs/doc-conversion-service/commit/6581ad9))
-   tests: set jest timeout setting in package.json ([7b497ff](https://github.com/Fdawgs/doc-conversion-service/commit/7b497ff))
-   fix(middleware): move file write into try...catch ([7dbf716](https://github.com/Fdawgs/doc-conversion-service/commit/7dbf716))
-   refactor(server): rename configureWinston function to configureLogging ([790ce70](https://github.com/Fdawgs/doc-conversion-service/commit/790ce70))
-   refactor(server): replace winston logging module with pino ([9c6fb2c](https://github.com/Fdawgs/doc-conversion-service/commit/9c6fb2c))
-   style(server): capitalise leading character of comments ([fd39d2f](https://github.com/Fdawgs/doc-conversion-service/commit/fd39d2f))
-   docs(readme): update example server port ([6ac6967](https://github.com/Fdawgs/doc-conversion-service/commit/6ac6967))

## <small>4.0.3 (2020-04-15)</small>

-   tests(routes): add binary route test ([e63867b](https://github.com/Fdawgs/doc-conversion-service/commit/e63867b))
-   tests(routes): add documentreference route test ([1c87bed](https://github.com/Fdawgs/doc-conversion-service/commit/1c87bed))
-   tests(routes): add html route test ([dc649bd](https://github.com/Fdawgs/doc-conversion-service/commit/dc649bd))
-   tests(routes): change expected id value ([84707f0](https://github.com/Fdawgs/doc-conversion-service/commit/84707f0))
-   fix(routes): correct cors overwriting each option call ([1f64d27](https://github.com/Fdawgs/doc-conversion-service/commit/1f64d27))
-   fix(server): correct require path for documentreference route ([d6ba4d1](https://github.com/Fdawgs/doc-conversion-service/commit/d6ba4d1))
-   style(routes): add whitespace ([6e193b8](https://github.com/Fdawgs/doc-conversion-service/commit/6e193b8))
-   style(routes): format route tests ([10b97de](https://github.com/Fdawgs/doc-conversion-service/commit/10b97de))
-   chore(config): remove redundant style source from csp ([f56b0de](https://github.com/Fdawgs/doc-conversion-service/commit/f56b0de))
-   chore(config): tidy sanitize middleware config ([8850ca2](https://github.com/Fdawgs/doc-conversion-service/commit/8850ca2))
-   chore(deps-dev): bump jest from 25.2.7 to 25.3.0 ([45c877c](https://github.com/Fdawgs/doc-conversion-service/commit/45c877c))
-   chore(deps-dev): bump nodemon from 2.0.2 to 2.0.3 ([f2598fc](https://github.com/Fdawgs/doc-conversion-service/commit/f2598fc))
-   chore(deps-dev): bump prettier from 2.0.2 to 2.0.4 ([159729b](https://github.com/Fdawgs/doc-conversion-service/commit/159729b))
-   chore(deps): bump node-poppler from 1.5.2 to 1.6.0 ([0580ac1](https://github.com/Fdawgs/doc-conversion-service/commit/0580ac1))
-   chore(deps): bump sanitize-middleware from 2.0.4 to 2.0.5 ([59724a2](https://github.com/Fdawgs/doc-conversion-service/commit/59724a2))
-   chore(package): move runinband option to correct jest script ([6c91b4c](https://github.com/Fdawgs/doc-conversion-service/commit/6c91b4c))
-   refactor(routes): remove redundant cors function call ([5001bd1](https://github.com/Fdawgs/doc-conversion-service/commit/5001bd1))
-   refactor(server): remove unused variable ([b9a3244](https://github.com/Fdawgs/doc-conversion-service/commit/b9a3244))
-   ci(travis): remove dupe-check step ([6606f13](https://github.com/Fdawgs/doc-conversion-service/commit/6606f13))
-   docs(readme): update pm2-windows-service link ([3615c7c](https://github.com/Fdawgs/doc-conversion-service/commit/3615c7c))

## <small>4.0.2 (2020-04-03)</small>

-   chore(deps-dev): bump jest from 25.2.4 to 25.2.7 ([97bfff9](https://github.com/Fdawgs/doc-conversion-service/commit/97bfff9))
-   chore(package): add runinband option to jest script ([dc93ab7](https://github.com/Fdawgs/doc-conversion-service/commit/dc93ab7))
-   tests(middleware): remove redundant expect ([a65814f](https://github.com/Fdawgs/doc-conversion-service/commit/a65814f))
-   tests(utils): add tests for bearer token auth util ([bef452e](https://github.com/Fdawgs/doc-conversion-service/commit/bef452e))
-   tests(utils): add tests for file removal util ([5caa595](https://github.com/Fdawgs/doc-conversion-service/commit/5caa595))
-   fix(middleware): make win1252 middleware synchronous ([a717953](https://github.com/Fdawgs/doc-conversion-service/commit/a717953))
-   refactor(routes): move file removal middleware to own util file ([4dd54fd](https://github.com/Fdawgs/doc-conversion-service/commit/4dd54fd))
-   refactor(server): move error handler middleware to own util file ([4b672bd](https://github.com/Fdawgs/doc-conversion-service/commit/4b672bd))
-   refactor(utils): make file removal synchronous ([dea709b](https://github.com/Fdawgs/doc-conversion-service/commit/dea709b))

## <small>4.0.1 (2020-04-02)</small>

-   tests(middleware): add check for directory creation ([f16e127](https://github.com/Fdawgs/doc-conversion-service/commit/f16e127))
-   tests(middleware): add documentreference tests ([8516f8b](https://github.com/Fdawgs/doc-conversion-service/commit/8516f8b))
-   tests(middleware): check html is generated ([ffebf86](https://github.com/Fdawgs/doc-conversion-service/commit/ffebf86))
-   tests(middleware): remove async flags ([15850e7](https://github.com/Fdawgs/doc-conversion-service/commit/15850e7))
-   tests(middleware): remove encoding ([6285f97](https://github.com/Fdawgs/doc-conversion-service/commit/6285f97))
-   tests(middleware): remove redundant delete ([0bab97c](https://github.com/Fdawgs/doc-conversion-service/commit/0bab97c))
-   tests(middleware): remove temp directory after tests run ([bc3f785](https://github.com/Fdawgs/doc-conversion-service/commit/bc3f785))
-   tests(middleware): test reject path ([7ce5a09](https://github.com/Fdawgs/doc-conversion-service/commit/7ce5a09))
-   tests(server): reduce timeout ([bcbbe84](https://github.com/Fdawgs/doc-conversion-service/commit/bcbbe84))
-   chore(deps-dev): bump eslint-plugin-import from 2.20.1 to 2.20.2 ([c1aa46b](https://github.com/Fdawgs/doc-conversion-service/commit/c1aa46b))
-   chore(deps-dev): bump jest from 25.1.0 to 25.2.4 ([f4a6f54](https://github.com/Fdawgs/doc-conversion-service/commit/f4a6f54))
-   chore(deps): bump jsdom from 16.2.1 to 16.2.2 ([872a6a6](https://github.com/Fdawgs/doc-conversion-service/commit/872a6a6))
-   chore(deps): bump uuid from 7.0.2 to 7.0.3 ([84dd201](https://github.com/Fdawgs/doc-conversion-service/commit/84dd201))
-   chore(package): remove verbose options from jest scripts ([6058fc5](https://github.com/Fdawgs/doc-conversion-service/commit/6058fc5))
-   fix(middleware): add missing reject path ([779f34f](https://github.com/Fdawgs/doc-conversion-service/commit/779f34f))
-   fix(middleware): check for req.body and req.files ([c061434](https://github.com/Fdawgs/doc-conversion-service/commit/c061434))
-   fix(middleware): pass error object to next on error ([d34377b](https://github.com/Fdawgs/doc-conversion-service/commit/d34377b))
-   fix(middleware): remove unused reject call ([624a21a](https://github.com/Fdawgs/doc-conversion-service/commit/624a21a))
-   fix(middleware): test if req.files is array ([c8cdcc5](https://github.com/Fdawgs/doc-conversion-service/commit/c8cdcc5))
-   fix(routes): remove leftover test middleware ([1d45c51](https://github.com/Fdawgs/doc-conversion-service/commit/1d45c51))
-   fix(routes): remove next calls ([4b119e0](https://github.com/Fdawgs/doc-conversion-service/commit/4b119e0))
-   style(middleware): format with prettier ([b6011b0](https://github.com/Fdawgs/doc-conversion-service/commit/b6011b0))
-   docs: grammar and spelling fixes ([68d1e01](https://github.com/Fdawgs/doc-conversion-service/commit/68d1e01))

## 4.0.0 (2020-03-25)

-   chore: compress test images ([44ff0d9](https://github.com/Fdawgs/doc-conversion-service/commit/44ff0d9))
-   chore(config): allow caching of results ([44f8b86](https://github.com/Fdawgs/doc-conversion-service/commit/44f8b86))
-   chore(deps-dev): bump apidoc from 0.20.0 to 0.20.1 ([c9f03a2](https://github.com/Fdawgs/doc-conversion-service/commit/c9f03a2))
-   chore(deps-dev): bump coveralls from 3.0.9 to 3.0.11 ([932082b](https://github.com/Fdawgs/doc-conversion-service/commit/932082b))
-   chore(deps-dev): bump eslint-config-prettier from 6.10.0 to 6.10.1 ([c734405](https://github.com/Fdawgs/doc-conversion-service/commit/c734405))
-   chore(deps-dev): bump prettier from 1.19.1 to 2.0.1 ([ae87cb3](https://github.com/Fdawgs/doc-conversion-service/commit/ae87cb3))
-   chore(deps-dev): bump prettier from 2.0.1 to 2.0.2 ([bc3ffc7](https://github.com/Fdawgs/doc-conversion-service/commit/bc3ffc7))
-   chore(deps): bump helmet from 3.21.3 to 3.22.0 ([2a063eb](https://github.com/Fdawgs/doc-conversion-service/commit/2a063eb))
-   chore(deps): bump sanitize-middleware from 2.0.1 to 2.0.3 ([3173edc](https://github.com/Fdawgs/doc-conversion-service/commit/3173edc))
-   chore(deps): bump sanitize-middleware from 2.0.3 to 2.0.4 ([af14054](https://github.com/Fdawgs/doc-conversion-service/commit/af14054))
-   chore(package): add prettier call to changelog gen script ([244944e](https://github.com/Fdawgs/doc-conversion-service/commit/244944e))
-   chore(package): use test-only script when testing ([b72bf2b](https://github.com/Fdawgs/doc-conversion-service/commit/b72bf2b))
-   chore(pm2): remove need to manually restart upon config change ([8092778](https://github.com/Fdawgs/doc-conversion-service/commit/8092778))
-   ci(travis): add release tags to branch safelist ([22c4614](https://github.com/Fdawgs/doc-conversion-service/commit/22c4614))
-   ci(travis): specify os for jobs ([2bd5b68](https://github.com/Fdawgs/doc-conversion-service/commit/2bd5b68))
-   docs(readme): update pm2 section to reflect auto restart changes ([ece951a](https://github.com/Fdawgs/doc-conversion-service/commit/ece951a))
-   docs(routes): add apidocs for options methods ([ed7a8f7](https://github.com/Fdawgs/doc-conversion-service/commit/ed7a8f7))
-   docs(routes): add example authorization header to apidoc tags ([c2c96eb](https://github.com/Fdawgs/doc-conversion-service/commit/c2c96eb))
-   docs(routes): add missing apiname tags ([f6165e3](https://github.com/Fdawgs/doc-conversion-service/commit/f6165e3))
-   docs(routes): update example options method calls ([234cef7](https://github.com/Fdawgs/doc-conversion-service/commit/234cef7))
-   docs(routes): update html route name tags ([1fd81a4](https://github.com/Fdawgs/doc-conversion-service/commit/1fd81a4))
-   style(tests): replace double quotation with single in import ([76d6785](https://github.com/Fdawgs/doc-conversion-service/commit/76d6785))
-   fix(routes): add cors support for all request methods ([5d2d6f0](https://github.com/Fdawgs/doc-conversion-service/commit/5d2d6f0))
-   feat(routes): add cors support ([3b3e734](https://github.com/Fdawgs/doc-conversion-service/commit/3b3e734))

### BREAKING CHANGE

-   routing configuration moved into `routes` property object of `serverConfig` variable in `config.js`

## <small>3.0.1 (2020-03-16)</small>

-   chore: update lockfile ([4081025](https://github.com/Fdawgs/doc-conversion-service/commit/4081025))
-   chore(config): rename config properties to reflect content ([87ab5e0](https://github.com/Fdawgs/doc-conversion-service/commit/87ab5e0))
-   chore(deps-dev): bump eslint-config-airbnb-base from 14.0.0 to 14.1.0 ([05fb91e](https://github.com/Fdawgs/doc-conversion-service/commit/05fb91e))
-   chore(deps-dev): bump eslint-plugin-json from 2.1.0 to 2.1.1 ([a2a374d](https://github.com/Fdawgs/doc-conversion-service/commit/a2a374d))
-   chore(deps): bump sanitize-middleware from 1.0.1 to 2.0.0 ([296778e](https://github.com/Fdawgs/doc-conversion-service/commit/296778e))
-   style: replace snakecase with camelcase ([8ca5307](https://github.com/Fdawgs/doc-conversion-service/commit/8ca5307))
-   fix(config): name of property ([b486f9d](https://github.com/Fdawgs/doc-conversion-service/commit/b486f9d))
-   refactor(config): change to use new sanitize middleware structure ([368ac52](https://github.com/Fdawgs/doc-conversion-service/commit/368ac52))

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
