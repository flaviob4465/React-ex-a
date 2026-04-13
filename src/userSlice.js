import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const USERS_API = 'https://jsonplaceholder.typicode.com/users'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(USERS_API)
    if (!res.ok) {
      return rejectWithValue(`Erro ${res.status}`)
    }
    return await res.json()
  } catch (e) {
    return rejectWithValue(e.message ?? 'Falha na rede')
  }
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
    deleteUser: (state, action) => {
      const id = action.payload
      state.entities = state.entities.filter((u) => u.id !== id)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = 'pending'
      state.error = null
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.entities = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload ?? action.error.message ?? 'Erro desconhecido'
    })
  },
})

export const { deleteUser } = userSlice.actions
export default userSlice.reducer
