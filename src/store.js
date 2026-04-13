import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './userSlice'

// TODO — Confirma o registo na chave "users" (tem de bater certo com useSelector state.users)
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})
