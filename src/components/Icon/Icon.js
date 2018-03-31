import styles from './Icon.module.scss';

/**
 * Displaying icon element
 *
 * @param {string} className
 * @param {number} id
 * @returns {string} HTML element
 */
function displayIcon(className, id) {
    return (`        
        <i class="${[styles[className], styles.iconSmall].join(' ')}" id="${id}"></i>
    `);
}

export default displayIcon;
