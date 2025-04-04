import React, { useState, useEffect } from "react";
import "../styles/animeslider.css";

const AnimeSlider = ({ anime = [] }) => {
    const [cur, setCur] = useState(0);

    useEffect(() => {
        if (anime.length === 0) return; // Prevent errors
        const imageId = setInterval(() => {
            setCur((prev) => (prev + 1) % anime.length);
        }, 5000);
        return () => clearInterval(imageId);
    }, [anime]);

    if (anime.length === 0) return <p className="loading">Loading slider...</p>;

    const currentAnime = anime[cur];

    return (
        <div className="main-slider">
            <img src={currentAnime?.images?.jpg?.large_image_url} alt={currentAnime?.title} />
            <div className="gradient-overlay"></div>
            <div className="anime-info">
                <h2>{currentAnime?.title}</h2>
                <p>{currentAnime?.synopsis?.slice(0, 150)}...</p>

                {currentAnime?.trailer?.url && (
                    <a 
                        href={currentAnime.trailer.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="play-trailer"
                    >
                        ▶ Play Trailer
                    </a>
                )}
            </div>
        </div>
    );
};

export default AnimeSlider;
