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
            Loading...
          </div>
        ) : (
          <img src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.educba.com%2Facademy%2Fwp-content%2Fuploads%2F2019%2F12%2FCSS-Inline-Style-1.jpg&f=1&nofb=1&ipt=0b5a0179a83359b4dd4f340281197f4b1b1643525a01bfb8c9cd0c632ed18d58&ipo=images'} alt="description cards" />
        )}
        <button className='btn btn-dark btn-lg w-25' onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Description;