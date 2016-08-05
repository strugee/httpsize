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
var path = require('path');
var fs = require('fs');
var cloneOrPull = require('git-clone-or-pull');
var cacheDir = require('cache-directory');
var dirUtil = require('node-dir');
var DOMParser = require('xmldom').DOMParser;

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
	if (typeof dir === 'function') {
		cb = dir;
		dir = path.join(cacheDir('HTTPSize'), 'repo/src/chrome/content/rules');
	}

	dirUtil.readFiles(dir, {
		match: /.xml$/
	}, function(err, content, next) {
		if (err) {
			cb(err, null);
			return;
		}

		// TODO handle parser errors and warnings
		var doc = new DOMParser().parseFromString(content, 'application/xml');
		var rulesetElements = doc.getElementsByTagName('ruleset');
		for (let i = 0; i < rulesetElements.length; i++) {
			var ruleset = new Map();
			var el = rulesetElements[i];

			// Name
			ruleset.name = el.getAttribute('name');

			// Default off
			ruleset.defaultOff = el.getAttribute('default_off') || null;

			// Mixed Content
			ruleset.mixedContent = el.getAttribute('platform') === 'mixedcontent';

			// Targets
			var targets = el.getElementsByTagName('target');
			ruleset.targets = [];
			for (let j = 0; j < targets.length; j++) {
				ruleset.targets.push(targets[j].getAttribute('host'));
			}

			// Exclusions
			var exclusions = el.getElementsByTagName('exclusions');
			ruleset.exclusions = [];
			for (let j = 0; j < exclusions.length; j++) {
				ruleset.exclusions.push(exclusions[j].getAttribute('pattern'));
			}

			// Rules
			var rules = el.getElementsByTagName('rule');
			ruleset.rules = [];
			for (let j = 0; j < rules.length; j++) {
				var rule = {
					from: rules[j].getAttribute('from'),
					to: rules[j].getAttribute('to')
				};
				ruleset.rules.push(rule);
			}

			// TODO <securecookie>s

			// TODO <test>s

			// TODO downgrades
		}

		next();
	});
}

function updateRules(dir, cb) {
	// TODO ensure cache directory exists
	if (typeof dir === 'function') {
		cb = dir;
		dir = path.join(cacheDir('HTTPSize'), 'repo');
	}

	cloneOrPull('https://github.com/EFForg/HTTPS-Everywhere.git', dir, cb);
}

module.exports = {};
module.exports.rewrite = rewrite;
module.exports.loadRules = loadRules;
module.exports.updateRules = updateRules;
