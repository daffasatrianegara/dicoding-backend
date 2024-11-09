const notesHandler = require('../controllers') 

const routes = [
    {
        method : "GET",
        path : "/notes",
        handler : notesHandler.getAllNotesHandler
    },
    {
        method : "GET",
        path : "/notes/{id}",
        handler : notesHandler.getNotesByIdHandler
    },
    {
        method : "POST",
        path : "/notes",
        handler : notesHandler.addNoteHandler
    },
    {
        method : "PUT",
        path : "/notes/{id}",
        handler : notesHandler.updateNoteHandler
    },
    {
        method : "DELETE",
        path : "/notes/{id}",
        handler : notesHandler.deleteNoteByIdHandler
    }
]

module.exports = routes