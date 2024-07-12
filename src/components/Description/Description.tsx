import React, { useState, useEffect } from 'react';
import './Description.css'

interface DescriptionProps {
  isVisible: boolean;
  imageUrl: string;
  onClose: () => void;
}

const Description: React.FC<DescriptionProps> = ({ isVisible, imageUrl, onClose }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setLoading(false);
    }
  }, [imageUrl]);

  if (!isVisible) return null;

  return (
    <div className='description-cards-modal'>
      <div className='description-cards-content'>
        {loading ? (
          <div className='loading-spinner'>
            Still Loading 4: Vietnamn...
          </div>
        ) : (
          <img src={imageUrl} alt="description cards" />
        )}
        <button className='btn btn-dark btn-lg w-25' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Description;