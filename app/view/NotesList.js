Ext.define("Notes.view.NotesList", {
    extend: "Ext.dataview.List",
    alias: "widget.noteslist",
    config: {
        loadingText: "Loading Notes...",
        emptyText: '<div class="notes-list-empty-text">No notes found.</div><pre>',
        onItemDisclosure: true,
        grouped: true,
        itemTpl: 
        	'</pre>' +
	        	'<div class="list-item-title">{title}</div>' + 
	        	'<div class="list-item-description">{description}</div>' + 
        	'<pre>'
    }
});