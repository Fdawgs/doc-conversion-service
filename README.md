# doc-conversion-service

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/doc-conversion-service.svg)](https://github.com/Fdawgs/doc-conversion-service/releases/latest/)
![CI](https://github.com/Fdawgs/doc-conversion-service/workflows/CI/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/Fdawgs/doc-conversion-service/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/doc-conversion-service?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/Fdawgs/doc-conversion-service/badge.svg)](https://snyk.io/test/github/Fdawgs/doc-conversion-service) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> RESTful API web service for converting clinical documents/files

## Intro

This RESTful API web service converts files from:

-   PDF or RTF to HTML
-   PDF to TXT
-   Any file format to [Binary](https://www.hl7.org/fhir/STU3/binary.html) STU3 (3.0.1) HL7® FHIR® resource adhering to its [NHS INTEROPen CareConnect profile](https://nhsconnect.github.io/CareConnectAPI/api_documents_binary.html)
-   Any file format to [DocumentReference](https://www.hl7.org/fhir/STU3/documentreference.html) STU3 (3.0.1) HL7® FHIR® resource adhering to its [NHS INTEROPen CareConnect profile](https://nhsconnect.github.io/CareConnectAPI/api_documents_documentreference.html)

It was initially created to replace a previously purchased PDF-to-HTML conversion tool at [Yeovil District Hospital NHSFT](https://yeovilhospital.co.uk/). The tool, that was no longer supported, would produce unreadable documents with issues such as text running off the page, paragraphs overlapping each other, and Windows-1252 to UTF-8 character encoding problems. GP surgeries were receiving these documents through [MESH](https://digital.nhs.uk/services/message-exchange-for-social-care-and-health-mesh) and were unable to read a number of them, leading to requests for the original document to be faxed over.

## Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com)
-   Linux only: latest available `poppler-data` and `poppler-utils` binaries
-   Linux and macOS only: latest available `unrtf` binary

## Deployment

### Standard deployment

1. Navigate to the repo
2. Run `yarn install` to install dependencies
3. Make a copy of `.env.template` in the root directory and rename to `.env.production`
4. Configure the application using the global variables in `.env.production`
5. Run `yarn docs` to generate api documentation
6. Run `yarn start`

The Express server should now be up and running on the port set in the config. You should see the following output:

```
doc-conversion-service listening for requests at http://0.0.0.0:3000
```

You can now navigate to http://0.0.0.0:3000/api/docs to view documentation!

### Deploying using Docker

This requires [Docker](https://www.docker.com/products) installed.

1. Make a copy of `.env.template` in the root directory and rename to `.env.production`
2. Configure the application using the global variables in `.env.production`
3. Run `docker-compose up`

### Deploying using PM2

It is [recommended](https://expressjs.com/en/advanced/pm.html) that you use a process manager such as [PM2](https://pm2.keymetrics.io/) when deploying Express applications like this into production.

1. Navigate to the repo
2. Run `yarn install` to install dependencies
3. Make a copy of `.env.template` in the root directory and rename to `.env.production`
4. Configure the application using the global variables in `.env.production`
5. Run `yarn docs` to generate api documentation
6. Run `yarn global add pm2` to install pm2 globally
7. Launch application with `pm2 start .pm2.config.js --env production`
8. Check the application has been deployed using `pm2 list` or `pm2 monit`

#### To install as a Windows service:

Yeovil District Hospital is heavily invested in Microsoft's ecosystem; utilise [pm2-installer](https://github.com/jessety/pm2-installer) to easily install PM2 as a Windows service.

**Note:** PM2 has been configured to automatically restart the application if modifications are made to `.env.development` or `.env.production`.

## Contributing

Please see [CONTRIBUTING.md](https://github.com/Fdawgs/doc-conversion-service/blob/master/CONTRIBUTING.md) for more details regarding contributing to this project.

## License

`doc-conversion-service` is licensed under the [MIT](https://github.com/Fdawgs/doc-conversion-service/blob/master/LICENSE) license.
