import UserList from './UserList'
import SystemMonitor from './SystemMonitor'

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">User Management</h1>
        <p className="app-subtitle">Dashboard de exemplo com Redux Toolkit e thunks assíncronos</p>
      </header>
      <main className="app-main">
        <UserList />
      </main>
      <SystemMonitor />
    </div>
  )
}
