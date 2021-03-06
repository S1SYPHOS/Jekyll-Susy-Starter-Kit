# Jekyll/Susy Starter-Kit
[![Release](https://img.shields.io/github/release/S1SYPHOS/Jekyll-Susy-Starter-Kit.svg)](https://github.com/S1SYPHOS/Jekyll-Susy-Starter-Kit/releases) [![License](https://img.shields.io/github/license/S1SYPHOS/Jekyll-Susy-Starter-Kit.svg)](https://github.com/S1SYPHOS/Jekyll-Susy-Starter-Kit/blob/master/LICENSE) [![Issues](https://img.shields.io/github/issues/S1SYPHOS/Jekyll-Susy-Starter-Kit.svg)](https://github.com/S1SYPHOS/Jekyll-Susy-Starter-Kit/issues)

**You heard about Susy and want to use it on your next project? You also love Jekyll and don't want to miss it? Then THIS is for you!**

Here's my personal Jekyll+Susy-Starter-Kit - starring:
+ [Jekyll](http://jekyllrb.com/) - a blog-aware, static site generator.
+ [Susy](http://susy.oddbird.net/) - a sass grid framework.

## The Stack
All you need to get started:
- [Ruby](http://www.ruby-lang.org/): Required for Jekyll.
- [Node.js](http://nodejs.org/) and [NPM](https://npmjs.org/): Required for Grunt & Grunt-plugins.
- [Grunt](http://gruntjs.com/): Automates development.
- [Bower](http://bower.io/): Manages frontend dependencies.
- [Bundler](http://bundler.io/): Manages Ruby dependencies.

### The Setup
- Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
- Install [Node.js](http://nodejs.org/) and [NPM](https://npmjs.org/)
- Install [Grunt](http://gruntjs.com/): `npm install -g grunt-cli`
- Install [Bower](http://bower.io/): `npm install -g bower`
- Install [Bundler](http://bundler.io/): `gem install bundler`

## The Dependencies
Now it's time to install the project's dependencies:
- NPM: `npm cache clean && npm install`
- Bower: `bower install`
- Bundler: `bundle install`

## The Grunt
Everything's ready to get started right away - here's my Grunt workflow:
- `grunt dev`: Compiles SASS, builds the site and opens it in the default browser, watches for changes and injects them right away.
- `grunt prod`: Builds a bleeding edge website into the `build` directory.
- `grunt check`: Checks code quality of SASS and JS files, Jekyll health and also for outdated packages.

**It's possible to get started even quicker - with `bundle exec jekyll serve`**

## Special Thanks
I'd like to thank everybody that's making great software - you people are awesome. Also I'm always thankful for feedback and bug reports :)
