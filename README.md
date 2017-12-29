# Fables Frontend

This was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Localization is provided by [react-localization](https://github.com/stefalda/react-localization). State management by [redux](http://redux.js.org/). Animations by [react-motion](https://github.com/chenglou/react-motion).

#### First Time Set Up
`yarn install` or `npm i`

#### Development
`npm start`

#### Production
`npm run build`

#### Additional Configuration

You may wish to use the [redux devtools extension](https://github.com/zalmoxisus/redux-devtools-extension) to easily navigate the redux store and relevant actions. You will just need to install the [extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).

## Globals
Should you need to alter any global variables contained within the project such as the CDN base or the Google Analytics UA you can do so by editing `const.js` located in the path below.

```
fables
└── src
    └── const.js  
```
