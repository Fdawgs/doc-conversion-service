# doc-conversion-service

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/doc-conversion-service.svg)](https://github.com/Fdawgs/doc-conversion-service/releases/latest/) 
[![Build Status](https://travis-ci.org/Fdawgs/doc-conversion-service.svg?branch=master)](https://travis-ci.org/Fdawgs/doc-conversion-service) [![Coverage Status](https://coveralls.io/repos/github/Fdawgs/doc-conversion-service/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/doc-conversion-service?branch=master) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&identifier=235116799)](https://dependabot.com) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Intro

This RESTful API web service for converting clinical documents/files was created out of a need to replace a previously purchased PDF-to-HTML conversion tool at [Yeovil District Hospital NHSFT](https://yeovilhospital.co.uk/). The tool, that was no longer supported, would produce unreadable documents with issues such as text running off the page, paragraphs overlapping each other, and Windows-1252 to UTF-8 character encoding problems.

GP surgeries were recieving these documents through MESH and were unable to read a number of them, leading to them requesting a copy of the original document to be faxed over.

The web service was then extended to allow for the conversion of files to [Binary](https://www.hl7.org/fhir/STU3/binary.html) and [DocumentReference](https://www.hl7.org/fhir/STU3/documentreference.html) STU3 (3.0.1) HL7® FHIR® resources adhering to the [NHS INTEROPen CareConnect profiles](https://nhsconnect.github.io/CareConnectAPI/).

# Prerequisites
-   [Node.js](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com)

# Deployment

## Standard deployment

1. Navigate to the repo
2. Run `yarn install` to install dependencies
3. Configure the application in `src/config.js`
4. Run `yarn start`

The Express server should now be up and running on the port set in the config. You should see the following output:

```
doc-conversion-service listening for requests at http://127.0.0.1:8204
```

## Setting up as a Windows Service

Yeovil District Hospital is heavily invested in Microsoft's ecosystem.
As such, this implementation uses the [winser](https://github.com/jfromaniello/winser) package to allow the Node.js application to be deployed as a Windows Service.

### To install as a service:

1. Navigate to the repo
2. Run `yarn install` to install dependencies
3. Configure the application in `src/config.js`
4. Run `yarn install-windows-service` as administrator
5. The service should now be visible in Services

**Note:** When you change any settings in the configuration file, you will need to restart the service for the changes to take effect.

### To uninstall the service:

1. Navigate to the repo
2. Run `yarn uninstall-windows-service` as administrator
3. The service will be uninstalled silently

# Contributing

Please see [CONTRIBUTING.md](https://github.com/Fdawgs/doc-conversion-service/blob/master/CONTRIBUTING.md) for more details regarding contributing to this project.

# License

`doc-conversion-service` is licensed under the [MIT](https://github.com/Fdawgs/doc-conversion-service/blob/master/LICENSE) license.