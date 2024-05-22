import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer, { fetchPokemonCards } from './pokemonSlice';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

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

describe('pokemonSlice', () => {
    it('should handle initial state', () => {
        expect(pokemonReducer(undefined, { type: 'unknown' })).toEqual({
            pokemonCards: [],
            loading: false,
            error: null,
        });
    });

    it('should handle fetchPokemonCards.pending', () => {
        const initialState = {
            pokemonCards: [],
            loading: false,
            error: null,
        };
        const action = { type: fetchPokemonCards.pending.type };
        const state = pokemonReducer(initialState, action);
        expect(state).toEqual({
            pokemonCards: [],
            loading: true,
            error: null,
        });
    });

    it('should handle fetchPokemonCards.fulfilled', () => {
        const initialState = {
            pokemonCards: [],
            loading: false,
            error: null,
        };
        const action = {
            type: fetchPokemonCards.fulfilled.type,
            payload: mockData.data,
        };
        const state = pokemonReducer(initialState, action);
        expect(state).toEqual({
            pokemonCards: mockData.data,
            loading: false,
            error: null,
        });
    });

    it('should handle fetchPokemonCards.rejected', () => {
        const initialState = {
            pokemonCards: [],
            loading: false,
            error: null,
        };
        const action = {
            type: fetchPokemonCards.rejected.type,
            error: { message: 'Request failed with status code 500' },
        };
        const state = pokemonReducer(initialState, action);
        expect(state).toEqual({
            pokemonCards: [],
            loading: false,
            error: 'Request failed with status code 500',
        });
    });

    it('should fetch Pokemon cards successfully', async () => {
        mock.onGet('https://api.pokemontcg.io/v2/cards?page=1&pageSize=500').reply(200, mockData);

        const store = configureStore({
            reducer: {
                pokemon: pokemonReducer,
            },
        });

        await store.dispatch(fetchPokemonCards());

        const state = store.getState().pokemon;
        expect(state.pokemonCards).toEqual(mockData.data);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });

    it('should handle fetch Pokemon cards failure', async () => {
        mock.onGet('https://api.pokemontcg.io/v2/cards?page=1&pageSize=500').reply(500);

        const store = configureStore({
            reducer: {
                pokemon: pokemonReducer,
            },
        });

        await store.dispatch(fetchPokemonCards());

        const state = store.getState().pokemon;
        expect(state.pokemonCards).toEqual([]);
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Request failed with status code 500');
    });
});
