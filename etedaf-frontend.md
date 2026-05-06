# ETEDAF Frontend Spec

## Visão geral

O frontend da ETEDAF é a interface web para o sistema de reservas. Ele consome a API do projeto e é publicado na Vercel.

## Objetivo

Oferecer uma interface clara para:
- autenticação;
- recuperação de senha;
- visualização e criação de reservas;
- gestão administrativa de usuários aprovados e pendentes.

## Escopo atual

- home pública;
- login;
- reset de senha;
- reserva de sala;
- calendário e gestão de reservas;
- páginas de gestão para administradores.

## Fora de escopo

- app mobile nativo publicado;
- internacionalização;
- dashboards analíticos;
- permissões finas além de `admin` e `teacher`.

## Arquitetura

- `src/app/services/`: comunicação com a API
- `src/app/interceptors/`: cookies, tratamento de 401 e políticas HTTP
- `src/app/guards/`: proteção de autenticação e papel
- `src/app/pages/`: páginas de rota
- `src/environments/`: URLs por ambiente

## Modelo de sessão

- autenticação baseada em cookies `httpOnly`;
- frontend não deve persistir `access_token` em `localStorage`;
- usuário atual é carregado a partir de `/api/auth/me`.

## Requisitos funcionais

1. Usuário autenticado deve navegar normalmente pelo fluxo de reservas.
2. Usuário admin deve acessar gestão de professores.
3. Usuário comum não deve acessar rotas administrativas.
4. Recuperação de senha deve continuar acessível e funcional.
5. O frontend deve operar contra backend local em desenvolvimento.

## Requisitos não funcionais

- build de produção deve passar;
- testes headless devem passar;
- sessão deve sobreviver a refresh de página via cookies;
- mudanças em auth devem minimizar regressões visuais e funcionais.

## Ambientes

- `environment.ts`: backend local `http://localhost:5000/api`
- `environment.prod.ts`: backend de produção no Render

## Estratégia de testes

- Karma/Jasmine para componentes, guards, interceptors e services
- validação manual dos fluxos:
  - login/logout
  - acesso negado a usuário comum em gestão
  - reservas
  - recuperação de senha

## Estratégia de deploy

- código hospedado no GitHub;
- publicação pela Vercel;
- CI do GitHub Actions deve rodar testes e build antes do merge/deploy.

## Riscos atuais

- bundle inicial grande;
- dependências CommonJS como `moment-timezone` e `localforage`;
- cobertura ainda mais focada em smoke tests do que em comportamento profundo.

## Próximo passo recomendado

Adicionar testes mais comportamentais para guards e fluxos administrativos, e avaliar redução gradual das dependências CommonJS mais pesadas.
