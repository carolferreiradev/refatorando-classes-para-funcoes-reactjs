import { ReactNode } from 'react';
import ReactModal from 'react-modal';

type ModalProps = {
  isOpen: boolean,
  children: ReactNode,
  setIsOpen: (value: boolean) => void
}

export function Modal(props: ModalProps) {
  function closeModal() {
    props.setIsOpen(false);
  }

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={closeModal}
      isOpen={props.isOpen}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {props.children}
    </ReactModal>
  );
}