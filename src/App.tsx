import { useEffect, useState } from 'react';
import { resetCardsSort } from './utils/cards_functions';
import Card, { CardProps } from './components/Card';
import './App.css';

export interface appProps {
  cards: CardProps[];
}

function App({ cards }: appProps) {
  const [selected, Setselected] = useState<string[]>([]);
  const [click, Setclick] = useState(0);
  const [lst, Setlst] = useState(() => {
    return resetCardsSort(cards);
  });
  const [numJogadas, SetnumJogadas] = useState(0);

  const turnCard = (url1: string, url2: string) => {
    const turn = lst.map((card) => {
      if (card.url === url1 || card.url === url2) {
        card.isTurned = false;
      }
      return card;
    })
    Setlst(turn);
  }

  const HandleClick = (id: number) => {
    const check = lst.map((card) => {
      if (card.id !== id || card.isTurned) return card;
      if (card.isTurned === false) {
        if (selected.length < 2) {
          card.isTurned = true;
          Setselected([...selected, card.url]);
          SetnumJogadas(numJogadas + 1);
        }
        else if (selected.length === 2) {
          if (selected[0] !== selected[1]) {
            turnCard(selected[0], selected[1])
            Setselected([]);
          } else {
            Setselected([]);
          }
        }
      }
      Setclick(click + 1);
      return card;
    })
    Setlst(check);
  };

  const winner = () => {
    const allTurned = lst.every((card) => card.isTurned);
    if (allTurned) {
      const resposta : boolean = confirm(`Parabéns você venceu!!, número de jogadas: ${numJogadas} gostaria de jogar mais uma vez?`);
      if(resposta){
        alert('Boa partida!');
        window.location.reload();
      }
    }
  }
  useEffect(() => {
    winner();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numJogadas]);


  return (
    <div className='container'>
      {lst.map((card) => {
        return <Card {...card} key={Math.random()} handleClick={HandleClick}/>
      })}
    </div>
  )
}

export default App
