import React, { useCallback, useRef } from 'react';
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
    const openModal = useCallback(() => {
        onClickFunction();
        if (ref.current) ref.current.showModal();
    }, []);
    const closeModal = useCallback(() => {
        if (ref.current) ref.current.close();
    }, []);
      return (
        <ModalContainer>
          <FontAwesomeButton icon={iconToOpenModal} onClickFunction={openModal}/>
          <dialog ref={ref} onClose={closeModal} onMouseLeave={closeModal}>
            <button onClick={closeModal} className='close-btn'>X</button>
            {children}
          </dialog>
        </ModalContainer>
      );
}

export default ModalDialog;