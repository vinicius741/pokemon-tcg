import React from "react";
import { usePokemonCards } from "../context/PokemonCardsContext";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import "../styles/homePage.scss";
import PokemonCard from "../components/PokemonCard";

const HomePage: React.FC = () => {
    const { pokemonCards } = usePokemonCards();
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="home-page">
            {isMobile ? (
                <Slider {...settings}>
                    {pokemonCards.map((card) => (
                        <PokemonCard key={card.id} card={card} />
                    ))}
                </Slider>
            ) : (
                <div className="grid">
                    {pokemonCards.map((card) => (
                        <PokemonCard key={card.id} card={card} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
