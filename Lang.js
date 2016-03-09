
/**
 * Lang class: language class
 * @version 1.15.02
 * @author AlexB (abarre.wordpress.com) aka TKeePeR
 */
 /**
  * Notes:
  *  - add 'Lang' to Application.js -> requires: [ 'Lang']
  *  - to change a language at start: Lang.setCurrentLang(language)
  *  - usage : i8n('global.ok') for example
  */
Ext.define('Lang',{
    singleton : true

    ,config : {
        currentLang : null,
        defaultLang : 'fr'
    }

    ,strings: {
        'fr_FR' : {
            global: { // 
                btn_save: "Sauvegarder"
                ,search: "Chercher"
                ,ok: "OK"
                ,cancel: "Annuler"
                ,none: "Aucun"
                ,update_list: "MàJ" // obsolete
                ,update: "MàJ"
                ,filters: "Filtres"
                ,export: "Export"
            }
        }
        ,'us_US' : { // Common labels
            global: {
                btn_save: "Save"
                ,search: "Search"
                ,ok: "OK"
                ,cancel: "Cancel"
                ,none: "None"
                ,update_list: "Update"
                ,export: "Export"
            }
        }

        // shortcuts
        ,fr : 'fr_FR'
        ,en : 'us_US'
        ,us : 'us_US'
    }

    ,getStrings: function(lang) {
        if (!lang || !Ext.isDefined(this.strings[lang]))
            lang=this.getDefaultLang();
        if (Ext.isString(this.strings[lang])) // got an aliase
            lang = this.strings[lang];
        return Ext.isDefined(this.strings[lang])
                ? this.strings[lang]
                : { };
    }

    ,t : function(label, lang) {
        var path = label.toLowerCase().split('.'),
            p = this.getStrings(lang); // strings
        for (var i = 0; i<path.length; i++) {
            if (Ext.isDefined( p[ path[i] ]))
                p = p[ path[i] ];
            else return '<<' + label + '>>';
        }
        return p;
    }

    ,constructor : function(config) {
        this.initConfig(config);
        if (!this.getCurrentLang())
            this.setCurrentLang( this.getDefaultLang());
    }
});
// shortcuts...
var i8n = function(label, lang) { return Lang.t(label, lang); };
