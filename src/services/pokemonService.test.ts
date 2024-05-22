import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getPokemonCards, getPokemonCardById } from './pokemonService';

const mock = new MockAdapter(axios);

describe('pokemonService', () => {
    afterEach(() => {
        mock.reset();
    });

    test('getPokemonCards fetches data successfully', async () => {
        const mockData = {
            data: [
                {
                    id: 'xy1-1',
                    name: 'Venusaur-EX',
                    images: {
                        small: 'https://images.pokemontcg.io/xy1/1.png',
                    },
                    types: ['Grass'],
                },
            ],
        };

        mock.onGet('https://api.pokemontcg.io/v2/cards?page=1&pageSize=500').reply(200, mockData);

        const response = await getPokemonCards();
        expect(response).toEqual(mockData);
    });

    test('getPokemonCardById fetches data successfully', async () => {
        const mockData = {
            data: {
                id: 'xy1-1',
                name: 'Venusaur-EX',
                images: {
                    small: 'https://images.pokemontcg.io/xy1/1.png',
                },
                types: ['Grass'],
            },
        };

        mock.onGet('https://api.pokemontcg.io/v2/cards/xy1-1').reply(200, mockData);

        const response = await getPokemonCardById('xy1-1');
        expect(response).toEqual(mockData);
    });
});
