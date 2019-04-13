"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlParser = exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * TODO: These methods can probably be combined somehow
 * Parse HTML tags & HTML Characters
 */
var HTMLParser =
/*#__PURE__*/
function () {
  function HTMLParser() {
    _classCallCheck(this, HTMLParser);
  }

  _createClass(HTMLParser, [{
    key: "typeHtmlChars",

    /**
     * Type HTML tags & HTML Characters
     * @param {string} curString Current string
     * @param {number} curStrPos Position in current string
     * @param {Typed} self instance of Typed
     * @returns {number} a new string position
     * @private
     */
    value: function typeHtmlChars(curString, curStrPos, self) {
      if (self.contentType !== 'html') return curStrPos;
      var curChar = curString.substr(curStrPos).charAt(0);

      if (curChar === '<' || curChar === '&') {
        var endTag = '';

        if (curChar === '<') {
          endTag = '>';
        } else {
          endTag = ';';
        }

        while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
          curStrPos++;

          if (curStrPos + 1 > curString.length) {
            break;
          }
        }

        curStrPos++;
      }

      return curStrPos;
    }
    /**
     * Backspace HTML tags and HTML Characters
     * @param {string} curString Current string
     * @param {number} curStrPos Position in current string
     * @param {Typed} self instance of Typed
     * @returns {number} a new string position
     * @private
     */

  }, {
    key: "backSpaceHtmlChars",
    value: function backSpaceHtmlChars(curString, curStrPos, self) {
      if (self.contentType !== 'html') return curStrPos;
      var curChar = curString.substr(curStrPos).charAt(0);

      if (curChar === '>' || curChar === ';') {
        var endTag = '';

        if (curChar === '>') {
          endTag = '<';
        } else {
          endTag = '&';
        }

        while (curString.substr(curStrPos - 1).charAt(0) !== endTag) {
          curStrPos--;

          if (curStrPos < 0) {
            break;
          }
        }

        curStrPos--;
      }

      return curStrPos;
    }
  }]);

  return HTMLParser;
}();

exports.default = HTMLParser;
var htmlParser = new HTMLParser();
exports.htmlParser = htmlParser;