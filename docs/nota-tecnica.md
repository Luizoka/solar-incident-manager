# Nota tecnica

## Decisoes tecnicas

O projeto foi separado em back-end e front-end para manter responsabilidades claras. A API concentra regras de negocio, persistencia, validacoes e logs. A interface web consome a API e organiza os fluxos de cadastro, acompanhamento e atualizacao dos incidentes.

O back-end utiliza TypeScript para aumentar seguranca de tipos e facilitar manutencao. O Express foi escolhido por ser simples, direto e adequado para uma API pequena. O Prisma foi usado para modelagem do banco e acesso aos dados, reduzindo codigo repetitivo de persistencia.

O SQLite foi escolhido para simplificar a execucao local do teste tecnico. A estrutura com Prisma permite migracao futura para PostgreSQL com baixo esforco, caso o projeto avance para um ambiente de producao.

O Zod foi usado para validar dados de entrada antes das operacoes de negocio. Isso evita valores soltos para tipo, prioridade e status, e torna os erros da API mais previsiveis.

Os logs foram adicionados para apoiar diagnostico de criacao, atualizacao, alteracao de status, remocao e falhas nos fluxos principais da API.

## Trade-offs

O projeto nao possui autenticacao para manter o escopo adequado ao prazo do teste. Em um produto real, o gerenciamento de incidentes deveria identificar quem criou, alterou ou resolveu cada registro.

O SQLite facilita avaliacao local, mas PostgreSQL seria mais indicado para producao por robustez, concorrencia e recursos de administracao.

Os testes automatizados foram concentrados no back-end por ser a camada com regras de negocio e persistencia. Como melhoria futura, seriam adicionados testes de componentes e fluxos no front-end.

## Melhorias futuras

- Autenticacao e niveis de permissao
- Historico de alteracoes do incidente
- Comentarios internos por incidente
- Upload de imagens ou anexos
- Dashboard com indicadores operacionais
- Paginacao na listagem
- Testes end-to-end
- Docker Compose
- Migracao para PostgreSQL em producao

