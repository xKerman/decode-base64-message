// -*- coding: utf-8 -*-

'use strict';

var contextMenu = require('context-menu');
var selection = require('selection');

var Base64 = require('./base64').Base64;


var isBase64 = function (str) {
    return str.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,3}$/.test(str);
};

exports.main = function (options, callbacks) {
    var menuItem = contextMenu.Item({
        label: 'decode as base64',
        context: contextMenu.SelectionContext(),
        contentScript: [
            "self.on('click', function (node, data) {",
            "    self.postMessage('clicked');",
            "});"
        ].join('\n'),
        onMessage: function (message) {
            var target = selection.text.trim();
            if (!isBase64(target)) {
                return;
            }
            selection.text = Base64.decode(target);
        }
    });
};
