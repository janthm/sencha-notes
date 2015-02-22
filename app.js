Ext.application({
    name: "Notes",

    controllers: [
    	"Notes"
    ],
    
    views: [
    	"NotesList", 
    	"NotesListContainer",
    	"NoteEditor"
    ],
    
    models: [
    	"Note" 
    ],
    
    stores: [
    	"Notes" 
    ],

    launch: function () {
        Ext.Viewport.add([
        	{ xtype: "noteslistcontainer" }, 
        	{ xtype: "noteeditor" }
        ]);
    }
});