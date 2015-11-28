/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

 // Rect element ////////////////////////

var SVGBase = require ("./SVGBase.js").SVGBase;

Rect.type = "rect";
Rect.prototype = new SVGBase ();
Rect.prototype.parent = SVGBase.prototype;

Rect.prototype.constructor = Rect;
function Rect (x, y, width, height, style, zindex) {
  SVGBase.call (this, Rect.type, zindex, true);
  this.setPos (x, y);
  this.parent.setAttribute.call (this, "width", width);
  this.parent.setAttribute.call (this, "height", height);
  this.parent.setAttribute.call (this, "style", style);
};

Rect.prototype.setPos = function (x,y) {
  this.parent.setAttribute.call (this, "x", x);
  this.parent.setAttribute.call (this, "y", y);
};

Rect.prototype.getCenter = function () {
  var width = this.parent.getAttribute.call (this, "width");
  var height= this.parent.getAttribute.call (this, "height");
  return ({x:width/2, y:height/2});
}

/**
* Clones a Rectangle
* @returns - a new Rectangle object
*/
Rect.prototype.clone = function ()
{
  var clone = this.parent.clone.call (this);
  return Rect.adapt (clone);
}

/**
* Clones the Rectangle to the given coords array, using each coord pair
* as points for the rectangle
* @param {object} coords - array of coords ({x:val,y:val})
*/
Rect.prototype.cloneToCoords = function (coords)
{
  var results = [];
  for (var i = 1; i < coords.length; i++)
  {
    var rect = this.clone ();
    var x1 = coords[i-1];
    var x2 = coords[i];
    rect.setPos (x1.x, x1.y - 10); // TODO: real width here

    var vector = {x: x2.x - x1.x, y: x2.y - x1.y};
    var perp = {x: vector.y, y: -vector.x};
    var length = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
    var angleDeg = Math.atan2(x2.y - x1.y, x2.x - x1.x) * 180 / Math.PI;
    rect.parent.setAttribute.call (rect, "width", length);
    rect.parent.addRotate.call (rect, angleDeg, x1.x, x1.y);

    results.push(rect);
  }
  return results;
}

/**
* Update the object coordinates
* @param {object} coords - array of coords ({x:val, y:val})
*/
Rect.prototype.updateCoords = function (coords)
{
  var results = [];
  for (var i = 0; i < coords.length; i++)
  {
    var rect = this.clone ();
    rect.setPos (coords[i].x, coords[i].y);
    results.push (rect);
  }
  return results;
}

Rect.adapt = function (elem) {
  return SVGBase.prototype.adapt.call (elem, Rect.prototype);
}

exports.Rect = Rect;
