// src/pages/DetailPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePokemonCards } from "../context/PokemonCardsContext";
import "../styles/DetailPage.scss";

interface AttackDetailsProps {
    name: string;
    cost: string[];
    damage: string;
    text: string;
    onClose: () => void;
}

const AttackDetails: React.FC<AttackDetailsProps> = ({
    name,
    cost,
    damage,
    text,
    onClose,
}) => (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>
                &times;
            </span>
            <h2>{name}</h2>
            <p>
                <strong>Cost:</strong> {cost.join(", ")}
            </p>
            <p>
                <strong>Damage:</strong> {damage}
            </p>
            <p>
                <strong>Description:</strong> {text}
            </p>
        </div>
    </div>
);

const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { pokemonCards } = usePokemonCards();
    const card = pokemonCards.find((card) => card.id === id);

    const [selectedAttack, setSelectedAttack] = useState<{
        name: string;
        cost: string[];
        damage: string;
        text: string;
    } | null>(null);

    if (!card) {
        return <div>Card not found</div>;
    }

    return (
        <div className="detail-page">
            <img src={card.images.large} alt={card.name} />
            <h1>{card.name}</h1>
            <p>ID: {card.id}</p>
            <p>Type: {card.types.join(", ")}</p>
            {card.resistances && (
                <p>
                    Resistances:{" "}
                    {card.resistances
                        .map(
                            (resistance) =>
                                `${resistance.type}: ${resistance.value}`
                        )
                        .join(", ")}
                </p>
            )}
            {card.weaknesses && (
                <p>
                    Weaknesses:{" "}
                    {card.weaknesses
                        .map(
                            (weakness) => `${weakness.type}: ${weakness.value}`
                        )
                        .join(", ")}
                </p>
            )}
            <h2>Attacks</h2>
            <ul>
                {card.attacks?.map((attack) => (
                    <li
                        key={attack.name}
                        onClick={() => setSelectedAttack(attack)}
                    >
                        <strong>{attack.name}</strong>: {attack.text} (Cost:{" "}
                        {attack.cost.join(", ")}, Damage: {attack.damage})
                    </li>
                ))}
            </ul>
            {selectedAttack && (
                <AttackDetails
                    name={selectedAttack.name}
                    cost={selectedAttack.cost}
                    damage={selectedAttack.damage}
                    text={selectedAttack.text}
                    onClose={() => setSelectedAttack(null)}
                />
            )}
        </div>
    );
};

export default DetailPage;
