# Simple-boilerplate
A simple project boilerplate using gulp and associated plugins

## Installation instructions

### 1. Clone Github Repository
From the command-line enter:S
`git clone https://github.com/michaelkornblum/simple-boilerplate.git <directory> `

### 2. Install Node Modules
From the command-line, change directories into the newly cloned repo and enter:
`cd simple-boilerpate`
`npm install`

### 3. Start Server
From the command-line enter:
`gulp`

simple boilerplate is now ready to go.

## Working with HTML
All HTML pages should be placed in the `pages` directory. Pages can be complete HTML documents, or can use file includes to reduce copy / paste errors. Details on how to use file includes can be found [here](https://www.npmjs.com/package/gulp-file-include).

Files that are saved in the `pages` directory are processed by gulp and output in `build/[filename].html`

## Working with Sass/CSS
Simple-boilerplate uses Sass as its default CSS preprocessor, but this doesn't mean that you have to write all of your style markups in Sass for it to work. The only Sass file required is `styles/scss/main.scss`. This file is used (in the very least) to import other stylesheets into a main document. To see import in action, see [this helpful article](http://sass-lang.com/guide). 

Files created in `styles/scss` are compiled and moved to `build/main.css`.

**Note:** Simple-boilerplate uses the node.js implementation of Sass. This means that frameworks like Bourbon, Neat, Compass and Susy may not work.

### For Those Who Don't Like Sass 
It is possible to convert regular CSS files into Sass automatically. Just put your CSS files into the `styles/css` directory. When simple-boilerplate runs, it will convert CSS files into Sass and move the results into `styles/scss`.

## Working with JavaScript
Simple-boilerplate uses browserify to manage JavaScript modules. The required required javascript file is `scripts/app.js` which is used to import other modules into a main JavaScript file. Using this approach, it is possible to import both custom created modules as well as those imported by the node package manager. To see browserify in action, visit their [project page](browserify.org).

All files in the `scripts` directory are compiled and sent to `build/app.js`.

## Working with Images
Simple-boilerplate uses gulp-imagemin to optimize images for faster load time. Accepted file types are .jpg, jpeg, gif and ..png. Simply place image files in the `images` directory and the results will be sent to `build/images'.

## The Joys of Browser-Sync
Simple-boilerplate uses browser-sync as a live development server. As files are changed in your `build` directory are updaed, browser-sync reloads the web page you're working on to reflect those changes. Browser-sync automatically starts with the initial `gulp` command with no further configuration needed.
