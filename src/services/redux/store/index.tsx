import { configureStore } from '@reduxjs/toolkit'

import noteReducer from '../reducers/notes';

const store = configureStore({ 
    reducer: {
        notes: noteReducer,
    },
})
export default store;