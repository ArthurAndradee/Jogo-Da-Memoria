export interface CardProps {
    url: string,
    id: number,
    isTurned: boolean,
    handleClick?: (id: number) => void,
    index?: number
}

export default function Card({ isTurned, url, id, handleClick, index }: CardProps) {
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
            style={{
                width: '120px',
                height: '120px',
                borderRadius: '8px',
                backgroundImage: isTurned ? `url(${url})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: isTurned ? 'transparent' : '#960000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
            }}
        >
            {displayNumber !== null ? displayNumber : null}
        </div>
    )
}
