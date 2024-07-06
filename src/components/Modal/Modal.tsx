import React from 'react';
import './Modal.css';

interface ModalProps {
  isVisible: boolean;
  numJogadas: number;
  onClose: () => void;
  onRestart: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onRestart, numJogadas }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="border text-center bg-light m-auto p-5 rounded">
        <h1>Parabéns, você venceu!</h1>
        <h4 className='my-4'>Número de jogadas: {numJogadas}</h4>
        <h4 className='my-4'>Gostaria de jogar mais uma vez?</h4>
        <button className='btn btn-success m-2 px-5 py-3' onClick={onRestart}>Sim</button>
        <button className='btn btn-danger m-2 px-5 py-3' onClick={onClose}>Não</button>
      </div>
    </div>
  );
};

export default Modal
