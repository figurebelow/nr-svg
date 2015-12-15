/**
* @license
* Copyright 2015 Ruben Afonso, ruben@figurebelow.com
*
* This source code is licensed under the Apache license found in the
* LICENSE file in the root directory of this source tree.
**/

var Functions = require ("../Utils.js");

/**
 * http://struct.cc/blog/2011/08/15/strange-attractors/
 */
function Attractor (numPoints, entryString, width, height)
{

  // Fractal pattern and coefficients.
  var a = [];
  var res = [];

  // Parameters.
  var x = 0.1, y = 0.1;
  var r = 360 % entryString.length;

  // Initialize coefficients.
  for (i = 0; i < entryString.length; i++)
  {
    a[i] = (entryString.charCodeAt(i) - 65 - 12) / 10;
  }
  res.push ({x:(width/2) + 50 * Math.cos(r),y:(height/2) + 58 * Math.sin(r), r:0});
  for (i = 0; i < numPoints; i++)
  {
    var nx = a[0] + a[1]  * x + a[2]  * x * x
            + a[3] * x * y + a[4]  * y + a[5]  * y * y;
    var ny = a[6] + a[7]  * x + a[8]  * x * x
            + a[9] * x * y + a[10] * y + a[11] * y * y;
    x = nx; y = ny;
    var xvalue = (width/2)*x;
    xvalue += width/2;
    var yvalue = (height/2)*y;
    yvalue += height/2;
    var previousPoint = res[res.length-1];
    res.push ({x:xvalue, y:yvalue,
               r: Functions.calculateAngle (previousPoint, {x:xvalue, y:yvalue})});
  }
  return res;
}

/**
  Rossler Attractor code.
  http://paulbourke.net/fractals/rossler/
*/
//function Rossler (numPoints, a, b, c, h, x0, y0, scale, width, height)
function Rossler (params)
{
  function rosslerPoint (x, y, z, a, b, c) {
    var dx = -(y + z);
    var dy = x + a * y;
    var dz = b + z * (x - c);
    return {x:dx, y:dy, z:dz};
  };

  var center = {x: params.width/2, y: params.height/2};   // center in the screen
  var x = params.x0 || 0.1;
  var y = params.y0 || 0.1;
  var z = 0.1;
  var tmpx = 0, tmpy = 0, tmpz =0;
  var res = [];
  for (var i = 0; i < params.points; i++)
  {
    var dt = rosslerPoint (x, y, z, params.a, params.b, params.c);
    tmpx = x + params.h * dt.x;
    tmpy = y + params.h * dt.y;
    tmpz = z + params.h * dt.z;
    //if (Math.abs(tmpx*20 - x*20) > 5 || Math.abs(tmpy*20 - y*20) > 5)
    res.push ({x: tmpx * params.scale + center.x, y: tmpy * params.scale + center.y, z:tmpz});
    x = tmpx;
    y = tmpy;
    z = tmpz;
  }
  return res;
}

/**
  Lorentz Attractor code.
  http://www.algosome.com/articles/lorenz-attractor-programming-code.html
*/
function Lorentz (params)
{
  function rosslerPoint (x, y, z, a, b, c) {
    var dx = a * (y - x);
    var dy = x * (b - z) - y;
    var dz = x * y - c * z;
    return {x:dx, y:dy, z:dz};
  };

  var center = {x: params.width/2, y: params.height/2};   // center in the screen
  var x = params.x0 || 0.1;
  var y = params.y0 || 0.1;
  var z = 0.1;
  var tmpx = 0, tmpy = 0, tmpz =0;
  var res = [];
  for (var i = 0; i < params.points; i++)
  {
    var dt = rosslerPoint (x, y, z, params.a, params.b, params.c);
    tmpx = x + params.h * dt.x;
    tmpy = y + params.h * dt.y;
    tmpz = z + params.h * dt.z;
    res.push ({x: tmpx * params.scale + center.x, y: tmpy * params.scale + center.y, z:tmpz});
    x = tmpx;
    y = tmpy;
    z = tmpz;
  }
  return res;
}

/**
 * Returns a grid of x,y values
 * @param {number} x - number of points
 * @param {number} width - total width
 * @param {number} height - total height
 * @return {array} list of values {x:val, y:val}
 */
function Grid (params)
{
  console.log(params)
  var points = [];
  var xspan = params.width / (params.xrows || 10);
  var yspan = params.height / (params.yrows || 10);
  console.log(xspan, yspan)
  for (var ypoints = 1; ypoints < params.yrows ; ypoints++)
    for (var xpoints = 1;  xpoints < params.xrows; xpoints++)
    {
      points.push ({x: xpoints * xspan, y: ypoints * yspan});
    }
  return points;
}
exports.Attractor = Attractor;
exports.Rossler = Rossler;
exports.Lorentz = Lorentz;
exports.Grid = Grid;
