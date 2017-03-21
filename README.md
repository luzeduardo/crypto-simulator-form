# Crypto Simulator Form

[![npm version](https://img.shields.io/npm/v/crypto-simulator-form.svg?style=flat-square)](https://www.npmjs.com/package/crypto-simulator-form)
[![build status](https://img.shields.io/travis/luzeduardo/crypto-simulator-form/master.svg?style=flat-square)](https://travis-ci.org/luzeduardo/crypto-simulator-form)

The package is based on [react-npm-boilerplate](https://github.com/juliancwirko/react-npm-boilerplate)
It includes linting with [ESLint](http://eslint.org/) and testing with [Mocha](https://mochajs.org/), [Enzyme](http://airbnb.io/enzyme/) and [JSDOM](https://github.com/tmpvar/jsdom).

## Usage

1. Inside your project `npm install crypto-simulator-form`
2. `import Simulador from 'crypto-simulator-form';`
3. `<Simulador uri="service URL" serverAddress="http://serverXYZ"/>`
4. The informed server must return the encrypted data as querystring
5. It will send the data defined to the endpoint you want and redirect you after to the server you informed with the querystring appended.`<Simulador uri="service URL" serverAddress="http://serverXYZ"/>`


## Render
![Alt text](/print.png?raw=true "Rendered")
