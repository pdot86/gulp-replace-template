var through = require('through2');

function replace (searchObj, options) {
  var keys = Object.keys(searchObj);
  var dataKeys = [];

  if (!options) {
    options = {};
  }

  if (options.prefix && options.suffix) {
    dataKeys = keys.map(function (v, i, a) {
      return new RegExp(options.prefix + v + options.suffix, "g");
    });
  } else if (options.prefix) {
    dataKeys = keys.map(function (v, i, a) {
      return new RegExp(options.prefix + v, "g");
    });
  } else if (options.suffix) {
    dataKeys = keys.map(function (v, i, a) {
      return new RegExp(options.suffix + v, "g");
    });
  } else {
    dataKeys = keys.map(function (v, i, a) {
      return new RegExp(v, "g");
    });
  }

  return through.obj(function (file, enc, cb) {
    var src = file.contents.toString();

    keys.forEach(function (v, i, a) {
      src = src.replace(dataKeys[i], searchObj[v]);
    });

    file.contents = new Buffer(src);
    this.push(file);
    cb();
  });
}

module.exports = replace;
