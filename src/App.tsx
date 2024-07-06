import { useEffect, useState } from 'react';
import { resetCardsSort } from './utils/cards_functions';
import Card, { CardProps } from './components/Card/Card';
import Description from './components/Description/Description';
import centerCard from './assets/covers/centerCard.jpg';
import Modal from './components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export interface appProps {
  cards: CardProps[];
}

function App({ cards }: appProps) {
  const [selected, Setselected] = useState<string[]>([]);
  const [click, Setclick] = useState(0);
  const staticCardId = 999;
  const [lst, Setlst] = useState(() => {
    const sortedCards = resetCardsSort(cards);
    const staticCard = { url: centerCard, id: staticCardId, isTurned: false };
    sortedCards.splice(17, 0, staticCard);
    return sortedCards;
  });
  const [numJogadas, SetnumJogadas] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [matchedCardsInfo, setMatchedCardsInfo] = useState<{text: string, imageUrl: string} | null>(null); // New state for matched cards' info

  const cardImages = {
    '/src/assets/Covers/one.jpg': '/src/assets/Descriptions/one.PNG',
    '/src/assets/Covers/two.jpg': '/src/assets/Descriptions/two.PNG',
    '/src/assets/Covers/three.jpg': '/src/assets/Descriptions/three.PNG',
    '/src/assets/Covers/four.jpg': '/src/assets/Descriptions/four.PNG',
    '/src/assets/Covers/five.jpg': '/src/assets/Descriptions/five.PNG',
    '/src/assets/Covers/six.jpg': '/src/assets/Descriptions/six.PNG',
    '/src/assets/Covers/seven.jpg': '/src/assets/Descriptions/seven.PNG',
    '/src/assets/Covers/eight.jpg': '/src/assets/Descriptions/eight.PNG',
    '/src/assets/Covers/nine.jpg': '/src/assets/Descriptions/nine.PNG',
    '/src/assets/Covers/ten.jpg': '/src/assets/Descriptions/ten.PNG',
    '/src/assets/Covers/eleven.jpg': '/src/assets/Descriptions/eleven.PNG',
    '/src/assets/Covers/twelve.jpg': '/src/assets/Descriptions/twelve.PNG',
    '/src/assets/Covers/thirteen.jpg': '/src/assets/Descriptions/thirteen.PNG',
    '/src/assets/Covers/fourteen.jpg': '/src/assets/Descriptions/fourteen.PNG',
    '/src/assets/Covers/fifteen.jpg': '/src/assets/Descriptions/fifteen.PNG',
    '/src/assets/Covers/sixteen.jpg': '/src/assets/Descriptions/sixteen.PNG',
    '/src/assets/Covers/seventeen.jpg': '/src/assets/Descriptions/seventeen.PNG'
};


  const turnCard = (url1: string, url2: string) => {
    const turn = lst.map((card) => {
      if (card.url === url1 || card.url === url2) {
        card.isTurned = false;
      }
      return card;
    });
    Setlst(turn);
  };

  const HandleClick = (id: number) => {
    if (id === staticCardId) return;

    const check = lst.map((card) => {
      if (card.id !== id || card.isTurned) return card;

      if (card.isTurned === false) {
        if (selected.length < 2) {
          card.isTurned = true;
          Setselected([...selected, card.url]);
          SetnumJogadas(numJogadas + 1);
        } else if (selected.length === 2) {
          if (selected[0] !== selected[1]) {
            turnCard(selected[0], selected[1]);
            Setselected([]);
          } else {
            setMatchedCardsInfo({
              text: `You matched the cards: ${selected[0]} and ${selected[1]}`,
              imageUrl: cardImages[selected[0]] || ''
            });
            Setselected([]);
          }
        }
      }
      Setclick(click + 1);

      return card;
    });
    Setlst(check);
  };

  const winner = () => {
    const allTurned = lst.every((card) => card.isTurned || card.id === staticCardId);

    if (allTurned) {
      const updatedList = lst.map((card) => {
        if (card.id === staticCardId) {
          card.isTurned = true;
        }
        return card;
      });

      Setlst(updatedList);
      setIsModalVisible(true); 
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRestartGame = () => {
    window.location.reload();
  };

  const handleInstantWin = () => {
    const updatedList = lst.map((card) => {
      card.isTurned = true;
      return card;
    });

    Setlst(updatedList);
    setIsModalVisible(true);
  };

  const handleCloseMatchedCardsModal = () => {
    setMatchedCardsInfo(null);
  };

  useEffect(() => {
    winner();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numJogadas]);

  return (
    <div className='container'>
      {lst.map((card, index) => {
        return <Card {...card} key={card.id} handleClick={HandleClick} index={index} />;
      })}
      <button onClick={handleInstantWin}>Instant Win</button>
      <Modal isVisible={isModalVisible} onClose={handleCloseModal} onRestart={handleRestartGame} numJogadas={numJogadas}/>
      {matchedCardsInfo && (
        <Description 
          isVisible={!!matchedCardsInfo}
          imageUrl={matchedCardsInfo?.imageUrl || ''}
          onClose={handleCloseMatchedCardsModal}
        />
      )}
      <div className='credits'>Feito por <a className="text-decoration-none" href="https://github.com/ArthurAndradee" target='_blank'>Arthur Andrade</a></div>
    </div>
  );
}

export default App;
