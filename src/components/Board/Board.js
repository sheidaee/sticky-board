import * as Note from '../Note';
import * as Grid from '../Grid';

const data = {
    notes: [
        { id: 1, title: 'title 1', body: 'body' },
        { id: 2, title: 'title 2', body: 'body' },
        { id: 3, title: 'title 3', body: 'body' },
        { id: 4, title: 'title 4', body: 'body' },
    ],
};

/**
 * Returning Note Component per note data
 *
 * @param {Object} note - note object
 * @returns {string}    - note HTML to place in the DOM
 */
function eachNote(note) {
    return Grid.displayCol(note, Note.displayNote(note));
}

/**
 * Displaying notes on the board
 *
 * @returns {string} - note HTML
 */
function display() {
    const boardContent = data.notes.map(eachNote).join('');

    return Grid.displayRow(boardContent);
}

/**
 * Updating note element in the UI
 *
 * @param {Object} noteElement
 * @param {number} [nextElementKey=-1] - the default is add button key
 */
function boardUpdateUI(noteElement, nextElementKey = -1) {
    document.querySelector(`[key='${nextElementKey}']`).insertAdjacentHTML('beforebegin', noteElement);
}

/**
 * Adding new note to board
 *
 * @param {Object} note
 */
function boardAddItem(note) {
    /* Note HTML element */
    const noteElement = Grid.displayCol(note, Note.displayNote(note));

    /* Passing new element for Updating the UI */
    boardUpdateUI(noteElement);
}

/**
 * When add new note was clicked
 *
 */
function addNoteHandler() {
    const newNote = Note.newNote('title', 'body');

    /* Adding new note to data array */
    data.notes.push(newNote);

    /* Updating the UI */
    boardAddItem(newNote);
}

/**
 * Removing one item from array
 *
 * @param {Object} notes   - notes array
 * @param {number} noteID
 * @returns {Object} notes - notes array without the selected item
 */
function arrayRemoveItem(notes, noteID) {
    return notes.filter(elem => elem.id !== noteID);
}

/**
 * Finding a note from notes array
 *
 * @param {Object} notes
 * @param {number} noteID
 * @returns {Object} note - note object
 */
function findNote(notes, noteID) {
    return notes.find(elem => elem.id === noteID);
}

/**
 * Removing note element from the UI
 *
 * @param {number} noteID
 */
function boardRemoveItem(noteID) {
    const element = document.querySelector(`[key='${noteID}'`);

    element.parentNode.removeChild(element);
}

/**
 * Removing note handler
 *
 * @param {number} noteID
 */
function removeNoteHandler(noteID) {
    /* Removing note from data array */
    data.notes = arrayRemoveItem(data.notes, Number(noteID));

    /* Removing note from ui */
    boardRemoveItem(Number(noteID));
}

/**
 * Displaying view/edit form for the note
 *
 * @param {number} noteID
 * @param {number} nextElementKey
 * @param {boolean} [editing=false]
 */
function renderNote(noteID, nextElementKey, editing = false) {
    /* Editing new note in data array */
    const editNote = findNote(data.notes, parseInt(noteID, 10));

    /* Removing old note element from the UI to show edit form */
    boardRemoveItem(noteID);

    /* showing edit form */
    const newNoteElement = Grid.displayCol(editNote, Note.displayNote(editNote, editing));

    /* Passing new element for Updating the UI */
    boardUpdateUI(newNoteElement, nextElementKey);
}

/**
 * Editing note handler
 *
 * @param {number} noteID
 * @param {number} nextElementKey - the key attribute of next element after the current note
 */
function editNoteHandler(noteID, nextElementKey) {
    /* displaying edit form */
    renderNote(noteID, nextElementKey, true);
}

/**
 * Updating notes array
 *
 * @param {number} noteID
 * @param {string} title
 * @param {string} body
 * @returns {Object} notes
 */
function saveNoteToDatabase(noteID, title, body) {
    return data.notes.map(noteInfo => ((noteInfo.id !== noteID) ?
            noteInfo :
            {
                ...noteInfo,
                title,
                body,
            }));
}

/**
 * Giving note data from the DOM
 *
 * @param {number} noteID
 * @returns {Object} title and body of the note
 */
function getNoteData(noteID) {
    const noteElement = document.querySelector(`[key='${noteID}']`);
    const title = noteElement.querySelector('#inpTitle').value;
    const body = noteElement.querySelector('#inpText').value;
    return [title, body];
}

/**
 * Saving note handler
 *
 * @param {number} noteID
 * @param {number} nextElementKey
 */
function saveNoteHandler(noteID, nextElementKey) {
    /* giving data from text field */
    const [title, body] = getNoteData(noteID);

    /* update notes array */
    const oldNote = findNote(data.notes, parseInt(noteID, 10));

    /* if new change was happen then update database */
    if (oldNote.title !== title || oldNote.body !== body) {
        data.notes = saveNoteToDatabase(parseInt(noteID, 10), title, body);
    }

    /* displaying view form */
    renderNote(noteID, nextElementKey);
}

/**
 * Calling related note event handler
 *
 * @param {Object} event - event object
 */
function checkForModifyingNote(event) {
    const noteOperations = {
        jsRemove: removeNoteHandler,
        jsEdit: editNoteHandler,
        jsSave: saveNoteHandler,
    };

    const element = event.target;

    /* check if action button was clicked */
    const elementID = element.id;

    /* check if action event is exists for the notes */
    if (noteOperations[elementID] !== undefined) {
        const parent = element.parentNode.parentNode;
        const noteID = parent.getAttribute('key');
        const nextElementKey = parseInt(parent.nextElementSibling.getAttribute('key'), 10);

        /* calling related action method */
        noteOperations[elementID](noteID, nextElementKey);
    }
}

/**
 * App event handler
 *
 * @param {Object} board - board node element
 */
function handleEvents(board) {
    board.addEventListener('click', checkForModifyingNote);
    document.getElementById('jsAddNote').addEventListener('click', addNoteHandler);
}

/**
 * Adding new note to data array
 *
 * @param {Object} note - note object
 * @returns {Object} note object
 */
function addNote(note) {
    const newNote = Note.newNote(note.tile, note.text);
    data.notes.push(newNote);

    return newNote;
}

/**
 * Displaying board
 *
 * @param {string} rootEl
 */
function displayBoard(rootEl) {
    /* state - This will switch note between view/edit mode */
    const editing = false;
    const rootElement = document.querySelector(`#${rootEl}`);

    rootElement.innerHTML = display(editing);

    handleEvents(rootElement);
}

export { addNote, displayBoard };
