/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

'use strict';

var buffer = require('buffer');
var cloneOrPull = require('git-clone-or-pull');
var cacheDir = require('cache-directory');

function rewrite(buf, rules, cb) {
	var str;

	if (buffer.isBuffer(buf)) {
		str = buf.toString();
	} else if (typeof buf === 'string') {
		str = buf;
	} else {
		cb(null, new Error('Argument was not a string or buffer'));
	}

	// TODO
}

function loadRules(dir, cb) {
	// TODO
}

function updateRules(dir, cb) {
	if (typeof dir === 'function') {
		cb = dir;
		dir = cacheDir('HTTPSize');
	}

	cloneOrPull('https://github.com/EFForg/HTTPS-Everywhere.git', dir, cb);
}

module.exports = {};
module.exports.rewrite = rewrite;
module.exports.loadRules = loadRules;
module.exports.updateRules = updateRules;
