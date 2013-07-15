/*
 * Copyright (c) 2013 Soulberto Lorenzo <slorenzot@gmail.com>
 *
 * Licensed under MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * brackets-regextester
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, exports, require */

define(function (require, exports, module) {
    'use strict';
    var EditorManager       = brackets.getModule("editor/EditorManager"),
        CommandManager      = brackets.getModule("command/CommandManager"),
        Menus               = brackets.getModule("command/Menus"),
        Dialogs             = brackets.getModule("widgets/Dialogs"),
        DocumentManager     = brackets.getModule("document/DocumentManager"),
        StringUtils         = brackets.getModule("utils/StringUtils"),
        PanelManager        = brackets.getModule("view/PanelManager"),
        ExtensionUtils      = brackets.getModule("utils/ExtensionUtils");

    var Commands    = require('Commands'),
        Languages   = require('Strings'),
        Shortcuts   = require('Shortcuts'),
        Utils       = require('Utils'),
        panelHTML   = require("text!panel.html");

    var userLanguage = brackets.app.language,
        langs = Languages.Strings(userLanguage);

    var panel, selectedText = '';
    var $regexp = null,
        $subject = null,
        $output = null,
        $casesense = null,
        $testRegExpCmd = null,
        $matchRegExpCmd = null;

    /*jslint regexp: true */
    var regexp = {
        is_regexp: function (text) {
            return (/^\/(.*)\/$/).test(text);
        },
        test: function (string, tests, casesense) {
            var options = casesense ? 'i' : '', regExp = new RegExp(string, options);
            
            return regExp.test(tests);
        },
        match: function (string, tests, casesense) {
            var options = casesense ? 'i' : '', regExp = new RegExp(string, options);
            
            return regExp.exec(tests);
        }
    };
    /*jslint regexp: false */

    var editMenu             = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);

    /**
     * Register commands
     */
    var regextest_cmd = CommandManager.register(
        langs.CMD_TEST_REGEXP,
        Commands.CMD_TEST_REGEXP,
        function () {
            panel.show();
        }
    );

    if (editMenu) {
        editMenu.addMenuDivider();
        editMenu.addMenuItem(
            Commands.CMD_TEST_REGEXP,
            Shortcuts.allPlatforms.CMD_TEST_REGEXP_NOW,
            editMenu.LAST_IN_SECTION
        );
    }

    regextest_cmd.setChecked(false); // disabled command //prueba//

    $(EditorManager).on("activeEditorChange",
        function (event, current, previous) {
            var editor = EditorManager.getActiveEditor();

            $(editor).on('cursorActivity', function () {
                selectedText = editor.getSelectedText(); // get selected text, if there is

                if (editor.hasSelection() && regexp.is_regexp(selectedText)) {
                    regextest_cmd.setEnabled(true);
                    $regexp.val(selectedText);
                } else {
                    regextest_cmd.setChecked(false);
                }
            });
        });
    
    // Insert CSS for this extension
    ExtensionUtils.loadStyleSheet(module, "style.css");
    
    if (!panel) {
        var $panel = $(panelHTML);
        
        panel = PanelManager.createBottomPanel("panel-brackets-regextester", $panel);
        
        $regexp = $("#panel-brackets-regextester-regexp"); // regexp textbox
        $subject = $("#panel-brackets-regextester-subject"); // string textbox
        $output = $("#panel-brackets-regextester-output"); // output textbox
        $casesense = $("#panel-brackets-regextester-caseunsense");
        
        $testRegExpCmd = $("#panel-brackets-regextester-test");
        $matchRegExpCmd = $("#panel-brackets-regextester-match");
        
        $testRegExpCmd.on("click", function () {
            var out = regexp.test($regexp.val(), $subject.val(), $casesense.is(":checked"));
            
            if (out) {
                $output.empty().append("Successfull match");
            } else {
                $output.empty().append("No match");
            }
        });
        
        $matchRegExpCmd.on("click", function () {
            $output.empty(); // clean output panel
            
            try {
                var out = regexp.match($regexp.val(), $subject.val(), $casesense.is(":checked"));
                out.shift(); // remove array first element
                
                out.forEach(function (element) {
                    $("<span/>")
                        .addClass("regex-match-result-tag")
                        .text(element)
                        .appendTo($output);
                });
                
            } catch (e) {
                $output.append("No matches");
            }
        });
    }
    
    panel.hide();
});