import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks";
import { fetchPokemonCards } from "../slices/pokemonSlice";
import { RootState } from "../store";
import PokemonCard from "../components/PokemonCard";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import "../styles/homePage.scss";
import { useIntl } from "react-intl";

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const intl = useIntl();
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
        return <div>{intl.formatMessage({ id: "loading" })}</div>;
    }

    if (error) {
        return (
            <div>
                {intl.formatMessage({ id: "error" })} : {error}
            </div>
        );
    }

    return (
        <div className="home-page">
            <input
                type="text"
                placeholder={intl.formatMessage({ id: "search.placeholder" })}
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
