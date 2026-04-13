# Enunciado: User Management Dashboard (Redux Toolkit)

## Objetivo

Implementar a lógica Redux (slice assíncrono + UI) de um dashboard que lista utilizadores da API pública **JSONPlaceholder**, permite remover itens **apenas no estado local** e inclui um painel de **System Monitor** para validar mentalmente o fluxo de dados.

## Setup

Requisito: **Node.js 20+** (recomendado).

```bash
git checkout starter   # se ainda não estiver nesta branch
npm install
npm run dev
```

O projeto deve compilar; até implementares os `// TODO`, a app pode mostrar erros em runtime ou estados incompletos — é esperado.

## API

- **GET** `https://jsonplaceholder.typicode.com/users`
- Resposta: array de objetos utilizador (usa os campos que precisares; o UI de referência usa `name`, `username`, `email`, `company.name`, `id`).

## Estado Redux (`userSlice`)

O estado inicial deve seguir este formato:

| Campo      | Tipo / valores |
|------------|----------------|
| `entities` | `[]` — lista de utilizadores |
| `loading`  | `'idle' \| 'pending' \| 'succeeded' \| 'failed'` |
| `error`    | `null` ou `string` (mensagem) |

## Tarefas por ficheiro (ordem sugerida)

### 1. `src/userSlice.js`

1. **`fetchUsers`** — `createAsyncThunk` que faça `fetch` à URL acima, devolva o JSON em caso de sucesso e use **`rejectWithValue`** em falhas HTTP (`!res.ok`) ou em erros de rede (`catch`).
2. **`extraReducers`** com **`builder.addCase`** para:
   - `fetchUsers.pending` → `loading = 'pending'`, `error = null`
   - `fetchUsers.fulfilled` → `loading = 'succeeded'`, `entities =` payload
   - `fetchUsers.rejected` → `loading = 'failed'`, `error =` mensagem (usa `action.payload` quando usas `rejectWithValue`)
3. **`deleteUser`** (reducer síncrono) — remove da lista `entities` o utilizador cujo `id` vem em `action.payload` (apenas estado local; **não** chames a API).

### 2. `src/store.js`

- Garante `configureStore` com reducer registado como **`users`** (nome da chave na store), importando o reducer do `userSlice` (ex.: `usersReducer`).

### 3. `src/main.jsx`

- Importa **`Provider`** de `react-redux` e a **`store`** de `./store.js`.
- Envolve `<App />` com `<Provider store={store}>`.

### 4. `src/UserList.jsx`

1. `useDispatch`, `useSelector` para ler `state.users` (`entities`, `loading`, `error`).
2. `useEffect` (dependência `[dispatch]`) que despache **`fetchUsers()`** ao montar o componente.
3. Enquanto `loading === 'pending'` **ou** (`loading === 'idle'` **e** ainda não há dados — primeira carga), mostra o estado de carregamento simples (spinner + texto), como no layout fornecido.
4. Se `loading === 'failed'`, mostra painel de erro com **`error`** e botão **Tentar Novamente** que volta a despachar `fetchUsers`.
5. Em sucesso, mapeia `entities` para os **cards** (mantém o JSX e classes CSS). O botão **×** deve despachar **`deleteUser(id)`**.

### 5. `src/SystemMonitor.jsx`

- Usa `useSelector` para ler `state.users`.
- Calcula e usa nas badges (já existentes no layout):
  - **THR_FETCH** — `loading !== 'idle'`
  - **UI_RENDER** — `entities.length > 0`
  - **RED_SYNC** — `entities.length < 10` (a API devolve 10; após um delete local deve passar a verdadeiro)
  - **ERR_HAND** — `loading === 'failed' || error != null` (mostra “Com erro” / “Sem erro” conforme o JSX fornecido)

## Critérios de aceitação

- [ ] Lista carrega ao abrir a página (dados da API).
- [ ] Remover com **×** tira o card **sem** novo pedido HTTP.
- [ ] Simular falha (ex.: URL errada temporariamente) mostra erro e **Tentar Novamente** volta a tentar.
- [ ] System Monitor reflete mudanças de `loading`, `entities` e erro de forma coerente com as regras acima.

## Entrega

Segue as regras da unidade curricular (repositório, zip, ou plataforma indicada pelo docente). Comparação opcional com a branch `main` (solução de referência): `git diff main..starter` mostra o que foi pedido para implementar.

## Referência

A branch **`main`** contém a solução completa **apenas para estudo** — não copies sem perceberes o fluxo.
