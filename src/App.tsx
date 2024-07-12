import { useEffect, useState } from 'react';
import { resetCardsSort } from './utils/cards_functions';
import Card, { CardProps } from './components/Card/Card';
import Description from './components/Description/Description';
import centerCard from './assets/backgrounds/centerCard.jpg';
import Modal from './components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Restart from './components/Restart/Restart';

import oneBg from './assets/backgrounds/one.jpg';
import twoBg from './assets/backgrounds/two.jpg';
import threeBg from './assets/backgrounds/three.jpg';
import fourBg from './assets/backgrounds/four.jpg';
import fiveBg from './assets/backgrounds/five.jpg';
import sixBg from './assets/backgrounds/six.jpg';
import sevenBg from './assets/backgrounds/seven.jpg';
import eightBg from './assets/backgrounds/eight.jpg';
import nineBg from './assets/backgrounds/nine.jpg';
import tenBg from './assets/backgrounds/ten.jpg';
import elevenBg from './assets/backgrounds/eleven.jpg';
import twelveBg from './assets/backgrounds/twelve.jpg';
import thirteenBg from './assets/backgrounds/thirteen.jpg';
import fourteenBg from './assets/backgrounds/fourteen.jpg';
import fifteenBg from './assets/backgrounds/fifteen.jpg';
import sixteenBg from './assets/backgrounds/sixteen.jpg';
import seventeenBg from './assets/backgrounds/seventeen.jpg';

import oneDesc from './assets/descriptions/one.jpg';
import twoDesc from './assets/descriptions/two.jpg';
import threeDesc from './assets/descriptions/three.jpg';
import fourDesc from './assets/descriptions/four.jpg';
import fiveDesc from './assets/descriptions/five.jpg';
import sixDesc from './assets/descriptions/six.jpg';
import sevenDesc from './assets/descriptions/seven.jpg';
import eightDesc from './assets/descriptions/eight.jpg';
import nineDesc from './assets/descriptions/nine.jpg';
import tenDesc from './assets/descriptions/ten.jpg';
import elevenDesc from './assets/descriptions/eleven.jpg';
import twelveDesc from './assets/descriptions/twelve.jpg';
import thirteenDesc from './assets/descriptions/thirteen.jpg';
import fourteenDesc from './assets/descriptions/fourteen.jpg';
import fifteenDesc from './assets/descriptions/fifteen.jpg';
import sixteenDesc from './assets/descriptions/sixteen.jpg';
import seventeenDesc from './assets/descriptions/seventeen.jpg';

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

const cardImages = [
  { backgroundImage: oneBg, descriptionImage: oneDesc },
  { backgroundImage: twoBg, descriptionImage: twoDesc },
  { backgroundImage: threeBg, descriptionImage: threeDesc },
  { backgroundImage: fourBg, descriptionImage: fourDesc },
  { backgroundImage: fiveBg, descriptionImage: fiveDesc },
  { backgroundImage: sixBg, descriptionImage: sixDesc },
  { backgroundImage: sevenBg, descriptionImage: sevenDesc },
  { backgroundImage: eightBg, descriptionImage: eightDesc },
  { backgroundImage: nineBg, descriptionImage: nineDesc },
  { backgroundImage: tenBg, descriptionImage: tenDesc },
  { backgroundImage: elevenBg, descriptionImage: elevenDesc },
  { backgroundImage: twelveBg, descriptionImage: twelveDesc },
  { backgroundImage: thirteenBg, descriptionImage: thirteenDesc },
  { backgroundImage: fourteenBg, descriptionImage: fourteenDesc },
  { backgroundImage: fifteenBg, descriptionImage: fifteenDesc },
  { backgroundImage: sixteenBg, descriptionImage: sixteenDesc },
  { backgroundImage: seventeenBg, descriptionImage: seventeenDesc },
];

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
            const matchedCard = cardImages.find((img) => img.backgroundImage === selected[0]);
            setMatchedCardsInfo({
              text: `You matched the cards: ${selected[0]} and ${selected[1]}`,
              imageUrl: matchedCard ? matchedCard.descriptionImage : '',
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
    setIsReplayButtonVisible(true)
  };

  useEffect(() => {
    winner();
  }, [numJogadas]);

  console.log(isReplayButtonVisible)

  return (
    <div className='d-flex flex-column main'>
      <h1 className='text-center mt-3'>Jogo da Memória</h1>
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
      </div>
      <div className='container'>
        <button className='btn btn-primary' onClick={handleInstantWin}>Virar todas as cartas</button>
        <Restart isVisible={isReplayButtonVisible} onClick={handleRestartGame} />
      </div>
      {/* <div className='creditsContainer'>
        <div className='credits'>Feito por <a className="text-decoration-none" href="https://github.com/ArthurAndradee" target='_blank'>Arthur Andrade</a></div>
        <div className='credits'>Apresentado por <a className="text-decoration-none" style={{color:'#006d31'}} href="https://github.com/ArthurAndradee" target='_blank'>Karina Flores</a></div>
        <div className='credits'>Parceria  <a className="text-decoration-none" style={{color:'#6d0000', fontWeight:'900'}} href="https://github.com/ArthurAndradee" target='_blank'>Uniritter</a></div>
      </div> */}
    </div>
  );
}

export default App;
