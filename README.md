# Solar Incident Manager

Sistema para registro, acompanhamento e resolucao de incidentes tecnicos em sistemas solares.

O projeto foi criado como teste tecnico para demonstrar uma funcionalidade ponta a ponta com API, persistencia, validacoes, logs, testes automatizados e documentacao.

## Funcionalidades

- Cadastro de incidentes tecnicos
- Listagem e consulta por ID
- Edicao de dados do incidente
- Alteracao de status
- Exclusao de incidentes
- Filtros por status, prioridade e tipo
- Preenchimento automatico de `resolvedAt` ao resolver um incidente

## Tecnologias

### Back-end

- Node.js
- TypeScript
- Express
- Prisma
- SQLite
- Zod
- Jest
- Supertest
- Winston
- Swagger/OpenAPI

### Front-end

- React
- TypeScript
- Vite
- Axios
- React Hook Form
- Zod

## Como executar

### Back-end

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

A API ficara disponivel em:

```txt
http://localhost:3333
```

A documentacao Swagger ficara em:

```txt
http://localhost:3333/api-docs
```

### Testes do back-end

```bash
cd backend
npm test
```

## Endpoints principais

| Metodo | Rota | Descricao |
| --- | --- | --- |
| GET | `/api/incidents` | Lista incidentes |
| GET | `/api/incidents/:id` | Busca incidente por ID |
| POST | `/api/incidents` | Cria incidente |
| PUT | `/api/incidents/:id` | Atualiza incidente |
| PATCH | `/api/incidents/:id/status` | Atualiza status |
| DELETE | `/api/incidents/:id` | Remove incidente |

## Exemplo de incidente

```json
{
  "title": "Inversor offline",
  "description": "Inversor sem comunicacao desde ontem.",
  "clientName": "Joao da Silva",
  "unitCode": "3020547862",
  "type": "INVERTER_OFFLINE",
  "priority": "HIGH"
}
```

## Documentos adicionais

- [Nota tecnica](docs/nota-tecnica.md)
- [Analise de incidente](docs/analise-incidente.md)

