module.exports = {
    "extends": "airbnb",
    "rules": {
        /* "linebreak-style": ["error", "windows"],         */
        "linebreak-style": 0,        
        "indent": 0,
        "no-multi-spaces": 0,
        "no-alert": 0,
        "no-console": ["error", { allow: ["warn", "log", "error", "table", "dir"] }] ,
        "no-debugger": 0,
        /* jsdoc */
        "jsdoc/check-param-names": 1,
        "jsdoc/check-tag-names": 1,
        "jsdoc/check-types": 1,
        "jsdoc/newline-after-description": 1,
        "jsdoc/require-description-complete-sentence": 0,
        "jsdoc/require-example": 0,
        "jsdoc/require-hyphen-before-param-description": 1,
        "jsdoc/require-param": 1,
        "jsdoc/require-param-description": 0,        
        "jsdoc/require-param-name": 1,
        "jsdoc/require-param-type": 1,
        "jsdoc/require-returns-description": 1,
        "jsdoc/require-returns-type": 1
    },
    "plugins": [
        "babel",
        "jsdoc"
    ],
    "parser": "babel-eslint",
    /* "ecmaFeatures": {
        "classes": true,
    }, */
    "env": {
        "browser": true,  
        "node"   : true
    },
    "parserOptions": {
        "ecmaVersion": 6,

        "sourceType": "module",

        "ecmaFeatures": {

            "arrowFunctions": true,

            "binaryLiterals": true,

            "blockBindings": true,

            "classes": true,

            "defaultParams": true,

            "destructuring": true,

            "experimentalObjectRestSpread": true,

            "restParams": true,

            "forOf": true,

            "generators": true,

            "modules": false,

            "objectLiteralComputedProperties": true,

            "objectLiteralDuplicateProperties": true,

            "objectLiteralShorthandMethods": true,

            "objectLiteralShorthandProperties": true,

            "octalLiterals": true,

            "regexUFlag": true,

            "regexYFlag": true,

            "spread": true,

            "superInFunctions": true,

            "templateStrings": true,

            "unicodeCodePointEscapes": true,

            "globalReturn": true,

            "jsx": true
        }
    }
};