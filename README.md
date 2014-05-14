A javbascript project template using bower for dependency management and grunt for workflow automation.

##Beginning directory structure:

```
├── build/
├── config/
│   └── aws.json.example
├── spec/
│   ├── MainSpec.js
│   └── SpecHelper.js
├── src/
│   ├── Robots.txt
│   ├── images
│   ├── index.html
│   ├── scripts/
│   │   ├── lib/
│   │   └── main.js
│   └── style/
│       ├── app.css
│       └── skeleton.css
├── test/
├── .bowerrc
├── .gitignore
├── Gruntfile.js
├── README.md
├── SpecRunner.html
├── bower.json
└── package.json
```

##Installation

Remove git repository:
```
$ rm -rf .git
```

Install grunt components:
```
$ npm install
```

Create an config/aws.json file with your s3 bucket credentials (or with empty strings, if that's not set up yet), then install dependencies:
```
$ grunt bowercopy
```

reinitialize git repository
```
$ git init
$ git add .
$ git ci -m "initial commit"
```

initialize git-flow
```
$ git flow init
```

##Resulting directory structure:

```
├── build/
│   └── minified, concatenates, optomized files ready to be deployed ...
├── bower/
│   └── bower package files ...
├── config/
│   └── aws.json.example
├── spec/
│   ├── MainSpec.js
│   └── SpecHelper.js
├── src/
│   ├── Robots.txt
│   ├── images
│   ├── index.html
│   ├── scripts/
│   │   ├── lib/
│   │   │   └── jquer.js, etc. ...
│   │   └── main.js
│   └── style/
│       ├── app.css
│       └── skeleton.css
├── test/
│   └── jasmine.js, sinon and other testing source files ...
├── .bowerrc
├── .gitignore
├── Gruntfile.js
├── README.md
├── SpecRunner.html
├── bower.json
└── package.json
```

###What goes in which directory

* **build:** Minified, concatenated, optimized code waiting to be deployed
* **bower:** Home for the bower package files. The important files will be copied to the src/scripts/lib/ directory by grunt-bowercopy
* **config:** This is where the aws credentials json file resides, along with any other project config files you might need.
* **spec:** Test spec files goe here.
* **src:** Your development code goes here.
* **test:** Home for the code that runs your tests.

##Resources and documentation

* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
  * [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
  * [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
  * [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
  * [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin)
  * [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
  * [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
  * [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-concat)
  * [grunt-processhtml](https://github.com/dciccale/grunt-processhtml)
  * [grunt-bowercopy](https://github.com/timmywil/grunt-bowercopy)
  * [grunt-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)
  * [grunt-s3](https://github.com/pifantastic/grunt-s3)
* [git-flow](https://github.com/nvie/gitflow)
  * ["A successful branching model" blog post](http://nvie.com/posts/a-successful-git-branching-model/)
  * [Bitbucket git workflow tutorial](https://www.atlassian.com/git/workflows#!workflow-overview)
  * [How Github does it (an alternative view)](http://scottchacon.com/2011/08/31/github-flow.html)
* [Jasmine](http://jasmine.github.io/2.0/introduction.html)
  * ["How do I Jasmin" tutorial](http://evanhahn.com/how-do-i-jasmine/)
* [Sinon.js](http://sinonjs.org/)
