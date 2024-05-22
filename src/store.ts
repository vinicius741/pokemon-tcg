import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';

const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;
