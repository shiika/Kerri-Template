"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _initializer = require("./initializer.js");

var _htmlParser = require("./html-parser.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Welcome to Typed.js!
 * @param {string} elementId HTML element ID _OR_ HTML element
 * @param {object} options options object
 * @returns {object} a new Typed object
 */
var Typed =
/*#__PURE__*/
function () {
  function Typed(elementId, options) {
    _classCallCheck(this, Typed);

    // Initialize it up
    _initializer.initializer.load(this, options, elementId); // All systems go!


    this.begin();
  }
  /**
   * Toggle start() and stop() of the Typed instance
   * @public
   */


  _createClass(Typed, [{
    key: "toggle",
    value: function toggle() {
      this.pause.status ? this.start() : this.stop();
    }
    /**
     * Stop typing / backspacing and enable cursor blinking
     * @public
     */

  }, {
    key: "stop",
    value: function stop() {
      if (this.typingComplete) return;
      if (this.pause.status) return;
      this.toggleBlinking(true);
      this.pause.status = true;
      this.options.onStop(this.arrayPos, this);
    }
    /**
     * Start typing / backspacing after being stopped
     * @public
     */

  }, {
    key: "start",
    value: function start() {
      if (this.typingComplete) return;
      if (!this.pause.status) return;
      this.pause.status = false;

      if (this.pause.typewrite) {
        this.typewrite(this.pause.curString, this.pause.curStrPos);
      } else {
        this.backspace(this.pause.curString, this.pause.curStrPos);
      }

      this.options.onStart(this.arrayPos, this);
    }
    /**
     * Destroy this instance of Typed
     * @public
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.reset(false);
      this.options.onDestroy(this);
    }
    /**
     * Reset Typed and optionally restarts
     * @param {boolean} restart
     * @public
     */

  }, {
    key: "reset",
    value: function reset() {
      var restart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      clearInterval(this.timeout);
      this.replaceText('');

      if (this.cursor && this.cursor.parentNode) {
        this.cursor.parentNode.removeChild(this.cursor);
        this.cursor = null;
      }

      this.strPos = 0;
      this.arrayPos = 0;
      this.curLoop = 0;

      if (restart) {
        this.insertCursor();
        this.options.onReset(this);
        this.begin();
      }
    }
    /**
     * Begins the typing animation
     * @private
     */

  }, {
    key: "begin",
    value: function begin() {
      var _this = this;

      this.typingComplete = false;
      this.shuffleStringsIfNeeded(this);
      this.insertCursor();
      if (this.bindInputFocusEvents) this.bindFocusEvents();
      this.timeout = setTimeout(function () {
        // Check if there is some text in the element, if yes start by backspacing the default message
        if (!_this.currentElContent || _this.currentElContent.length === 0) {
          _this.typewrite(_this.strings[_this.sequence[_this.arrayPos]], _this.strPos);
        } else {
          // Start typing
          _this.backspace(_this.currentElContent, _this.currentElContent.length);
        }
      }, this.startDelay);
    }
    /**
     * Called for each character typed
     * @param {string} curString the current string in the strings array
     * @param {number} curStrPos the current position in the curString
     * @private
     */

  }, {
    key: "typewrite",
    value: function typewrite(curString, curStrPos) {
      var _this2 = this;

      if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
        this.el.classList.remove(this.fadeOutClass);
        if (this.cursor) this.cursor.classList.remove(this.fadeOutClass);
      }

      var humanize = this.humanizer(this.typeSpeed);
      var numChars = 1;

      if (this.pause.status === true) {
        this.setPauseStatus(curString, curStrPos, true);
        return;
      } // contain typing function in a timeout humanize'd delay


      this.timeout = setTimeout(function () {
        // skip over any HTML chars
        curStrPos = _htmlParser.htmlParser.typeHtmlChars(curString, curStrPos, _this2);
        var pauseTime = 0;
        var substr = curString.substr(curStrPos); // check for an escape character before a pause value
        // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
        // single ^ are removed from string

        if (substr.charAt(0) === '^') {
          if (/^\^\d+/.test(substr)) {
            var skip = 1; // skip at least 1

            substr = /\d+/.exec(substr)[0];
            skip += substr.length;
            pauseTime = parseInt(substr);
            _this2.temporaryPause = true;

            _this2.options.onTypingPaused(_this2.arrayPos, _this2); // strip out the escape character and pause value so they're not printed


            curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);

            _this2.toggleBlinking(true);
          }
        } // check for skip characters formatted as
        // "this is a `string to print NOW` ..."


        if (substr.charAt(0) === '`') {
          while (curString.substr(curStrPos + numChars).charAt(0) !== '`') {
            numChars++;
            if (curStrPos + numChars > curString.length) break;
          } // strip out the escape characters and append all the string in between


          var stringBeforeSkip = curString.substring(0, curStrPos);
          var stringSkipped = curString.substring(stringBeforeSkip.length + 1, curStrPos + numChars);
          var stringAfterSkip = curString.substring(curStrPos + numChars + 1);
          curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
          numChars--;
        } // timeout for any pause after a character


        _this2.timeout = setTimeout(function () {
          // Accounts for blinking while paused
          _this2.toggleBlinking(false); // We're done with this sentence!


          if (curStrPos >= curString.length) {
            _this2.doneTyping(curString, curStrPos);
          } else {
            _this2.keepTyping(curString, curStrPos, numChars);
          } // end of character pause


          if (_this2.temporaryPause) {
            _this2.temporaryPause = false;

            _this2.options.onTypingResumed(_this2.arrayPos, _this2);
          }
        }, pauseTime); // humanized value for typing
      }, humanize);
    }
    /**
     * Continue to the next string & begin typing
     * @param {string} curString the current string in the strings array
     * @param {number} curStrPos the current position in the curString
     * @private
     */

  }, {
    key: "keepTyping",
    value: function keepTyping(curString, curStrPos, numChars) {
      // call before functions if applicable
      if (curStrPos === 0) {
        this.toggleBlinking(false);
        this.options.preStringTyped(this.arrayPos, this);
      } // start typing each new char into existing string
      // curString: arg, this.el.html: original text inside element


      curStrPos += numChars;
      var nextString = curString.substr(0, curStrPos);
      this.replaceText(nextString); // loop the function

      this.typewrite(curString, curStrPos);
    }
    /**
     * We're done typing all strings
     * @param {string} curString the current string in the strings array
     * @param {number} curStrPos the current position in the curString
     * @private
     */

  }, {
    key: "doneTyping",
    value: function doneTyping(curString, curStrPos) {
      var _this3 = this;

      // fires callback function
      this.options.onStringTyped(this.arrayPos, this);
      this.toggleBlinking(true); // is this the final string

      if (this.arrayPos === this.strings.length - 1) {
        // callback that occurs on the last typed string
        this.complete(); // quit if we wont loop back

        if (this.loop === false || this.curLoop === this.loopCount) {
          return;
        }
      }

      this.timeout = setTimeout(function () {
        _this3.backspace(curString, curStrPos);
      }, this.backDelay);
    }
    /**
     * Backspaces 1 character at a time
     * @param {string} curString the current string in the strings array
     * @param {number} curStrPos the current position in the curString
     * @private
     */

  }, {
    key: "backspace",
    value: function backspace(curString, curStrPos) {
      var _this4 = this;

      if (this.pause.status === true) {
        this.setPauseStatus(curString, curStrPos, true);
        return;
      }

      if (this.fadeOut) return this.initFadeOut();
      this.toggleBlinking(false);
      var humanize = this.humanizer(this.backSpeed);
      this.timeout = setTimeout(function () {
        curStrPos = _htmlParser.htmlParser.backSpaceHtmlChars(curString, curStrPos, _this4); // replace text with base text + typed characters

        var curStringAtPosition = curString.substr(0, curStrPos);

        _this4.replaceText(curStringAtPosition); // if smartBack is enabled


        if (_this4.smartBackspace) {
          // the remaining part of the current string is equal of the same part of the new string
          var nextString = _this4.strings[_this4.arrayPos + 1];

          if (nextString && curStringAtPosition === nextString.substr(0, curStrPos)) {
            _this4.stopNum = curStrPos;
          } else {
            _this4.stopNum = 0;
          }
        } // if the number (id of character in current string) is
        // less than the stop number, keep going


        if (curStrPos > _this4.stopNum) {
          // subtract characters one by one
          curStrPos--; // loop the function

          _this4.backspace(curString, curStrPos);
        } else if (curStrPos <= _this4.stopNum) {
          // if the stop number has been reached, increase
          // array position to next string
          _this4.arrayPos++; // When looping, begin at the beginning after backspace complete

          if (_this4.arrayPos === _this4.strings.length) {
            _this4.arrayPos = 0;

            _this4.options.onLastStringBackspaced();

            _this4.shuffleStringsIfNeeded();

            _this4.begin();
          } else {
            _this4.typewrite(_this4.strings[_this4.sequence[_this4.arrayPos]], curStrPos);
          }
        } // humanized value for typing

      }, humanize);
    }
    /**
     * Full animation is complete
     * @private
     */

  }, {
    key: "complete",
    value: function complete() {
      this.options.onComplete(this);

      if (this.loop) {
        this.curLoop++;
      } else {
        this.typingComplete = true;
      }
    }
    /**
     * Has the typing been stopped
     * @param {string} curString the current string in the strings array
     * @param {number} curStrPos the current position in the curString
     * @param {boolean} isTyping
     * @private
     */

  }, {
    key: "setPauseStatus",
    value: function setPauseStatus(curString, curStrPos, isTyping) {
      this.pause.typewrite = isTyping;
      this.pause.curString = curString;
      this.pause.curStrPos = curStrPos;
    }
    /**
     * Toggle the blinking cursor
     * @param {boolean} isBlinking
     * @private
     */

  }, {
    key: "toggleBlinking",
    value: function toggleBlinking(isBlinking) {
      if (!this.cursor) return; // if in paused state, don't toggle blinking a 2nd time

      if (this.pause.status) return;
      if (this.cursorBlinking === isBlinking) return;
      this.cursorBlinking = isBlinking;

      if (isBlinking) {
        this.cursor.classList.add('typed-cursor--blink');
      } else {
        this.cursor.classList.remove('typed-cursor--blink');
      }
    }
    /**
     * Speed in MS to type
     * @param {number} speed
     * @private
     */

  }, {
    key: "humanizer",
    value: function humanizer(speed) {
      return Math.round(Math.random() * speed / 2) + speed;
    }
    /**
     * Shuffle the sequence of the strings array
     * @private
     */

  }, {
    key: "shuffleStringsIfNeeded",
    value: function shuffleStringsIfNeeded() {
      if (!this.shuffle) return;
      this.sequence = this.sequence.sort(function () {
        return Math.random() - 0.5;
      });
    }
    /**
     * Adds a CSS class to fade out current string
     * @private
     */

  }, {
    key: "initFadeOut",
    value: function initFadeOut() {
      var _this5 = this;

      this.el.className += " ".concat(this.fadeOutClass);
      if (this.cursor) this.cursor.className += " ".concat(this.fadeOutClass);
      return setTimeout(function () {
        _this5.arrayPos++;

        _this5.replaceText(''); // Resets current string if end of loop reached


        if (_this5.strings.length > _this5.arrayPos) {
          _this5.typewrite(_this5.strings[_this5.sequence[_this5.arrayPos]], 0);
        } else {
          _this5.typewrite(_this5.strings[0], 0);

          _this5.arrayPos = 0;
        }
      }, this.fadeOutDelay);
    }
    /**
     * Replaces current text in the HTML element
     * depending on element type
     * @param {string} str
     * @private
     */

  }, {
    key: "replaceText",
    value: function replaceText(str) {
      if (this.attr) {
        this.el.setAttribute(this.attr, str);
      } else {
        if (this.isInput) {
          this.el.value = str;
        } else if (this.contentType === 'html') {
          this.el.innerHTML = str;
        } else {
          this.el.textContent = str;
        }
      }
    }
    /**
     * If using input elements, bind focus in order to
     * start and stop the animation
     * @private
     */

  }, {
    key: "bindFocusEvents",
    value: function bindFocusEvents() {
      var _this6 = this;

      if (!this.isInput) return;
      this.el.addEventListener('focus', function (e) {
        _this6.stop();
      });
      this.el.addEventListener('blur', function (e) {
        if (_this6.el.value && _this6.el.value.length !== 0) {
          return;
        }

        _this6.start();
      });
    }
    /**
     * On init, insert the cursor element
     * @private
     */

  }, {
    key: "insertCursor",
    value: function insertCursor() {
      if (!this.showCursor) return;
      if (this.cursor) return;
      this.cursor = document.createElement('span');
      this.cursor.className = 'typed-cursor';
      this.cursor.innerHTML = this.cursorChar;
      this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
    }
  }]);

  return Typed;
}();

exports.default = Typed;