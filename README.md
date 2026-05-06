# Reservas ETEDAF

Frontend Ionic/Angular do sistema de reservas da ETEDAF. Ele consome a API hospedada no Render e publica a interface na Vercel.

## Objetivo

Permitir que professores e administradores:
- façam login;
- consultem salas e reservas;
- criem reservas;
- gerenciem aprovações e papéis quando forem administradores;
- recuperem senha sem suporte manual.

## Stack

- Angular 18
- Ionic 8
- Karma/Jasmine para testes
- Vercel para publicação web

## Setup local

1. Instale as dependências com `npm install`.
2. Garanta que o backend local esteja disponível em `http://localhost:5000`.
3. Rode `npm start`.

## Ambientes

- desenvolvimento: `src/environments/environment.ts`
- produção: `src/environments/environment.prod.ts`

## Scripts

- `npm start`: sobe a aplicação localmente
- `npm run build`: gera build de produção
- `npm run test`: abre a suíte padrão do Angular
- `npm run test:ci`: roda testes headless para CI
- `npm run lint`: lint do projeto

## Observações de sessão

- o frontend usa `withCredentials` para trabalhar com cookies `httpOnly`;
- o estado de usuário é hidratado via `/api/auth/me`;
- mudanças em autenticação devem ser testadas junto com o backend local.

## Documentação do projeto

- `CLAUDE.md`: protocolo operacional de trabalho
- `etedaf-frontend.md`: spec viva do frontend
