import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const USERS_API = 'https://jsonplaceholder.typicode.com/users'

// TODO 1 — Async thunk: GET a USERS_API; em sucesso devolve o JSON; em !res.ok ou catch usa rejectWithValue(mensagem).
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  return rejectWithValue('Substitui isto pelo fetch real (ver ENUNCIADO.md)')
})

const initialState = {
  entities: [],
  loading: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // TODO 2 — Reducer síncrono: remove de state.entities o utilizador com id === action.payload (só estado local).
    deleteUser: (state, action) => {
      const id = action.payload
      void id
      // state.entities = state.entities.filter((u) => u.id !== id)
    },
  },
  extraReducers: (builder) => {
    // TODO 3 — addCase(fetchUsers.pending): loading = 'pending', error = null
    // TODO 4 — addCase(fetchUsers.fulfilled): loading = 'succeeded', entities = action.payload
    // TODO 5 — addCase(fetchUsers.rejected): loading = 'failed', error = action.payload ?? action.error.message ?? ...
    void builder
  },
})

export const { deleteUser } = userSlice.actions
export default userSlice.reducer
