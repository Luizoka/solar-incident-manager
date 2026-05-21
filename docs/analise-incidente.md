# Analise de incidente

## Cenario

Durante a operacao da API, foi identificado erro recorrente ao atualizar o status de incidentes tecnicos.

## Logs observados

```txt
[ERROR] 2026-05-20T14:22:10Z PATCH /api/incidents/8/status
ValidationError: Invalid enum value. Expected OPEN | IN_PROGRESS | RESOLVED | CANCELED, received "FINALIZADO"

[ERROR] 2026-05-20T14:23:41Z PATCH /api/incidents/9/status
ValidationError: Invalid enum value. Expected OPEN | IN_PROGRESS | RESOLVED | CANCELED, received "EM_ANDAMENTO"
```

## Impacto

Os incidentes nao tinham o status atualizado, o que impedia a equipe tecnica de acompanhar corretamente quais chamados estavam em atendimento ou resolvidos.

## Causa raiz

O front-end estava enviando valores em portugues, como `FINALIZADO` e `EM_ANDAMENTO`, enquanto a API aceitava apenas os valores definidos no contrato:

- `OPEN`
- `IN_PROGRESS`
- `RESOLVED`
- `CANCELED`

A causa raiz foi a inconsistencia entre os valores usados na interface e os valores aceitos pelo back-end.

## Correcao aplicada

- Os enums foram centralizados no contrato da API.
- O front-end deve enviar os valores tecnicos esperados pela API.
- O back-end valida novamente os dados com Zod.
- A API retorna erro claro quando o status recebido e invalido.
- Foi adicionado teste cobrindo status invalido.

## Prevencao

- Manter documentacao Swagger atualizada.
- Evitar duplicacao manual de enums entre front-end e back-end.
- Adicionar testes de integracao para os fluxos principais.
- Melhorar logs com `requestId` para rastrear uma requisicao completa.
- Monitorar aumento de erros `400` em rotas criticas.

