A javbascript project template using bower for dependency management and grunt for workflow automation.

##Beginning directory struction:

...
├── Gruntfile.js
├── README.md
├── SpecRunner.html
├── bower.json
├── build
├── config/
│   └── aws.json.example
├── package.json
├── spec/
│   ├── MainSpec.js
│   └── SpecHelper.js
├── src/
│   ├── Robots.txt
│   ├── images
│   ├── index.html
│   ├── scripts/
│   │   ├── lib
│   │   └── main.js
│   └── style/
│       ├── app.css
│       └── skeleton.css
├── test/
...

##Installation

Remove git repository:
...
$ rm -rf .git
...

Install grunt components:
...
$ npm install
...

Install dependencies:
...
$ grunt bowercopy
...
(Code to install Backbone, D3 and d3bb is included, but commented out in the Gruntfile copy settings and the index.html script links.)

reinitialize git repository
...
$ git init
$ git add .
$ git ci -m "initial commit"
...

initialize git-flow
...
$ git flow init
...
