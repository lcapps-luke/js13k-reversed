/**
 * An object containing a configuration for the SwipeAnalog constructor.
 * @typedef {object} Config
 * @property {SwipeAnalog~onTrigger} onTrigger - The callback which gets triggered when
 *            the min amount of pixel has been swiped.
 * @property {Function} touchstart -
 *           The callback that gets called when the SwipeAnalog is touched
 * @property {SwipeAnalog~touchEndCallback} touchend -
 *           The callback that gets called when the SwipeAnalog is released
 * @property {number|undefined} min_swipe_distance - amount of pixels
 *           which the user needs to move or tap the SwipeAnalog before triggering a
 *           direction. E.g: 20
 * @property {boolean} log - Debug output iff a callback is not set.
 */

 /**
  * This callback is called when the amount of pixels swiped exceeds the
  * min_swipe_distance
  * @callback SwipeArea~onTrigger
  * @param {SwipeArea~Vector} vector - A normalized direction vector
  *        @property {Number} x - The x property
  *        @property {Number} y - The y property
  *        @property {Number} angle - The angle in radian
  *        @property {Number} degree - The angle in degree
  */

/**
 * A relative swipe area, which triggers after the user swiped a specified
 * amount of pixel and returns the swipe direction vector.
 * @param {HTMLElement|string} el - The HTML container element or its ID.
 * @param {Config} opts - Constructor config.
 * @constructor
 */
var SwipeAnalog = function(el, opts) {
  opts = opts || {}
  this.min_swipe_distance = opts.min_swipe_distance || 30;
  this.is_touch_down = false;
  this.has_triggered_for_current_swipe = false;
  this.start_position = {
    x: 0,
    y: 0
  };

  if (typeof el == "string") {
    el = document.getElementById(el);
  }
  this.container = el;

  var log_cb = function(name) {
    return function (data) {
      if (!opts.log) {
        return;
      }
      if (window.console && window.console.log) {
        window.console.log("swipe-area.js " + name + "(" +
                           Array.prototype.slice.call(arguments).join(", ") +
                           ");");
      }
    };
  };

  this.start_cb = opts["touchstart"] || log_cb("touchstart");
  this.move_cb = opts["touchmove"] || log_cb("touchmove");
  this.end_cb = opts["touchend"] || log_cb("touchend");
  this.trigger_cb = opts["onTrigger"] || log_cb("trigger");
  this.bindEvents();
};

SwipeAnalog.prototype = {

  /**
   * Binds touch and mouse events to handlers
   */
  bindEvents: function() {
    this.container.addEventListener("touchstart", this.onTouchStart.bind(this));
    this.container.addEventListener("touchmove", this.onTouchMove.bind(this));
    this.container.addEventListener("touchend", this.onTouchEnd.bind(this));
    //
    if (!("ontouchstart" in document.createElement("div"))) {
      this.container.addEventListener("mousedown", this.onTouchStart.bind(this));
      this.container.addEventListener("mousemove", this.onTouchMove.bind(this));
      this.container.addEventListener("mouseup", this.onTouchEnd.bind(this));
    }
  },

  /**
   * Triggered on touch start
   * @param {Event} e - An event
   */
  onTouchStart: function(e) {
    this.is_touch_down = true;
    this.setStartPosition(e);
    this.start_cb(e);
    e.preventDefault();
    this.container.className += " button-active";
  },

  /**
   * Triggered on touch move
   * @param {Event} e - An event
   */
  onTouchMove: function(e) {
    if (this.is_touch_down) {
      this.move_cb(e);
      if (this.has_triggered_for_current_swipe) return;
      var swipe_vector = this.getSwipeVector(e);
      if (swipe_vector) {
        this.has_triggered_for_current_swipe = true;
        this.trigger_cb(swipe_vector);
      }
    }
    e.preventDefault();
  },

  /**
   * Triggered on touch end
   * @param {Event} e - An event
   */
  onTouchEnd: function(e) {
    this.is_touch_down = false;
    this.has_triggered_for_current_swipe = false;
    this.end_cb(e);
    this.container.className = this.container.className.replace(/ button\-active/g, "");
    e.preventDefault();
  },

  /**
   * Sets the start position point
   * @param {Event} e - An event
   */
  setStartPosition: function(e) {
    var pos = this.getRelativePos(e);
    this.start_position = {
      x: pos.x,
      y: pos.y
    };
  },

  /**
   * Returns true if we swiped more than min swiped distance
   * @param {Event} e - An event
   * @return {object|null}
   */
  getSwipeVector: function(e) {
    var pos = this.getRelativePos(e);
    var vec = this.start_position;
    var swipe_vector = null;

    // Check if distance has been exceeded and calculate direction vector
    var distance = this.getDistanceBetweenTwoPoints(pos, vec);
    if (distance >= this.min_swipe_distance) {

      swipe_vector = this.getNormalizedVector({
        x: pos.x - vec.x,
        y: pos.y - vec.y
      });

      var angle = Math.atan2(swipe_vector.y, swipe_vector.x);
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      swipe_vector.angle = angle;
      swipe_vector.degree = Math.round(angle * 180 / Math.PI);
    }

    return swipe_vector;
  },

  /**
   * Returns the page offset of an event
   * @param {Event} e - An event
   * @return {Joystick~Coordinate}
   */
  getRelativePos: function(e) {
    var pos = this.getEventPoint(e);
    var rect = this.container.getBoundingClientRect();
    var x = (pos.x - rect.left - window.scrollX);
    var y = (pos.y - rect.top - window.scrollX);
    return { x: x, y: y };
  },

  /**
   * Returns the event point coordinates considering both touch and mouse events
   * @param {Event} e - An event
   * @return {DPad~Coordinate}
   */
  getEventPoint: function(e) {
    var out = { x: 0, y: 0 };
    if(e.touches && (e.type == 'touchstart' || e.type == 'touchmove' ||
      e.type == 'touchend' || e.type == 'touchcancel')) {
      var touch = e.targetTouches[0] || e.changedTouches[0] || e.touches[0];
      out.x = touch.pageX;
      out.y = touch.pageY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' ||
               e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' ||
               e.type=='mouseleave') {
      out.x = e.pageX;
      out.y = e.pageY;
    }
    return out;
  },

  /**
   * Returns a normlized vector
   * @param {Vector} vector
   * @return {Object}
   */
  getNormalizedVector: function(vec) {
    var len = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    return {
      x: (vec.x / len),
      y: (vec.y / len)
    }
  },

  /**
   * Returns the distance between two points
   * @param {Point} p1 - Format {x, y}
   * @param {Point} p2 - Format {x, y}
   * @return {Number}
   */
  getDistanceBetweenTwoPoints: function(p1, p2) {
    return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
  }

};