# doc-conversion-service

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/doc-conversion-service.svg)](https://github.com/Fdawgs/doc-conversion-service/releases/latest/) 
[![Build Status](https://travis-ci.org/Fdawgs/doc-conversion-service.svg?branch=master)](https://travis-ci.org/Fdawgs/doc-conversion-service) [![Coverage Status](https://coveralls.io/repos/github/Fdawgs/doc-conversion-service/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/doc-conversion-service?branch=master) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&identifier=235116799)](https://dependabot.com) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Intro

This RESTful API web service for converting clinical documents/files was created out of a need to replace a previously purchased PDF-to-HTML conversion tool at [Yeovil District Hospital NHSFT](https://yeovilhospital.co.uk/). The tool, that was no longer supported, would produce unreadable documents with issues such as text running off the page, paragraphs overlapping each other, and Windows-1252 to UTF-8 character encoding problems.

GP surgeries were recieving these documents through MESH and were unable to read a number of them, leading to them requesting a copy of the original document to be faxed over.

The web service was then extended to allow for the conversion of files to Binary and DocumentReference STU3 (3.0.1) HL7 FHIR resources adhering to the NHS INTEROPen CareConnect profiles.

# Prerequisites

