Ext.define("Notes.view.NotesListContainer", {
    extend: "Ext.Container",
    alias: "widget.noteslistcontainer",

    initialize: function () {

        this.callParent(arguments);

        var newButton = {
            xtype: "button",
            text: 'New',
            ui: 'action',
            handler: this.onNewButtonTap,
            scope: this
        };

        var topToolbar = {
            xtype: "toolbar",
            title: 'Notes',
            docked: "top",
            items: [
                { xtype: 'spacer' },
                newButton
            ]
        };

        var notesList = {
            xtype: "noteslist",
            store: Ext.getStore("Notes"),
            listeners: {
                disclose: { fn: this.onNotesListDisclose, scope: this }
            }
        };

        this.add([topToolbar, notesList]);
    },
    onNewButtonTap: function () {
        this.fireEvent("newNoteCommand", this);
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        this.fireEvent('editNoteCommand', this, record);
    },
    config: {
        layout: {
            type: 'fit'
        }
    }
});