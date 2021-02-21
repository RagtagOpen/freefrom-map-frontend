import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';
import ModalButton from "components/modal/ModalButton";

export default function Modal({ className, text, target, title, children }) {
    return (
        <div>
            <ModalButton text={ text } target={ target } />
            <div className={`modal fade ${className}`} id={ target } tabIndex="-1" role="dialog" aria-labelledby={`${target}Label`}>
                <div className="modal-dialog" role="document">
                    <div className={`modal-content ${styles.content}`}>
                        <div className={`modal-header ${styles.header}`}>
                            <h5 className={`modal-title ${styles.title}`} id={`${target}Label`}>{ title }</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    target: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.object
}
