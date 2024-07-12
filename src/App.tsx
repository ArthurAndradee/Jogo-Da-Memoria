import { useEffect, useState } from 'react';
import { resetCardsSort } from './utils/cards_functions';
import Card, { CardProps } from './components/Card/Card';
import Description from './components/Description/Description';
import centerCard from './assets/backgrounds/centerCard.jpg';
import Modal from './components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Restart from './components/Restart/Restart';

export interface AppProps {
  cards: CardProps[];
}

export interface CardState {
  url: string;
  id: number;
  isTurned: boolean;
}

export interface MatchedCardsInfo {
  text: string;
  imageUrl: string;
}

function App({ cards }: AppProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [click, setClick] = useState<number>(0);
  const staticCardId = 999;
  const [lst, setLst] = useState<CardState[]>(() => {
    const sortedCards = resetCardsSort(cards);
    const staticCard: CardState = { url: centerCard, id: staticCardId, isTurned: false };
    sortedCards.splice(17, 0, staticCard);
    return sortedCards;
  });
  const [numJogadas, setNumJogadas] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isReplayButtonVisible, setIsReplayButtonVisible] = useState<boolean>(false);
  const [matchedCardsInfo, setMatchedCardsInfo] = useState<MatchedCardsInfo | null>(null);

  const cardImages: Record<string, string> = {
    '/src/assets/backgrounds/one.jpg': '/src/assets/descriptions/one.png',
    '/src/assets/backgrounds/two.jpg': '/src/assets/descriptions/two.png',
    '/src/assets/backgrounds/three.jpg': '/src/assets/descriptions/three.png',
    '/src/assets/backgrounds/four.jpg': '/src/assets/descriptions/four.png',
    '/src/assets/backgrounds/five.jpg': '/src/assets/descriptions/five.png',
    '/src/assets/backgrounds/six.jpg': '/src/assets/descriptions/six.png',
    '/src/assets/backgrounds/seven.jpg': '/src/assets/descriptions/seven.png',
    '/src/assets/backgrounds/eight.jpg': '/src/assets/descriptions/eight.png',
    '/src/assets/backgrounds/nine.jpg': '/src/assets/descriptions/nine.png',
    '/src/assets/backgrounds/ten.jpg': '/src/assets/descriptions/ten.png',
    '/src/assets/backgrounds/eleven.jpg': '/src/assets/descriptions/eleven.png',
    '/src/assets/backgrounds/twelve.jpg': '/src/assets/descriptions/twelve.png',
    '/src/assets/backgrounds/thirteen.jpg': '/src/assets/descriptions/thirteen.png',
    '/src/assets/backgrounds/fourteen.jpg': '/src/assets/descriptions/fourteen.png',
    '/src/assets/backgrounds/fifteen.jpg': '/src/assets/descriptions/fifteen.png',
    '/src/assets/backgrounds/sixteen.jpg': '/src/assets/descriptions/sixteen.png',
    '/src/assets/backgrounds/seventeen.jpg': '/src/assets/descriptions/seventeen.png',
  };

  const turnCard = (url1: string, url2: string) => {
    const turn = lst.map((card) => {
      if (card.url === url1 || card.url === url2) {
        card.isTurned = false;
      }
      return card;
    });
    setLst(turn);
  };

  const handleClick = (id: number) => {
    if (id === staticCardId) return;

    const check = lst.map((card) => {
      if (card.id !== id || card.isTurned) return card;

      if (card.isTurned === false) {
        if (selected.length < 2) {
          card.isTurned = true;
          setSelected([...selected, card.url]);
          setNumJogadas(numJogadas + 1);
        } else if (selected.length === 2) {
          if (selected[0] !== selected[1]) {
            turnCard(selected[0], selected[1]);
            setSelected([]);
          } else {
            setMatchedCardsInfo({
              text: `You matched the cards: ${selected[0]} and ${selected[1]}`,
              imageUrl: cardImages[selected[0]] || ''
            });
            setSelected([]);
          }
        }
      }
      setClick(click + 1);

      return card;
    });
    setLst(check);
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

      setLst(updatedList);
      setIsModalVisible(true);
      setIsReplayButtonVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRestartGame = () => {
    window.location.reload();
  };

  const handleCloseMatchedCardsModal = () => {
    setMatchedCardsInfo(null);
  };

  const handleInstantWin = () => {
    const updatedList = lst.map((card) => {
      card.isTurned = true;
      return card;
    });

    setLst(updatedList);
    setIsModalVisible(true);
  };

  useEffect(() => {
    winner();
  }, [numJogadas]);


  return (
    <div className='container'>
      {lst.map((card, index) => {
        return <Card {...card} key={card.id} handleClick={handleClick} index={index} />;
      })}
      <Modal isVisible={isModalVisible} onClose={handleCloseModal} onRestart={handleRestartGame} numJogadas={numJogadas} />
      {matchedCardsInfo && (
        <Description
          isVisible={!!matchedCardsInfo}
          imageUrl={matchedCardsInfo?.imageUrl || ''}
          onClose={handleCloseMatchedCardsModal}
        />
      )}
      <button className='btn btn-primary' onClick={handleInstantWin}>Instant Win</button>
      <Restart isVisible={isReplayButtonVisible} onClick={handleRestartGame} />
      <div className='credits'>Feito por <a className="text-decoration-none" href="https://github.com/ArthurAndradee" target='_blank'>Arthur Andrade</a></div>
    </div>
  );
}

export default App;
