Ext.define("Notes.view.NoteEditor", {
	extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.noteeditor",
    config:{
        scrollable:'vertical'
    },
    
    initialize: function () {

        this.callParent(arguments);

        var backButton = {
            xtype: "button",
            ui: "back",
            text: "Home",
            handler: this.onBackButtonTap,
            scope: this

        };

        var saveButton = {
    		xtype: "button",
    	    ui: "action",
    	    text: "Save",
    	    handler: this.onSaveButtonTap,
    	    scope: this
        };

        var topToolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Edit Note",
            items: [
                backButton,
                { xtype: "spacer" },
                saveButton
            ]
        };

        var deleteButton = {
    		xtype: "button",
    	    iconCls: "trash",
    	    iconMask: true,
    	    handler: this.onDeleteButtonTap,
    	    scope: this
        };

        var bottomToolbar = {
            xtype: "toolbar",
            docked: "bottom",
            items: [
                deleteButton
            ]
        };

        var noteTitleEditor = {
            xtype: 'textfield',
            name: 'title',
            label: 'Title',
            required: true
        };

        var noteDescriptionEditor = {
            xtype: 'textareafield',
            name: 'description',
            label: 'Description'
        };
        
        this.add([
            topToolbar,
            { xtype: "fieldset",
                items: [noteTitleEditor, noteDescriptionEditor]
            },
            bottomToolbar
        ]);
    },
    
    onSaveButtonTap: function () {
        this.fireEvent("saveNoteCommand", this);
    },
    
    onBackButtonTap: function () {
        this.fireEvent("backToHomeCommand", this);
    },
    
    onDeleteButtonTap: function () {
        this.fireEvent("deleteNoteCommand", this);
    }
});