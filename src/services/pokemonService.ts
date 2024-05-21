import axios from 'axios';
import { PokemonCard } from '../types/PokemonCard';

const API_URL = 'https://api.pokemontcg.io/v2/cards';

export const getPokemonCards = async (): Promise<{ data: PokemonCard[] }> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getPokemonCardById = async (id: string): Promise<{ data: PokemonCard }> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};
