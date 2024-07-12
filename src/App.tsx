import { useEffect, useState } from 'react';
import { resetCardsSort } from './utils/cards_functions';
import Card, { CardProps } from './components/Card/Card';
import Description from './components/Description/Description';
import centerCard from './assets/backgrounds/centerCard.jpg';
import Modal from './components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Restart from './components/Restart/Restart';

import one from './assets/backgrounds/one.jpg';
import two from './assets/backgrounds/two.jpg';
import three from './assets/backgrounds/three.jpg';
import four from './assets/backgrounds/four.jpg';
import five from './assets/backgrounds/five.jpg';
import six from './assets/backgrounds/six.jpg';
import seven from './assets/backgrounds/seven.jpg';
import eight from './assets/backgrounds/eight.jpg';
import nine from './assets/backgrounds/nine.jpg';
import ten from './assets/backgrounds/ten.jpg';
import eleven from './assets/backgrounds/eleven.jpg';
import twelve from './assets/backgrounds/twelve.jpg';
import thirteen from './assets/backgrounds/thirteen.jpg';
import fourteen from './assets/backgrounds/fourteen.jpg';
import fifteen from './assets/backgrounds/fifteen.jpg';
import sixteen from './assets/backgrounds/sixteen.jpg';
import seventeen from './assets/backgrounds/seventeen.jpg';

import oneDesc from './assets/descriptions/one.png';
import twoDesc from './assets/descriptions/two.png';
import threeDesc from './assets/descriptions/three.png';
import fourDesc from './assets/descriptions/four.png';
import fiveDesc from './assets/descriptions/five.png';
import sixDesc from './assets/descriptions/six.png';
import sevenDesc from './assets/descriptions/seven.png';
import eightDesc from './assets/descriptions/eight.png';
import nineDesc from './assets/descriptions/nine.png';
import tenDesc from './assets/descriptions/ten.png';
import elevenDesc from './assets/descriptions/eleven.png';
import twelveDesc from './assets/descriptions/twelve.png';
import thirteenDesc from './assets/descriptions/thirteen.png';
import fourteenDesc from './assets/descriptions/fourteen.png';
import fifteenDesc from './assets/descriptions/fifteen.png';
import sixteenDesc from './assets/descriptions/sixteen.png';
import seventeenDesc from './assets/descriptions/seventeen.png';


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

const cardImages: Record<string, string> = {
  [one]: oneDesc,
  [two]: twoDesc,
  [three]: threeDesc,
  [four]: fourDesc,
  [five]: fiveDesc,
  [six]: sixDesc,
  [seven]: sevenDesc,
  [eight]: eightDesc,
  [nine]: nineDesc,
  [ten]: tenDesc,
  [eleven]: elevenDesc,
  [twelve]: twelveDesc,
  [thirteen]: thirteenDesc,
  [fourteen]: fourteenDesc,
  [fifteen]: fifteenDesc,
  [sixteen]: sixteenDesc,
  [seventeen]: seventeenDesc,
};


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
      <img src={centerCard} width="50" height="500" alt="Center Card" />
      <button className='btn btn-primary' onClick={handleInstantWin}>Instant Win</button>
      <Restart isVisible={isReplayButtonVisible} onClick={handleRestartGame} />
      <div className='credits'>Feito por <a className="text-decoration-none" href="https://github.com/ArthurAndradee" target='_blank'>Arthur Andrade</a></div>
    </div>
  );
}

export default App;