import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoteState {
  notes: any[];
}

const initialState: NoteState = {
  notes: [],
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<any[]>) => {
      state.notes = action.payload;
    },
  },
});

export const { setNotes } = noteSlice.actions;

export default noteSlice.reducer;
