# Roteamento de IA - Frontend

Este projeto é o front-end em Angular para o serviço de **Roteamento de IA**, que consome a API FastAPI responsável por criar prompts, executar chamadas a modelos de IA (ChatGPT/Gemini) e exibir métricas.

---

## 🚀 Começando

### Pré-requisitos

- Node.js v18+ e npm
- Angular CLI
- Backend FastAPI em execução (http://localhost:8000)

### Instalação

1. Clone este repositório:
   ```bash
   git clone <seu-repo-frontend-url>
   cd roteamento-ia-frontend
   ```

2. Instale dependências:
   ```bash
   npm ci
   ```

3. Configure o proxy (evita CORS)
   - O arquivo `src/proxy.conf.json` já está pronto; aponta `/api` para `http://localhost:8000`.

---

## 🛠️ Comandos Úteis

- **Desenvolvimento** (com hot‑reload):
  ```bash
  npm run start
  ```
  Acesse: http://localhost:4200

- **Build de produção**:
  ```bash
  npm run build
  ```
  Os arquivos compilados ficarão em `dist/`

- **Testes unitários**:
  ```bash
  npm test
  ```

---

## 🔧 Estrutura do Projeto

```
src/
├── app/                  # Código-fonte Angular
│   ├── components/       # Componentes de UI
│   │   ├── prompt-list/  # Lista e ações em prompts
│   │   ├── prompt-form/  # Formulário de criação de prompt
│   │   ├── execute/      # UI para executar prompts
│   │   └── metrics/      # Visualização de métricas
│   ├── models/           # Interfaces TypeScript (Prompt, Execution, Metrics)
│   ├── services/         # ApiService para comunicação HTTP
│   └── app.routes.ts     # Configuração de rotas
├── assets/
├── environments/         # Configurações de ambiente
│   ├── environment.ts    # Development
│   └── environment.prod.ts
├── proxy.conf.json       # Proxy para redirecionar /api → backend
├── index.html            # Template HTML principal
└── styles.scss           # Estilos globais
```

---

## 📡 Integração com a API

Todas as chamadas são feitas para caminhos que começam com `/api`, devido ao proxy angular:
```
GET     /api/prompts            # Lista todos os prompts
POST    /api/prompts            # Cria um novo prompt
POST    /api/execute            # Executa um prompt existente
GET     /api/prompts/{id}/metrics  # Retorna métricas de um prompt
```

O `ApiService` em `src/app/services/api.service.ts` encapsula esses calls usando `HttpClient`.

---

## 🔮 Próximos Passos

- Implementar feedback de erro e loading states em cada componente
- Adicionar componentes de modal para confirmação de ações (delete)
- Melhorar estilização com Angular Material
- Criar gráficos simples para latência/custo (e.g., Chart.js)
---


