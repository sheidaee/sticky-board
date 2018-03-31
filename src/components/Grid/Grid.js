import displayIcon from '../Icon';
import styles from './Grid.module.scss';

/**
 * Displaying grid column
 *
 * @param {Object} note
 * @param {string} content
 * @returns {string} HTML element
 */
function displayCol(note, content) {
    return (`
        <div class="${styles.col1Of4}" key=${note.id} data-key=${note.id}>
            ${content}
        </div>
    `);
}

/**
 * Displaying grid row
 *
 * @param {string} content
 * @returns {string} HTML element
 */
function displayRow(content) {
    return (`
        <div class='${styles.row}'>
            ${content}
            <button key="-1">                
                ${displayIcon('fa-plus', 'jsAddNote')}
            </button>
        </div>
    `);
}

export { displayCol, displayRow };
