import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonCards } from "../slices/pokemonSlice";
import { RootState } from "../store";
import PokemonCard from "../components/PokemonCard";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import "../styles/homePage.scss";

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const { pokemonCards, loading, error } = useSelector(
        (state: RootState) => state.pokemon
    );
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    useEffect(() => {
        dispatch(fetchPokemonCards());
    }, [dispatch]);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="home-page">
            <input
                type="text"
                placeholder="Search by name"
                className="search-input"
            />
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
