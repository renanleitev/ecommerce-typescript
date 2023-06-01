import React, { useCallback, useState, useRef } from 'react';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import {IconType} from 'react-icons';
 
interface ModalProps {
    children: React.ReactNode;
    iconToOpenModal: IconType;
}

const ModalDialog: React.FC<ModalProps> = ({children, iconToOpenModal}) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = useCallback(() => {
        setIsOpen(true);
        if (ref.current) ref.current.showModal();
      }, []);
    const closeModal = useCallback(() => {
        setIsOpen(false);
        if (ref.current) ref.current.close();
    }, []);
      return (
        <>
          <button onClick={openModal}>
            <FontAwesomeIcon Icon={iconToOpenModal}/>
          </button>
          <dialog ref={ref} open={isOpen} onClose={closeModal}>
            {children}
            <button onClick={closeModal}>Close</button>
          </dialog>
        </>
      );
}

export default ModalDialog;