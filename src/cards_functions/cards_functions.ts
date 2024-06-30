import { CardProps } from "../Card";

export const duplicateCards = <T>(array: T[]): T[] => {
    return [...array, ...array];
}
export const sortCards = <T>(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
}

export const randomKey = (): number => {
    return Math.random() * 15;
}

export const regeranteCard = (cards:CardProps[]):CardProps[] =>{
    return cards.map((card) => ({...card,id:randomKey()}));
}

export const resetCardsSort = (cards: CardProps[]): CardProps[] => {
    return sortCards(regeranteCard(duplicateCards(cards)));
} 