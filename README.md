# Service Now Api Module

## Table of Contents
* [Introduction](#introduction)
* [Installation](#installation)
* [Environment Variables](#required-environment-variables)
* [Usage](#usage)

## Introduction
This module provides service now api data for last 12 months in JSON format  .


## Installation
`npm install snow-api`

## Environment Variables

| Environment Variable   | Required? |
| ---------------------- | --------- |
| `SNOW_USERNAME`        | **Yes**   |
| `SNOW_PASSWORD`        | **Yes**   |
| `SNOW_URL`             | **Yes**   | 
| `GROUP_NAME`           | **Yes**   |                 

## URL fromat
Your url format should be like `https://URLNAME/api/now/table/{tablename}?sysparm_display_value=true&sysparm_query=sys_created_on>{dateparams}^assignment_group.name={groupname}&sysparm_fields={parameters}`  in which replace url name with specific url.

For example:
SNOW_URL = `https://servicenow.com/api/now/table/{tablename}?sysparm_display_value=true&sysparm_query=sys_created_on>${dateparams}^assignment_group.name=${groupname}&sysparm_fields=${parameters}`


## Usage
```js
const snow = require('snow-api');
//tablename = provide table name though which you want to filter data
//paramters = provide parameters in list...example ["number","state","assigned_to","priority","severity"]
snow.snowApi(tablename,parameters);

```
