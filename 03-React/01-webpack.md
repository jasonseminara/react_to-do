#5. Exercise 5 

##THE FRONT END!

We're about to implement a front-end rendered completely in the browser.

###Step 1: Webpack Configuration.
Before we do anything, we need to set up **webpack** and our local resources. Webpack compiles our es6, JSX, css, html, and all of our React framework into web- and browser-safe JavaScript. Webpack is not only for React; it's simply a compiler. **Babel** does all the heavy lifting of translating the es6 and JSX into es5.

``` 
npm i -D babel babel-core babel-loader babel-preset-es2015 babel-preset-react bootstrap css-loader dotenv extract-text-webpack-plugin file-loader html-webpack-plugin html-webpack-template react react-bootstrap react-dom style-loader url-loader webpack 
```
We're installing this with the `-D` flag, meaning `--save-dev`, since we only need this locally. When the code goes live, we'll generate all our assets for distribution.

####Babel Config
I've included the config for babel in a file called `.babelrc`. It contains all the directives for the babel compilation. Notice the part about `transform-strict-mode`. Babel will automatically insert `strict mode` into our final `main.js` so we don't have to deal with that mess over and over again. SWEEET.

Copy the file `/starter_resources/webpack.config.js` into the root of your project. Don't make any changes in this file. This is your _boilerplate_ compiler. 


###Step 2. Let's make some NPM shortcuts to control the building and rebuilding of our application.

Edit your `package.json` and make sure you have at least the following:
```
  "private": true,
  "scripts": {
    "clean": "rm -rf dist && rm -rf node_modules",
    "heroku-prebuild": "scripts/deployment_react.sh",
    "heroku-postbuild": "scripts/deployment_cleanup.sh",
    "start": "node server.js",
    "rebuild": "webpack -d --progress --colors"
    "watch": "webpack -d --watch --progress --colors"
  },
```

###Step 3. Let's make sure we've built everything properly.
Delete `node_modules` and run `npm run rebuild`
