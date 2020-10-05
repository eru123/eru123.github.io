(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = global || self), (global.RedMantisTextParser = factory()));
})(this, function () {
  "use strict";

  var target =
    typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : {};


  function toMarkdown(text){
    var rules = [
      [/#{1}\s?([^\n]+)\n/g,'<h1>$1</h1>'],
      [/#{2}\s?([^\n]+)\n/g,'<h2>$1</h2>'],
      [/#{3}\s?([^\n]+)\n/g,'<h3>$1</h3>'],
      [/#{4}\s?([^\n]+)\n/g,'<h4>$1</h4>'],
      [/#{5}\s?([^\n]+)\n/g,'<h5>$1</h5>'],
      [/#{6}\s?([^\n]+)\n/g,'<h6>$1</h6>'],
      [/([^\n]+)\n\s+=+/g,'<h1>$1</h1><hr />'],
      [/([^\n]+)\n\s+-+/g,'<h2>$1</h2><hr />'],
      [/\*\*([^\*]+)\*\*/g,'<b>$1</b>'],
      [/\*([^\*]+)\*/g,'<i>$1</i>'],
      [/__([^_]+)__/g,'<b>$1</b>'],
      [/_([^_]+)_/g,'<i>$1</i>'],
      [/((\n\d\..+)+)/g,'<ol>$1</ol>'],
      [/((\n\*.+)+)/g,'<ul>$1</ul>'],
      [/\n\d\.([^\n]+)/g,'<li>$1</li>'],
      [/\n\*([^\n]+)/g,'<li>$1</li>'],
      [/\!\[([^\]]+)\]\(([^\)]+)\s\"([^\"\)]+)\"\)/g,'<img src="$2" alt="$1" title="$3">'],
      [/\[([^\]]+)\]\(([^\)]+)\)/g,'<a href="$2" target="_blank">$1</a>'],
      [/([\n]+\n)/g,'<p>$1</p>'],
     ]

     rules.forEach(([rule,template]) => {
      text = text.replace(rule,template)
     })


    return text;
  }

  return {
    toMarkdown: toMarkdown
  }
});
