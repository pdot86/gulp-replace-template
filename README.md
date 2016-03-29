#gulp-replace-template
===
Create your own templating syntax and replace with an object via gulp.

##Install

`npm install --save-dev gulp-replace-template`

===

##Usage

**In your gulpfile:**

```js
var gulp = require("gulp");
var replaceTemplate = require("gulp-replace-template");

gulp.task("replace", ["myDepTask"], function (cb) {
  return gulp.src(["**/*"])
          .pipe( replaceTemplate({
            repKeyA: "REPLACEMENT TEXT",
            repKeyB: "TEST",
            repKeyC: "WORLD!"
          }) )
          .pipe( gulp.dest("./dist") )
});
```

**In the file you want to process:**

```
This is a random text file.

Here is where I want my repKeyA.

Again, this is just a repKeyB.

HELLO repKeyC
```

**The output from the gulp task pipe:**

```
This is a random text file.

Here is where I want my REPLACEMENT TEXT.

Again, this is just a TEST.

HELLO WORLD!
```

###Advanced Usage:
You can also use it to create your own (not-so-smart) templating engine (sort-of).

**In your gulpfile:**

```js
var gulp = require("gulp");
var replaceTemplate = require("gulp-replace-template");

function _randomString (len) {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var output = "";

  for (var i = 0; i < len; i++) {
    var randomNum = Math.floor( Math.random() * (alphabet.length - 0) ) + 0;

    output += alphabet.charAt(randomNum);
  }

  return output;
}

gulp.task("replace", ["myDepTask"], function (cb) {
  return gulp.src(["**/*.js"])
          .pipe( replaceTemplate({
            generatedVarName: _randomString(12),
            generatedVarVal: Boolean(Math.floor(Math.random() * (1 - 0 + 1)) + 0),
            defaultValForX: "foo",
            newValForX: "bar"
          }) )
          .pipe( gulp.dest("./dist") )
});
```

**In the file you want to process:**

```js
var {{generatedVarName}} = {{generatedVarVal}};

var x = "{{defaultValForX}}";

if ({{generatedVarName}} >= 3) {
  x = "{{newValForX}}";
}
```

**The output from the gulp task pipe:**

```js
var vAbGbaxJxtnc = true;

var x = "foo";

if (vAbGbaxJxtnc >= 3) {
  x = "bar";
}
```

===

Influenced by https://github.com/caiguanhao/gulp-just-replace
