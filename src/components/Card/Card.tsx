import './Card.css';

export interface CardProps {
    url: string,
    id: number,
    isTurned: boolean,
    handleClick?: (id: number) => void,
    index?: number
}

function Card({ isTurned, url, id, handleClick, index }: CardProps) {
    const handleClickis = (id: number) => {
        if (handleClick) {
            handleClick(id);
        }
    }

    let displayNumber: number | null = null;
    if (!isTurned && index !== undefined) {
        if (index < 17) {
            displayNumber = index + 1;
        } else if (index > 17) {
            displayNumber = index;
        }
    }

    return (
        <div
            onClick={() => handleClickis(id)}
            className={`card-container ${isTurned ? 'card-turned' : 'card-not-turned'}`}
            style={{
                backgroundImage: isTurned ? `url(${url})` : 'none',
            }}
        >
            {displayNumber !== null ? displayNumber : null}
        </div>
    )
}

export default Card