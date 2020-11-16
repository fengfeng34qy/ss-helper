/*
Language: CSS
Category: common, css
Website: https://developer.mozilla.org/en-US/docs/Web/CSS
*/
export default function (hljs) {
  var FUNCTION_LIKE = {
    begin: /[\w-]+\(/,
    returnBegin: true,
    contains: [{
      className: 'built_in',
      begin: /[\w-]+/
    }, {
      begin: /\(/,
      end: /\)/,
      contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.CSS_NUMBER_MODE]
    }]
  };
  var ATTRIBUTE = {
    className: 'attribute',
    begin: /\S/,
    end: ':',
    excludeEnd: true,
    starts: {
      endsWithParent: true,
      excludeEnd: true,
      contains: [FUNCTION_LIKE, hljs.CSS_NUMBER_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, hljs.C_BLOCK_COMMENT_MODE, {
        className: 'number',
        begin: '#[0-9A-Fa-f]+'
      }, {
        className: 'meta',
        begin: '!important'
      }]
    }
  };
  return {
    name: 'CSS',
    case_insensitive: true,
    illegal: /[=\/|'\$]/,
    contains: [hljs.C_BLOCK_COMMENT_MODE, {
      className: 'selector-id',
      begin: /#[A-Za-z0-9_-]+/
    }, {
      className: 'selector-class',
      begin: /\.[A-Za-z0-9_-]+/
    }, {
      className: 'selector-attr',
      begin: /\[/,
      end: /\]/,
      illegal: '$',
      contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
    }, {
      className: 'selector-pseudo',
      begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
    }, // matching these here allows us to treat them more like regular CSS
    // rules so everything between the {} gets regular rule highlighting,
    // which is what we want for page and font-face
    {
      begin: '@(page|font-face)',
      lexemes: '@[a-z-]+',
      keywords: '@page @font-face'
    }, {
      begin: '@',
      end: '[{;]',
      // at_rule eating first "{" is a good thing
      // because it doesn’t let it to be parsed as
      // a rule set but instead drops parser into
      // the default mode which is how it should be.
      illegal: /:/,
      // break on Less variables @var: ...
      returnBegin: true,
      contains: [{
        className: 'keyword',
        begin: /@\-?\w[\w]*(\-\w+)*/
      }, {
        begin: /\s/,
        endsWithParent: true,
        excludeEnd: true,
        relevance: 0,
        keywords: "and or not only",
        contains: [{
          begin: /[a-z-]+:/,
          className: "attribute"
        }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.CSS_NUMBER_MODE]
      }]
    }, {
      className: 'selector-tag',
      begin: '[a-zA-Z-][a-zA-Z0-9_-]*',
      relevance: 0
    }, {
      begin: '{',
      end: '}',
      illegal: /\S/,
      contains: [hljs.C_BLOCK_COMMENT_MODE, {
        begin: /(?:[A-Z\_\.\-]+|--[a-zA-Z0-9_-]+)\s*:/,
        returnBegin: true,
        end: ';',
        endsWithParent: true,
        contains: [ATTRIBUTE]
      }]
    }]
  };
}