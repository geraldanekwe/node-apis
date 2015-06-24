var api = {
  fs: require("fs"),
  http: require("http"),
  url: require('url'),
  md5: require("blueimp-md5").md5,
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  },
  multiply: function(a, b) {
    return a * b;
  },
  divide: function(a, b) {
    return a / b;
  },
  isWord: function(word) {
    return word.length > 0;
  },
  counter: function(text) {
    var wordsMatch = text.match(/\w+/g) || {
      length: 0
    };
    var numbersMatch = text.match(/[0-9]/g) || {
      length: 0
    };
    var spacesMatch = text.match(/\s/g) || {
      length: 0
    };
    return {
      characters: text.length,
      words: wordsMatch.length,
      spaces: spacesMatch.length,
      numbers: numbersMatch.length
    };
  }
};

api.http.createServer(responseHandler).listen(8888);

function responseHandler(request, response) {
  if (request.url.match("/gravatarUrl/")) {
    var email = request.url.replace(/[\/][A-z]+[\/]/g, '');
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.write("http://www.gravatar.com/avatar/" + api.md5(email));
    response.end();
  } else if (request.url.match("/Calc/")) {
    var expression = request.url.replace(/[\/][A-z]+[\/]/g, '');
    var expressionArr = expression.match(/(^[\d]+)(\D)([\d]+)/);
    var var1 = parseInt(expressionArr[1]);
    var var2 = parseInt(expressionArr[3]);
    if (expressionArr[2] === "+") {
      var result = api.add(var1, var2);
      response.write(expressionArr[0].toString() + " = ");
      response.write(result.toString());
      response.end();
    } else if (expressionArr[2] === "-") {
      var result = api.subtract(var1, var2);
      response.write(expressionArr[0].toString() + " = ");
      response.write(result.toString());
      response.end();
    } else if (expressionArr[2] === "*") {
      var result = api.multiply(var1, var2);
      response.write(expressionArr[0].toString() + " = ");
      response.write(result.toString());
      response.end();
    } else if (expressionArr[2] === "/") {
      var result = api.divide(var1, var2);
      response.write(expressionArr[0].toString() + " = ");
      response.write(result.toString());
      response.end();
    }

  } else if (request.url.match("/Counts/")) {
    var sentence = request.url.replace(/[\/][A-z]+[\/]/g, '').replace(/%20/g, " ");
    var result = api.counter(sentence);
    response.write(JSON.stringify(result));
    response.end();
  }
  response.end();
}
