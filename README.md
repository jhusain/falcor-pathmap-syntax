# falcor-pathmap-syntax
ES6 Template String and Builder function for Creating Falcor Path Maps. Path Maps are an experimental feature that are not in Falcor Master.

## Usage

Importing the syntax and initializing a Falcor Model:

~~~js
var falcor = require('falcor');

var model = new falcor.Model({ source: new falcor.HttpDataSource('/model.json') });
~~~

Using a Path Map to retrieve data from a Falcor Model:

~~~js
var range = {length: 2};

var pmap = require('falcor-pathmap-syntax');

var results = 
  model.
    get(pmap`
      {
        genreLists: {
          [0..1]: {
            name,
            titles: {
              [${range}]: {
                name,
                rating,
                boxshot
              },
              length
            }
          },
          length
        }
      }`).
    then(({json}) => console.log(JSON.stringify(json,null,2)));
~~~

The code above is equivalent to the following:

~~~js
var range = {length: 2};

var results = 
  model.
    get(
      ["genreLists", {to:1}, "name"],
      ["genreLists", {to:1}, "titles", range, ["name","rating","boxshot"]],
      ["genreLists", {to:1}, "titles", "length"],
      ["genreLists", "length"]).
    then(({json}) => console.log(JSON.stringify(json,null,2)));  
~~~
