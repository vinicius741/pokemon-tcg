import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PokemonCard } from '../types/PokemonCard';
import { getPokemonCards } from '../services/pokemonService';

interface PokemonState {
    pokemonCards: PokemonCard[];
    loading: boolean;
    error: string | null;
}

const initialState: PokemonState = {
    pokemonCards: [],
    loading: false,
    error: null,
};

export const fetchPokemonCards = createAsyncThunk(
    'pokemon/fetchPokemonCards',
    async () => {
        const response = await getPokemonCards();
        return response.data;
    }
);

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemonCards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPokemonCards.fulfilled, (state, action) => {
                state.pokemonCards = action.payload;
                state.loading = false;
            })
            .addCase(fetchPokemonCards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch Pokemon cards';
            });
    },
});

export default pokemonSlice.reducer;
