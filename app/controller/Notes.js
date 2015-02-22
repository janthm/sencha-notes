Ext.define("Notes.controller.Notes", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            notesListContainer: "noteslistcontainer",
            noteEditor: "noteeditor"
        },
        control: {
            notesListContainer: {
                newNoteCommand: "onNewNoteCommand",
                editNoteCommand: "onEditNoteCommand"
            },
            noteEditor: {
                saveNoteCommand: "onSaveNoteCommand",
                deleteNoteCommand: "onDeleteNoteCommand",
                backToHomeCommand: "onBackToHomeCommand"
            }
        }
    },
    
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    
    activateNoteEditor: function (record) {
        var noteEditor = this.getNoteEditor();
        noteEditor.setRecord(record);
        Ext.Viewport.animateActiveItem(noteEditor, this.slideLeftTransition);
        
    },
    
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    onNewNoteCommand: function () {
        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newNote = Ext.create("Notes.model.Note", {
            id: noteId,
            dateCreated: now,
            title: "",
            description: ""
        });

        this.activateNoteEditor(newNote);
    },
    
    onEditNoteCommand: function (list, record) {
        this.activateNoteEditor(record);
    },
    
    launch: function () {
        this.callParent(arguments);
        Ext.getStore("Notes").load();
    },
    
    init: function () {
        this.callParent(arguments);
    },
    
    onSaveNoteCommand: function () {
        var noteEditor = this.getNoteEditor();

        var currentNote = noteEditor.getRecord();
        var newValues = noteEditor.getValues();

        // Update the current note's fields with form values.
        currentNote.set("title", newValues.title);
        currentNote.set("description", newValues.description);

        var errors = currentNote.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
            currentNote.reject();
            return;
        }

        var notesStore = Ext.getStore("Notes");

        if (null == notesStore.findRecord('id', currentNote.data.id)) {
            notesStore.add(currentNote);
        }

        notesStore.sync();

        notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);

        this.activateNotesList();
    },
    
    onDeleteNoteCommand: function () {
        var noteEditor = this.getNoteEditor();
        var currentNote = noteEditor.getRecord();
        var notesStore = Ext.getStore("Notes");

        notesStore.remove(currentNote);
        notesStore.sync();

        this.activateNotesList();
    },
    
    onBackToHomeCommand: function() {
    	this.activateNotesList();
	},
    
    activateNotesList: function () {
        Ext.Viewport.animateActiveItem(this.getNotesListContainer(), this.slideRightTransition);
    }
});