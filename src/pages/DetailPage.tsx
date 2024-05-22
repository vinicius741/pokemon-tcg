import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePokemonCards } from "../context/PokemonCardsContext";
import "../styles/detailPage.scss";
import { useIntl } from "react-intl";

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
}) => {
    const intl = useIntl();
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>{name}</h2>
                <p>
                    <strong>
                        {intl.formatMessage({ id: "attack.cost" })}:
                    </strong>{" "}
                    {cost.join(", ")}
                </p>
                <p>
                    <strong>
                        {intl.formatMessage({ id: "attack.damage" })}:
                    </strong>{" "}
                    {damage}
                </p>
                <p>
                    <strong>
                        {intl.formatMessage({ id: "attack.description" })}:
                    </strong>{" "}
                    {text}
                </p>
            </div>
        </div>
    );
};

const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { pokemonCards } = usePokemonCards();
    const intl = useIntl();

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
            <p>
                {intl.formatMessage({ id: "card.id" })}: {card.id}
            </p>
            <p>
                {intl.formatMessage({ id: "card.type" })}:{" "}
                {card.types.join(", ")}
            </p>
            {card.resistances && (
                <p>
                    {intl.formatMessage({ id: "card.resistances" })}:{" "}
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
                    {intl.formatMessage({ id: "attack.weaknesses" })}:{" "}
                    {card.weaknesses
                        .map(
                            (weakness) => `${weakness.type}: ${weakness.value}`
                        )
                        .join(", ")}
                </p>
            )}
            <h2>{intl.formatMessage({ id: "attacks.title" })}</h2>
            <ul>
                {card.attacks?.map((attack) => (
                    <li
                        key={attack.name}
                        onClick={() => setSelectedAttack(attack)}
                    >
                        <strong>{attack.name}</strong>: {attack.text} (
                        {intl.formatMessage({ id: "attacks.cost" })}:{" "}
                        {attack.cost.join(", ")},{" "}
                        {intl.formatMessage({ id: "attacks.damage" })}:{" "}
                        {attack.damage})
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
