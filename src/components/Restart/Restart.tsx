import './Restart.css'

interface RestartProps {
    isVisible: boolean;
    onClick: () => void;
}

function Restart({ isVisible, onClick }: RestartProps) {
    if (isVisible) return null;

    return (
        <button className='btn btn-secondary' onClick={onClick}>
            Jogar de novo
        </button>
    );
}

export default Restart;
