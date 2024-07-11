import React from 'react';
import './Description.css'

interface DescriptionProps {
  isVisible: boolean;
  imageUrl: string;
  onClose: () => void;
}

const Description: React.FC<DescriptionProps> = ({ isVisible, imageUrl, onClose }) => {

  if (!isVisible) return null;

  return (
    <div className='description-cards-modal'>
      <div className='description-cards-content'>
          <img src={imageUrl} alt="description cards" />

        <button className='btn btn-dark btn-lg w-25' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Description;