import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// TODO: import { fetchUsers, deleteUser } from './userSlice'

export default function UserList() {
  // TODO — useDispatch e useSelector para state.users (entities, loading, error)
  const dispatch = useDispatch()
  const { entities, loading, error } = useSelector((state) => state.users)

  // TODO — Ao montar: dispatch(fetchUsers()). Dependência: [dispatch]
  useEffect(() => {
    // dispatch(fetchUsers())
  }, [dispatch])

  const handleRetry = () => {
    // dispatch(fetchUsers())
  }

  const handleRemove = (id) => {
    // dispatch(deleteUser(id))
    void id
  }

  const isLoading =
    loading === 'pending' || (loading === 'idle' && entities.length === 0)

  if (isLoading) {
    return (
      <section className="user-list-section">
        <div className="loading-simple" role="status" aria-live="polite" aria-label="A carregar utilizadores">
          <div className="spinner" />
          <p className="loading-simple__text">A carregar…</p>
        </div>
      </section>
    )
  }

  if (loading === 'failed') {
    return (
      <section className="user-list-section">
        <div className="error-panel" role="alert">
          <p className="error-title">Não foi possível carregar os utilizadores</p>
          <p className="error-detail">{error}</p>
          <button type="button" className="btn btn-primary" onClick={handleRetry}>
            Tentar Novamente
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="user-list-section">
      <div className="user-grid">
        {entities.map((user) => (
          <article key={user.id} className="user-card">
            <div className="user-card-header">
              <div className="user-avatar" aria-hidden>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-icon"
                onClick={() => handleRemove(user.id)}
                title="Remover da lista (apenas local)"
                aria-label={`Remover ${user.name}`}
              >
                ×
              </button>
            </div>
            <h3 className="user-name">{user.name}</h3>
            <p className="user-meta">@{user.username}</p>
            <a className="user-email" href={`mailto:${user.email}`}>
              {user.email}
            </a>
            {user.company?.name && <p className="user-company">{user.company.name}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
