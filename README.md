# Cirrus Authentication Module

## Table of Contents
* [Introduction](#introduction)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Environment Variables](#required-environment-variables)
* [Usage](#usage)

## Introduction
This module provides service now api data for last 12 months in JSON format  .

## Prerequisites

### Express.js
### moment
### node-rest-client
```

## Installation
`npm install snow-api`

## Environment Variables

| Environment Variable   | Required? |
| ---------------------- | --------- |
| `SNOW_USERNAME`        | **Yes**   |
| `SNOW_PASSWORD`        | **Yes**   |
| `SNOW_URL`             | **Yes**   |                 




## Usage
```js
const snow = require('snow-api');
//tablename = provide table name though which you want to filter data
//groupname = provide group name though which you want to filter data
//paramters = provide parameters in list...example["a","b"]
snow.snowApi(tablename,groupname,parameters);

```
