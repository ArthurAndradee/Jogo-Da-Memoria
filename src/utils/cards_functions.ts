import { CardProps } from "../components/Card";

export const resetCardsSort = (cards: CardProps[]): CardProps[] => {
    return sortCards(regeranteCard(duplicateCards(cards)));
} 

export const sortCards = <T>(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
}

export const regeranteCard = (cards:CardProps[]):CardProps[] =>{
    return cards.map((card) => ({...card,id:randomKey()}));
}

export const randomKey = (): number => {
    return Math.random() * 115;
}

export const duplicateCards = <T>(array: T[]): T[] => {
    return [...array, ...array];
}