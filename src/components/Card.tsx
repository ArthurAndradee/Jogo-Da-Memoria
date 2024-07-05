export interface CardProps {
    url: string,
    id: number,
    isTurned: boolean,
    handleClick?: (id:number) => void,
}

export default function Card({ isTurned, url, id, handleClick}: CardProps) {
    const handleClickis = (id:number) =>{
        if(handleClick){
            handleClick(id);
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
                backgroundColor: isTurned ? 'transparent' : '#670000',
            }}
        >
        </div>
    )
}