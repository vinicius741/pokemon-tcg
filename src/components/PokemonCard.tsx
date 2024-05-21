import React from "react";
import { Link } from "react-router-dom";

interface PokemonCardProps {
    card: {
        id: string;
        name: string;
        images: {
            small: string;
        };
        types: string[];
    };
    key: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ card, key }) => {
    return (
        <div className="card" key={key}>
            <Link to={`/details/${card.id}`}>
                <div className="image-container">
                    <img src={card.images.small} alt={card.name} />
                </div>
                <h3>{card.name}</h3>
                <p>ID: {card.id}</p>
                <p>Type: {card.types.join(", ")}</p>
            </Link>
        </div>
    );
};

export default PokemonCard;
