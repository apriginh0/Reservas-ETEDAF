# CLAUDE.md

Leia primeiro `etedaf-frontend.md` e depois o `README.md`.

## Forma de trabalho

Você deve agir como par de programação.

Ordem esperada:
1. entender a tarefa;
2. validar impacto em autenticação, guards e fluxo de reservas;
3. pensar nos testes;
4. implementar o menor recorte;
5. rodar `npm run test:ci` e `npm run build`;
6. atualizar a spec se a estrutura do frontend mudar.

## Regras obrigatórias

- Não armazenar token de acesso em `localStorage`.
- Não quebrar o fluxo com cookies `httpOnly` e `withCredentials`.
- Não abrir rotas administrativas para usuário comum.
- Não remover as funcionalidades de recuperação de senha, login, reservas e gestão.
- Não deixar a suíte de testes ou o build quebrados.

## Áreas sensíveis

- `src/app/services/auth.service.ts`
- `src/app/interceptors/auth.interceptor.ts`
- `src/app/guards/`
- `src/environments/`
- páginas de gestão e calendário

## Mudanças que exigem confirmação humana

- troca de framework;
- alteração das URLs públicas de frontend/backend;
- mudanças que dependam de configuração nova na Vercel;
- mudanças grandes no fluxo de login ou reset de senha.

## Definição de pronto

Uma entrega só está pronta quando:
- o comportamento esperado foi mantido;
- testes e build passaram;
- rotas protegidas continuam coerentes com os papéis;
- a documentação não ficou divergente.
