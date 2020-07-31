# doc-conversion-service

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/doc-conversion-service.svg)](https://github.com/Fdawgs/doc-conversion-service/releases/latest/)
[![Build Status](https://travis-ci.org/Fdawgs/doc-conversion-service.svg?branch=master)](https://travis-ci.org/Fdawgs/doc-conversion-service) [![Coverage Status](https://coveralls.io/repos/github/Fdawgs/doc-conversion-service/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/doc-conversion-service?branch=master) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

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

1. Make a copy of `.env.template` in the root directory and rename to `.env`
2. Configure the application using the global variables in `.env`
3. Run `docker-compose up`

### Deploying using PM2

It is [recommended](https://expressjs.com/en/advanced/pm.html) that you use a process manager such as [PM2](https://pm2.keymetrics.io/) when deploying Express applications like this into production.

1. Navigate to the repo
2. Run `yarn install` to install dependencies
3. Make a copy of `.env.template` in the root directory and rename to `.env.production`
4. Configure the application using the global variables in `.env.production`
5. Run `yarn docs` to generate api documentation
6. Run `yarn global add pm2` to install pm2 globally
7. Launch application with `pm2 start .pm2.config.js`
8. Check the application has been deployed using `pm2 list` or `pm2 monit`

#### To install as a Windows service:

Yeovil District Hospital is heavily invested in Microsoft's ecosystem; as such the service can be deployed on Windows as a service.

1. Run `yarn global add @fdawgs/pm2-windows-service` to install [pm2-windows-service](https://classic.yarnpkg.com/en/package/@fdawgs/pm2-windows-service)
2. PM2 creates a default PM2 home folder under `C:/Users/<username>/.pm2` after its first run; copy the folder to a system accessible level i.e. `C:/.pm2`
3. Create a new PM2_HOME system variable and set the value to `C:/.pm2`
4. Create a new PM2_SERVICE_PM2_DIR system variable and set to where PM2 is installed i.e. `C:/USERS/USER/APPDATA/ROAMING/NPM/node_modules/pm2/index.js`
5. Run `pm2 start .pm2.config.js` to start the application
6. Run `pm2 save` to save the process list
7. Run `pm2-service-install` to install as a service, perform the environment setup when prompted if you have not completed steps 3 and 4

When the service starts or restarts, it will start all the applications saved in the process list.
To uninstall the service run `pm2-service-uninstall`.

**Note:** PM2 has been configured to automatically restart the application if modifications are made to `src/config.js`.

## Contributing

Please see [CONTRIBUTING.md](https://github.com/Fdawgs/doc-conversion-service/blob/master/CONTRIBUTING.md) for more details regarding contributing to this project.

## License

`doc-conversion-service` is licensed under the [MIT](https://github.com/Fdawgs/doc-conversion-service/blob/master/LICENSE) license.
