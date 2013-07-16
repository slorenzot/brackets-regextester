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
/*global define, exports, require */

define(function (require, exports, module) {
    'use strict';
    
    var _languages = {
        'en': {
            // commands
            "CMD_TEST_REGEXP"                  : 'Show regular expression panel',
            "UI_LABEL_REGEXP"                  : "Regular expression",
            "UI_LABEL_SUBJECT"                 : "Subject string",
            "UI_LABEL_OUTPUT"                   : "Command output",
            "UI_CHECK_UPPERCASESENSE"          : "Not distinguish between uppercase and lowercase",
            "UI_INSERTCODE_BUTTON"             : "Inser code",
            "UI_BUTTON_CHECKEXPRESSION"        : "Check expression",
            "UI_BUTTON_SHOWMATCHES"            : "Show matches",
            "UI_LABEL_NOMATCHES"               : "No matches",
            "UI_LABEL_SUCESSMATCH"             : "Succesfull match",
            "UI_LABEL_NOMATCH"                 : "No match"
        },
        'es': {
            // commands
            "CMD_TEST_REGEXP"                  : 'Mostrar panel de expresiones regulares',
            "UI_LABEL_REGEXP"                  : "Expresi&oacute;n regular",
            "UI_LABEL_SUBJECT"                 : "Aplicar a cadena",
            "UI_LABEL_OUTPUT"                   : "Salida del comando",
            "UI_CHECK_UPPERCASESENSE"          : "No distinguir entre may&uacute;sculas y min&uacute;sculas",
            "UI_INSERTCODE_BUTTON"             : "Insertar c&oacute;digo",
            "UI_BUTTON_CHECKEXPRESSION"        : "Validar expresi&oacute;n",
            "UI_BUTTON_SHOWMATCHES"            : "Mostrar coincidencias",
            "UI_LABEL_NOMATCHES"               : "No hay coincidencias",
            "UI_LABEL_SUCESSMATCH"             : "Comparaci&oacute;n exitosa",
            "UI_LABEL_NOMATCH"                 : "No coincide"
        }
    };
    
    function getLanguage(lang_flag) {
        var def_language = "en-US",
            _lang = lang_flag.split('-')[0] || lang_flag;
        
        return _languages[_lang] || _languages[def_language];
    }
    
    exports.Strings = getLanguage;
});