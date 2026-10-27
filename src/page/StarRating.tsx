import { useState } from 'react'

const StarRating = () => {
    const stars = new Array(5).fill(0);
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    return (
        <div>
            <h1 className='text-center text-7xl'>Star Rating</h1>
            <div className='flex items-center justify-center text-8xl font-bold gap-3 mt-5'>
                {
                    stars?.map((_, index) => {
                        const starValue = index + 1;
                        return <button key={index}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(starValue)}
                            className={`${(hoverRating || rating) >= starValue ? "text-amber-400" : "text-black"}`}
                            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
                            aria-pressed={rating === starValue}
                        >&#9733;</button>
                    })
                }
            </div>
            <p className="text-center mt-4 text-xl">
                {rating > 0 ? `Your rating: ${rating}/5` : 'Select a rating'}
            </p>
        </div>
    )
}

export default StarRating