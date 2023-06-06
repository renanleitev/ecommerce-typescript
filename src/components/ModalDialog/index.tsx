import React, { useCallback, useState, useRef } from 'react';
import {IconType} from 'react-icons';
import { ModalContainer } from './styled';
import FontAwesomeButton from '../FontAwesomeButton';
 
interface ModalProps {
    children: React.ReactNode;
    iconToOpenModal: IconType;
    onClickFunction: CallableFunction;
}

const ModalDialog: React.FC<ModalProps> = ({children, iconToOpenModal, onClickFunction}) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = useCallback(() => {
        onClickFunction();
        setIsOpen(true);
        if (ref.current) ref.current.showModal();
      }, []);
    const closeModal = useCallback(() => {
        setIsOpen(false);
        if (ref.current) ref.current.close();
    }, []);
      return (
        <ModalContainer>
          <FontAwesomeButton icon={iconToOpenModal} onClickFunction={openModal}/>
          <dialog ref={ref} open={isOpen} onClose={closeModal} onMouseLeave={closeModal}>
            <button onClick={closeModal} className='close-btn'>X</button>
            {children}
          </dialog>
        </ModalContainer>
      );
}

export default ModalDialog;