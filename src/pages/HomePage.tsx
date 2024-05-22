import React, { useState } from "react";
import { usePokemonCards } from "../context/PokemonCardsContext";
import { useMediaQuery } from "react-responsive";
import { useIntl } from "react-intl";
import Slider from "react-slick";
import "../styles/homePage.scss";
import PokemonCard from "../components/PokemonCard";

const HomePage: React.FC = () => {
    const { pokemonCards } = usePokemonCards();
    const [searchTerm, setSearchTerm] = useState("");
    const intl = useIntl();
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
                breakpoint: 767,
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
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredAndSortedCards = pokemonCards
        .filter((card) =>
            card.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="home-page">
            <input
                type="text"
                placeholder={intl.formatMessage({ id: "search.placeholder" })}
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            {isMobile ? (
                <Slider {...settings}>
                    {filteredAndSortedCards.map((card, index) => (
                        <PokemonCard card={card} key={`${index}-slider`} />
                    ))}
                </Slider>
            ) : (
                <div className="grid">
                    {filteredAndSortedCards.map((card, index) => (
                        <PokemonCard card={card} key={`${index}-grid`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
