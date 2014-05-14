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

Create a aws.json file, then install dependencies:
```
$ grunt bowercopy
```
(Code to install Backbone, D3 and d3bb is included, but commented out in the Gruntfile copy settings and the index.html script links.)

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

##REsulting directory structure:

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