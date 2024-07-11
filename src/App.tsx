import { useEffect, useState } from 'react';
import { resetCardsSort } from './utils/cards_functions';
import Card, { CardProps } from './components/Card/Card';
import Description from './components/Description/Description';
import centerCard from './assets/covers/centerCard.jpg';
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
    '/src/assets/covers/one.jpg': '/src/assets/descriptions/one.PNG',
    '/src/assets/covers/two.jpg': '/src/assets/descriptions/two.PNG',
    '/src/assets/covers/three.jpg': '/src/assets/descriptions/three.PNG',
    '/src/assets/covers/four.jpg': '/src/assets/descriptions/four.PNG',
    '/src/assets/covers/five.jpg': '/src/assets/descriptions/five.PNG',
    '/src/assets/covers/six.jpg': '/src/assets/descriptions/six.PNG',
    '/src/assets/covers/seven.jpg': '/src/assets/descriptions/seven.PNG',
    '/src/assets/covers/eight.jpg': '/src/assets/descriptions/eight.PNG',
    '/src/assets/covers/nine.jpg': '/src/assets/descriptions/nine.PNG',
    '/src/assets/covers/ten.jpg': '/src/assets/descriptions/ten.PNG',
    '/src/assets/covers/eleven.jpg': '/src/assets/descr iptions/eleven.PNG',
    '/src/assets/covers/twelve.jpg': '/src/assets/descriptions/twelve.PNG',
    '/src/assets/covers/thirteen.jpg': '/src/assets/descriptions/thirteen.PNG',
    '/src/assets/covers/fourteen.jpg': '/src/assets/descriptions/fourteen.PNG',
    '/src/assets/covers/fifteen.jpg': '/src/assets/descriptions/fifteen.PNG',
    '/src/assets/covers/sixteen.jpg': '/src/assets/descriptions/sixteen.PNG',
    '/src/assets/covers/seventeen.jpg': '/src/assets/descriptions/seventeen.PNG',
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
