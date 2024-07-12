import './Restart.css'

interface RestartProps {
    isVisible: boolean;
    onClick: () => void;
}

function Restart({ isVisible, onClick }: RestartProps) {
    console.log(isVisible)

    if (!isVisible) { 
        return null
    } else {
        return (
            <button className='btn btn-secondary w-100' onClick={onClick}>
                Jogar de novo
            </button>
        );
    }
}

export default Restart;
