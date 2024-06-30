import { useEffect, useState } from 'react'
import { resetCardsSort } from './utils/cards_functions'
import Card, { CardProps } from './components/Card'
import centerCard from './assets/centerCard.jpg'
import './App.css'

export interface appProps {
  cards: CardProps[]
}

function App({ cards }: appProps) {
  const [selected, Setselected] = useState<string[]>([])
  const [click, Setclick] = useState(0)
  const staticCardId = 999
  const [lst, Setlst] = useState(() => {
    const sortedCards = resetCardsSort(cards)
    const staticCard = { url: centerCard, id: staticCardId, isTurned: false }
    sortedCards.splice(17, 0, staticCard)
    return sortedCards
  })
  const [numJogadas, SetnumJogadas] = useState(0)

  const turnCard = (url1: string, url2: string) => {
    const turn = lst.map((card) => {
      if (card.url === url1 || card.url === url2) {
        card.isTurned = false
      }
      return card
    })
    Setlst(turn)
  }

  const HandleClick = (id: number) => {
    if (id === staticCardId) return

    const check = lst.map((card) => {
      
      if (card.id !== id || card.isTurned) return card

      if (card.isTurned === false) {
        if (selected.length < 2) {
          card.isTurned = true
          Setselected([...selected, card.url])
          SetnumJogadas(numJogadas + 1)
        } else if (selected.length === 2) {
          if (selected[0] !== selected[1]) {
            turnCard(selected[0], selected[1])
            Setselected([])
          } else {
            Setselected([])
          }
        }
      }
      Setclick(click + 1)

      return card
    })
    Setlst(check)
  }

  const winner = () => {
    const allTurned = lst.every((card) => card.isTurned || card.id === staticCardId)

    if (allTurned) {
      const updatedList = lst.map((card) => {
        if (card.id === staticCardId) {
          card.isTurned = true
        }
        return card
      })
      
      Setlst(updatedList)

      const resposta: boolean = confirm(`Parabéns você venceu!!, número de jogadas: ${numJogadas} gostaria de jogar mais uma vez?`)
      if (resposta) {
        alert('Boa partida!')
        window.location.reload()
      }
    }
  }

  useEffect(() => {
    winner()
  }, [numJogadas])

  return (
    <div className='container'>
      {lst.map((card) => {
        return <Card {...card} key={card.id} handleClick={HandleClick} />
      })}
    </div>
  )
}

export default App
