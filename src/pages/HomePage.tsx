// src/pages/HomePage.tsx
import React from "react";
import { usePokemonCards } from "../context/PokemonCardsContext";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import "../styles/homePage.scss";

const HomePage: React.FC = () => {
    const { pokemonCards } = usePokemonCards();
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="home-page">
            {isMobile ? (
                <Slider {...settings}>
                    {pokemonCards.map((card) => (
                        <div key={card.id} className="card">
                            <Link to={`/details/${card.id}`}>
                                <img src={card.images.small} alt={card.name} />
                                <h3>{card.name}</h3>
                                <p>ID: {card.id}</p>
                                <p>Type: {card.types.join(", ")}</p>
                            </Link>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="grid">
                    {pokemonCards.map((card) => (
                        <div key={card.id} className="card">
                            <Link to={`/details/${card.id}`}>
                                <img src={card.images.small} alt={card.name} />
                                <h3>{card.name}</h3>
                                <p>ID: {card.id}</p>
                                <p>Type: {card.types.join(", ")}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
