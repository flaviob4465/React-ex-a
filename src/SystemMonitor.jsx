import { useSelector } from 'react-redux'

function MonitorRow({ code, hint, children }) {
  return (
    <div className="system-monitor__row">
      <div className="system-monitor__text">
        <span className="system-monitor__code">{code}</span>
        <span className="system-monitor__hint">{hint}</span>
      </div>
      <div className="system-monitor__value">{children}</div>
    </div>
  )
}

function BoolBadge({ value }) {
  return (
    <span
      className={
        value
          ? 'system-monitor__badge system-monitor__badge--yes'
          : 'system-monitor__badge system-monitor__badge--no'
      }
    >
      {value ? 'Sim' : 'Não'}
    </span>
  )
}

export default function SystemMonitor() {
  const { entities, loading, error } = useSelector((state) => state.users)

  const thrFetch = loading !== 'idle'
  const uiRender = entities.length > 0
  const redSync = entities.length < 10
  const errHand = loading === 'failed' || error != null

  return (
    <aside
      className="system-monitor"
      role="status"
      aria-label="Indicadores do estado Redux dos utilizadores"
    >
      <p className="system-monitor__title">System Monitor</p>
      <p className="system-monitor__intro">
        <strong>Sim</strong> = a condição em baixo é verdadeira no estado atual. <strong>Não</strong> = é falsa (não
        implica bug).
      </p>

      <MonitorRow code="THR_FETCH" hint="O fluxo assíncrono já arrancou ou terminou (loading ≠ idle).">
        <BoolBadge value={thrFetch} />
      </MonitorRow>

      <MonitorRow code="UI_RENDER" hint="A lista entities tem pelo menos um utilizador.">
        <BoolBadge value={uiRender} />
      </MonitorRow>

      <MonitorRow
        code="RED_SYNC"
        hint="Menos de 10 utilizadores — típico após remover um com deleteUser (API traz 10)."
      >
        <BoolBadge value={redSync} />
      </MonitorRow>

      <MonitorRow
        code="ERR_HAND"
        hint="Estado de falha do thunk ou mensagem de erro guardada no slice."
      >
        {errHand ? (
          <span className="system-monitor__badge system-monitor__badge--danger">Com erro</span>
        ) : (
          <span className="system-monitor__badge system-monitor__badge--ok">Sem erro</span>
        )}
      </MonitorRow>
    </aside>
  )
}
