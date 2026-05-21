# Backend

API do Solar Incident Manager para cadastro, acompanhamento e resolucao de incidentes tecnicos em sistemas solares.

## Como executar

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

A API ficara em `http://localhost:3333`.

## Testes

```bash
npm test
```

## Documentacao

Swagger disponivel em `http://localhost:3333/api-docs`.

## Logs

Os logs sao gravados em:

- `backend/logs/app.log`
- `backend/logs/error.log`
