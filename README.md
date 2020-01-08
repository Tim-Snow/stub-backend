# @hectorjs/stub-backend

## Quality measures

![](https://github.com/HecJimSan/stub-backend/workflows/%40hectorjs%2Fstub%2Dbackend/badge.svg)
 - ![](https://github.com/HecJimSan/stub-backend/workflows/eslint%2Dconfig%2Dgoogle/badge.svg)
 - ![](https://github.com/HecJimSan/stub-backend/workflows/Unit%20tests/badge.svg)
 - ![](https://github.com/HecJimSan/stub-backend/workflows/Coverage/badge.svg)
 - [![codecov](https://codecov.io/gh/HecJimSan/stub-backend/branch/development/graph/badge.svg)](https://codecov.io/gh/HecJimSan/stub-backend)

 Others measures

 - ![](https://img.shields.io/npm/v/@hectorjs/stub-backend?label=version&logo=npm)
 - ![](https://img.shields.io/npm/dt/@hectorjs/stub-backend?logo=npm&logoColor=blue)
 - ![](https://img.shields.io/snyk/vulnerabilities/npm/@hectorjs/stub-backend?logo=snyk)
 - ![](https://img.shields.io/github/last-commit/HecJimSan/stub-backend?logo=github)

# Description

The aim of this project is to mock backend services building different responses for a given authentication, cookie, request among others.

This project gives the chance to focus in your code reducing the amount of work mocking the dependencies. :smile:

# Install

```sh
npm install @hectorjs/stub-backend
```

# CLI

There is a command line to generate default methods like get, post, put, among others.
I recommend you to have a look. It will reduce the time to mock the services.

Have a look:

[@hectorjs/stub-cli](https://www.npmjs.com/package/@hectorjs/stub-cli)

## Methods availabe to mock at this moment

- [x] GET
- [x] HEAD
- [x] POST
- [x] PUT
- [x] DELETE
- [x] OPTIONS
- [x] TRACE
- [x] PATCH


# Usage
## Shortcut
### Install the library locally

#### Execute npm init with your data:
```
npm init -y
```
#### Install the library 
```
npm install @hectorjs/stub-backend
```

#### Use mock

Create a javascript file and add the library @hectorjs/stub-backend

```js
const hectorjs = require('@hectorjs/stub-backend')
```

#### Use hjs command

Include in your _package.json_ the _hjs_ command as script:

```json
  "scripts":{
    "hjs":"hjs"
  }
```

Note: You can check it running ```npm run hjs -- --version``` or ```hjs --version``` if you have install globally the [@hectorjs/stub-cli](https://www.npmjs.com/package/@hectorjs/stub-cli) package.

Hjs command can avoid the following steps because the cli generates all the folder , methods and endpoint for you. Just the data as identifiers, headers, cookies or bodies among others must be added manually.

### Structure

## Folder data

Create a folder named _resources_ and add a couple of json files under that folder (it does not matter the name of the files) with the properties.

```
 resources
    ¦
     - *.json
     - *.json
     - ...
```
The json must follow the next format:

### Method level 
The first key means the method and it must have a "_" as a prefix. For example:

```json
{
  "_get":{        
  },
  "_post":{       
  }    
}
```

### Path level

The next level means the endpoint. The path is written like theses examples:

  - /customers/names
  - /customers/{id}/name
  - /countries/{id}/product
  - /countries/{id}/population?town={param1}&postcode={param2}

     ```json
    {
      "_get":{
         "/customers/names":[
           {}
         ]
      },
      "_post":{
          "/countries/{id}/product":[
            {}
          ]
      }
    }
    ```
_NOTE_: id, param1 or param2 can be named as you want.

### Array of scenarios

An array of possible responses based on different identifiers.

Each scenario contains different properties like **_id**, **_headers**, **_cookies** or **_description** among others.

#### _[idsKeys]
Identifiers of a path. For example, given a path ```/customers/{id}/data```, the scenario with an id should be structured like this:
```json
  "/customers/{id}/data" : [
    {

      "_id": "chris"

    },
    {

      "_id": "fran"

    }
  ]
```
#### _headers

There are two different ways to validate the headers:

##### Validate by key
It is an array of header keys. Basically, it will validate if the request contains the header in the array. If the request does not contain the header, the service will return a 401 response.

```json
  "/customers/{id}/data" : [
    {
      "_headers": ["authorization", "client_Id"]
    }
  ]
```

Using _cli_ command:
```hjs generate get customers/{id}/data --headers authorization,client_Id```

##### Validate by key and value
It is an array of objects. The key is the header name and the value is the header value. You can see in the next example:


```json
  "/customers/{id}/data" : [
    {
      "_headers": [{"authorization":"1234"},{ "client_Id":"121"}]
    }
  ]
```

Using _cli_ command:
```hjs generate get customers/{id}/data --headers authorization,client_Id```

Set the key value headers manually.

_NOTE:_ If the scenario does not contain any headers section, the service won't check anything.
Capital letters are not allow in headers section.

#### _cookies

There are two different ways to validate the cookies:

##### Validate by key
It is an array of cookies keys. Basically, it will validate if the request contains the cookie in the array. If the request does not contain the cookie,the service will return a 401 response.

```json
  "/customers/{id}/data" : [
    {
      "_cookies": ["Universal", "sec"]
    }
  ]
```

_cli_: ```hjs generate get customers/{id}/data --cookies Universal,sec```

##### Validate by key and value 
It is an array of objects. The key is the header name and the value is the header value. You can see in the next example:

```json
  "/customers/{id}/data" : [
    {
      "_cookies": [{"Universal":"123"}, {"sec":"1232"}]
    }
  ]
```

_NOTE:_ If the scenario does not contain any cookies section, the service won't check anything.

#### _description
Brief explanation about the scenario.

```json
  "_description":"secure scenario given an authorization header"
```

_cli_: ```hjs generate get customers/{id}/data --description "Hello world"```

#### _status
Just in case the request contain the cookie and headers, you can set your own status or leave it 200 as default.

```json
  "_status":"500"
```

_cli_: ```hjs generate get customers/{id}/data --status 404```

#### _body
This section contains the response for a given request.

```json
  "_body": {
    "dummyResponse": "anyValue"
     
  }
```

#### _requestBody

Some methods like post, put or delete needs to verify the body response as well. **requestBody** is the request for a specific scenario.

```json
  "_requestBody": {
    "dummyRequestBody": "anyValue"
     
  }
```
_Note:_ If any field is missed, it means it is not required.

## Example

Below, we have a example:

```json
{
  "_get": {
    "/stories/{id}/person$": [
      {
        "_id": "Nathan",
        "_headers": [],
        "_description": "Get person details related to  Nathan without authentication",
        "_body": {
          "name": "Nathan"
        }
      },
      {
        "_id": "Lucas",
        "_headers": [],
        "_status": 304,
        "_description": "There won't be any response    because the status is 304",
        "_body": {
          "name": "Nathan"
        }
      },
      {
        "_id": "mark",
        "_headers": ["authorization"],
        "_cookies": [],
        "_description": "Get person details related to Mark     with authentication",
        "_body": {
          "name": "Mark"
        }
      }
    ],
  },
  "_post" :{
      "/stories/{id}/budget": [
        {
          "_id": "Nathan",
          "_headers": ["Client_id"],
          "_cookies": [
            "session-id",
            "key-id"
          ],
          "_description": "Get budget details related to  Nathan with authentication",
          "_requestBody": {
            "anyData": "anyData"
          },
          "_body": {
            "name": "Nathan"
          }
        }
      ]
  }
}
```

If you want to test it, copy the previous example and paste it in one of the json files. Then execute the following command:

```sh
node .\\node_modules\\@hectorjs\\stub-backend\\lib\\app.js
```
or with _cli_

```sh
hjs start
```

The service will be running in the port *3005* waiting for a request.

Make a request:

```sh
curl http://localhost:3005/stories/nathan/person
```

The response will be like this:

```json
{
    "name": "Nathan"
}
```

## Advance options

### Xml

This section is in progress. At this moment, the user can response a xml setting the **_xml** flag to true like the following scenario:

```json
{
 "_post" :{
      "/stories/{id}/budget": [
        {
          "_id": "Nathan",
          "_requestBody": "<xml><book><title>The lyon king</title></book></xml>",
          "_xml": true,
          "_body": "<xml><book><title>Flash</title></book></xml>"
        }
      ]
  }
}
```

### Config file
You can add your config file in the root of the mock service or in the root of the project. The name of the file must be _.hjs.config.json_

At this moment, the developer can use the following options:

#### corsOptions

You can add _corsOptions_ as the [cors library](https://www.npmjs.com/package/cors#configuring-cors) is doing. For example:

```json
{
  "corsOptions":{
    "origin": "http://your-url.com",
    "optionsSuccessStatus": 200
  }
}
```

#### logs

You can include the level of logs fot the mock using [morgan options](https://www.npmjs.com/package/morgan). For example: 

```json
{
  "logs": ":method :url :status :res[content-length] - :response-time ms"
}
```

#### port

Expecify the port. It is 3005 by default.

```json
{
  "port": 8081
}
```

# Respository

https://github.com/HecJimSan/stub-backend
