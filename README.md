# User Management Dashboard (Redux Toolkit)

Projeto Vite + React + Redux Toolkit: lista de utilizadores via `createAsyncThunk`, slice com estado assíncrono e monitor de diagnóstico opcional.

## Branches

| Branch    | Conteúdo |
|-----------|----------|
| `main`    | **Solução de referência** (completa). |
| `starter` | **Exercício para alunos** — ficheiros com `// TODO` e `ENUNCIADO.md` na raiz (só nesta branch). |

## Para alunos (branch `starter`)

```bash
git clone <url-do-repositorio>.git
cd react-a-2
git checkout starter
npm install
npm run dev
```

Na raiz do projeto, lê **ENUNCIADO.md** e implementa os passos indicados nos comentários `// TODO` nos ficheiros em `src/`.

## Para docentes

- Correção: comparar com `main` ou fazer `git diff main..starter` para ver o que falta implementar.
- Node.js recomendado: **20+**.

## Publicar no GitHub (docente)

Na primeira vez, cria o repositório vazio no GitHub e:

```bash
git remote add origin https://github.com/<utilizador>/<repo>.git
git push -u origin main
git push -u origin starter
```

Os alunos clonam e fazem `git checkout starter`.

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run lint` — ESLint
