import { Dispatch, SetStateAction, createContext } from "react";

interface TurnProps {
    turn: boolean,
    Setturn: Dispatch<SetStateAction<boolean>>
}

const TurnContext = createContext<TurnProps>({
    turn: false,
    Setturn: () => { }
})

export default TurnContext;