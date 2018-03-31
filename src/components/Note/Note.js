import displayIcon from '../Icon';

import styles from './Note.module.scss';

/**
 * Note class
 *
 * @class Note
 */
class Note {
    /**
     * Creates an instance of Note.
     *
     * @param {number} id - Note id.
     * @param {string} title - Note title.
     * @param {string} text - note text
     *
     */
    constructor(id, title, text) {
        this.id    = id;
        this.title = title;
        this.body  = text;
    }
}

/**
 * Generating new ID for a note.
 *
 * @returns {number} - New ID for saving a note.
 */
function nextId() {
    return Date.now();
}

/**
 * Displaying note edit form.
 *
 * @param {Object} note - note object
 * @returns {string} - Note editing form HTML.
 */
function displayForm(note) {
    return `
        <div class="${styles.note} note__form">            
            ${displayIcon('iconSmallClose', 'jsRemove')}                     
            <div class="${styles.body}">
                <div>
                    <input
                        type="text"
                        name="inpTitle"
                        id="inpTitle"
                        placeholder="Title"                            
                        required=""                            
                        value="${note.title.trim()}"
                        />
                </div>
                <div>
                    <textarea name="inpText"
                        id="inpText"
                        placeholder="Body">${note.body.trim()}</textarea>
                </div>
                <span class="note__body__input-limit"></span>
            </div>           
            ${displayIcon('iconSmallSave', 'jsSave')}                  
        </div>`;
}

/**
 * Displaying note view form.
 *
 * @param {Object} note - note object
 * @returns {string} Note viewing HTML.
 */
function displayView(note) {
    return `
        <div class="${styles.note}">     
            ${displayIcon('iconSmallClose', 'jsRemove')}                                       
            <div class="${[styles.body, styles.scrollbar].join(' ')}">
                <h3>
                    ${note.title}
                </h3>
                <p>${note.body}</p>
            </div>           
            ${displayIcon('iconSmallEdit', 'jsEdit')}            
        </div>`;
}

/**
 * Displaying view/edit form for the note.
 *
 * @param {Object} note - note object
 * @param {boolean} [editing=false]
 * @returns {string} - Note html.
 */
function displayNote(note, editing = false) {
    return (`
        ${(editing) ?
            displayForm(note) :
            displayView(note)}
    `);
}

/**
 * Adding new note
 *
 * @param {string} title
 * @param {string} text
 * @returns {Object} note object
 */
function newNote(title, text) {
    return new Note(nextId(), title, text);
}

export { newNote, displayNote };
