import { Dispatch, SetStateAction, createContext } from "react";
interface CardsType{
    selected:number[],
    Setselected:Dispatch<SetStateAction<number[]>>,
    isTurned:boolean,
    SetisTurned:Dispatch<SetStateAction<boolean>>,
}

const CardsContext = createContext<CardsType>({
    selected:[],
    Setselected:() =>{},
    isTurned:false,
    SetisTurned:() =>{},
});

export default CardsContext;