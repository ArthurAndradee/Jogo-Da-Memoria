import { useEffect, useState } from 'react';
import { resetCardsSort } from './utils/cards_functions';
import Card, { CardProps } from './components/Card';
import centerCard from './assets/centerCard.jpg';
import Modal from './components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Description from './components/Description/Description';

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
    '/src/assets/one.jpg': '/src/assets/descriptions/one.PNG',
    '/src/assets/two.jpg': '/src/assets/descriptions/two.PNG',
    '/src/assets/three.jpg': '/src/assets/descriptions/three.PNG',
    '/src/assets/four.jpg': '/src/assets/descriptions/four.PNG',
    '/src/assets/five.jpg': '/src/assets/descriptions/five.PNG',
    '/src/assets/six.jpg': '/src/assets/descriptions/six.PNG',
    '/src/assets/seven.jpg': '/src/assets/descriptions/seven.PNG',
    '/src/assets/eight.jpg': '/src/assets/descriptions/eight.PNG',
    '/src/assets/nine.jpg': '/src/assets/descriptions/nine.PNG',
    '/src/assets/ten.jpg': '/src/assets/descriptions/ten.PNG',
    '/src/assets/eleven.jpg': '/src/assets/descriptions/eleven.PNG',
    '/src/assets/twelve.jpg': '/src/assets/descriptions/twelve.PNG',
    '/src/assets/thirteen.jpg': '/src/assets/descriptions/thirteen.PNG',
    '/src/assets/fourteen.jpg': '/src/assets/descriptions/fourteen.PNG',
    '/src/assets/fifteen.jpg': '/src/assets/descriptions/fifteen.PNG',
    '/src/assets/sixteen.jpg': '/src/assets/descriptions/sixteen.PNG',
    '/src/assets/seventeen.jpg': '/src/assets/descriptions/seventeen.PNG'
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
