# Enunciado — User Management Dashboard (Redux Toolkit)

## Objetivo

Construir a parte Redux deste dashboard: pedido assíncrono à API, atualização do slice e ligação à UI. A lista vem da **JSONPlaceholder**; o botão de remover só altera o **estado local** (não há DELETE na API). Há ainda um **System Monitor** para veres se `loading`, `entities` e `error` batem certo com o que esperas.

## Arranque do projeto

Usa **Node.js 20 ou superior**.

```bash
git checkout starter
npm install
npm run dev
```

O projeto deve compilar.

**Nota sobre o ecrã:** o `main.jsx` já traz o **`Provider`** e a **`store`** ligados. Assim a app **não rebenta** por falta de contexto Redux e **não ficas com o browser a branco** por esse motivo — sem o `Provider`, `useSelector` dava erro e a página ficava vazia. O que falta implementar está no **slice**, no **UserList** e no **SystemMonitor**; até lá é normal veres o **spinner** a ficar à espera ou, se o thunk falhar de propósito, o **painel de erro**.

## API

Pedido: **GET** `https://jsonplaceholder.typicode.com/users`

Devolve um array de utilizadores. Para o layout que tens, interessam sobretudo `id`, `name`, `username`, `email` e `company.name` (se existir).

## Estado no `userSlice`

Estado inicial (já definido no ficheiro, não mudes a estrutura sem necessidade):

| Campo | Significado |
|--------|-------------|
| `entities` | lista de utilizadores |
| `loading` | `'idle' \| 'pending' \| 'succeeded' \| 'failed'` |
| `error` | `null` ou texto com a mensagem |

## O que implementar (por ficheiro)

Ordem sugerida; podes ajustar se preferires, mas o slice costuma ser o primeiro sítio onde tudo encaixa.

### `src/userSlice.js`

- **`fetchUsers`**: `createAsyncThunk` com `fetch` à URL acima. Sucesso → devolves o JSON. Se `!res.ok` ou se rebentar na rede, usa **`rejectWithValue`** com uma mensagem útil.
- **`extraReducers`**: três `addCase` — `pending` (loading a `pending`, limpar erro), `fulfilled` (loading `succeeded`, `entities` com o payload), `rejected` (loading `failed`, `error` preenchido; com `rejectWithValue` vem em `action.payload`).
- **`deleteUser`**: reducer síncrono que tira da lista o `id` que vem em `action.payload`. Só mexer em `entities`, sem novo `fetch`.

### `src/store.js`

Já está montado; confirma que o reducer fica na chave **`users`**, para bater com `state.users` no `useSelector`.

### `src/main.jsx`

Também já está: `Provider` + `store`. Vale a pena ler o ficheiro e perceber **porque** a árvore fica à volta do `Provider`.

### `src/UserList.jsx`

- `useDispatch` / `useSelector` para `state.users`.
- Ao **montar**, `useEffect` com `[dispatch]` a despachar **`fetchUsers()`**.
- Enquanto estiveres em **pending**, ou em **idle** sem dados ainda (primeira carga), mostra o loading simples (spinner + texto) que já está no JSX.
- Se **`failed`**, mostra o erro e o botão **Tentar novamente** a voltar a despachar o thunk.
- Com dados, o **map** dos cards já está; o **×** deve despachar **`deleteUser(id)`**.

### `src/SystemMonitor.jsx`

Lê `state.users` e substitui os valores fixos por:

- **THR_FETCH**: `loading !== 'idle'`
- **UI_RENDER**: `entities.length > 0`
- **RED_SYNC**: `entities.length < 10` (a API traz 10; depois de apagares um à mão, deve passar a verdadeiro)
- **ERR_HAND**: `loading === 'failed' || error != null` (o JSX já trata “Com erro” / “Sem erro”)

## Critérios mínimos

- Ao abrir a página, a lista aparece com dados da API.
- O **×** remove o card sem novo pedido HTTP.
- Se forçares falha (por exemplo URL errada à mão), vês o erro e **Tentar novamente** volta a tentar.
- O monitor acompanha o estado de forma coerente com as regras acima.

## Entrega

Segue o que o docente indicar (repositório, zip, plataforma). Para veres o que mudou em relação à solução: `git diff main..starter` (na pasta do repo).

## Branch `main`

Lá está uma implementação completa **só para consultares** depois de tentares por ti — não vale a pena copiar às cegas.
