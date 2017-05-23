# THE FRONT END!
## React

We're about to implement a front-end rendered completely in the browser.

### Step 1: Webpack Configuration.
Before we do anything, we need to set up **webpack** and our local resources. Webpack compiles our es6, JSX, css, html, and all of our React framework into web- and browser-safe JavaScript. Webpack is not only for React; it's simply a compiler. **Babel** does all the heavy lifting of translating the es6 and JSX into es5.
> Notice in `package.json` that babel is only used for development. When the code goes live, we'll generate all our assets before deployment. 

> In other words, we don't need Babel in production.

#### Babel Config
We've included the config for babel in a file called `.babelrc`. It contains all the directives for the babel compilation. Notice the part about `transform-strict-mode`. Babel will automatically insert `strict mode` into our final `main.js` so we don't have to deal with that mess over and over again. SWEEET.

Notice the file `webpack.config.js` in the root of your project. Don't make any changes in this file. This is your _boilerplate_ compiler. 

### Step 2. Dissecting webpack.config.js

The first ting to notice about webpack is that it's not some abstract configuration— it's actually javascript. A scripting language for the configuration of our 'compiler'.

#### How does it work?
![Dependency Tree](https://cloud.githubusercontent.com/assets/1918677/17348553/e434117e-58e4-11e6-988d-f99c385d1030.png)
> This is an actual visualization of this current project. That huge amount of stuff in the middle is the React framework.
> (_see_ https://github.com/webpack/webpack/issues/690)

Webpack analyzes your project by starting at some file and building a tree of dependencies. It then walks through each of those files, searching for further dependencies. Given this dependency tree, the system can learn a lot about your application:

  1. **Dependency Injection**: if we can find all the components that have no dependencies, we can grab them first and give them to whomever needs them (i.e. components that have no 'out' arrows are created/fetched first)
  2. **Orphan handling**: if a piece of your code is never referenced, it will never be created in the tree, thus it'll be ignored.
  3. **De-duplication**: many things may depend on the same component; let's just build it once, and use it wherever it's needed.

#### The syntax

Towards the top of the file, we have the `entry`point for webpack. This is where we want webpack to start its search for our application. Once the tree is analyzed and the work is done (see below), we'll need to know where to `output` the results. 

```javascript
const config = {
  entry: `${APP_DIR}/main.js`,
  output: {
    path: BUILD_DIR,
    filename: '/js/[name].js',
  },
...
}
```
> The `[name]` variable is the filename of the `entry` file, (e.g. `main`).


Towards the bottom of the file, we have `module` declaration. This section tells webpack what to do when it encounters certain file types. In the snippet below, we're mapping filetypes to certain loaders (plugins that know how to handle/read/load the types).

```javascript
module : {
    loaders: [
      { test: /\.css$/,  loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.(png|gif|jpg)$/,  loader: 'file-loader?name=/images/[name].[ext]' },
      { test: /\.jsx?$/, loader: 'babel'       }, 
...
]}
```
> You can see that we're using the `ExtractTextPlugin` to read in and copy css files; `file-loader` to read in and copy any images; and `babel` to transpile and build out our React/jsx files.

The middle of the file contains all the `plugin` definitions. One plugin of note is the `HtmlWebpackPlugin`. 

```javascript
new HtmlWebpackPlugin({
      title: 'Tasks',
      xhtml: true,
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'container'
    }),
```
>This dynamically builds out an HTML file for us based on an internal template. We can even tell it to generate a `<div id="container">` from which to hang our react app.

