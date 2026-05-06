# Guia de Release Android

Este arquivo resume o processo recomendado para gerar, validar e publicar a proxima atualizacao Android do app.

## Estado atual da release

- `versionCode`: `7`
- `versionName`: `2.2`
- `applicationId`: `br.com.etedaf.reservas`
- ambiente de producao do app: `https://reservas-etedaf-api.onrender.com/api`

## O que ja foi preparado no projeto

- sessao mais estavel para uso no app, com `refresh token` de longa duracao
- ajuste de rolagem automatica nas telas do calendario
- build web sincronizado com o projeto Android via Capacitor
- `allowBackup` desativado no `AndroidManifest.xml`
- `usesCleartextTraffic` desativado no `AndroidManifest.xml`
- `usesCleartextTraffic` liberado apenas no `debug`, para testes locais no emulador
- scripts adicionados no `package.json` para facilitar build e sincronizacao

## Antes de abrir o Android Studio

1. No projeto Ionic, rode:
   - `npm run test:ci`
   - `npm run build:android`
2. Confirme que o backend de producao ja contem as mudancas necessarias para esta versao.
3. Confirme que o Render esta com:
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://www.etedaf.com.br`
   - `REFRESH_TOKEN_EXPIRES_IN=15d`
   - `ANDROID_MINIMUM_SUPPORTED_VERSION=2.2`
   - `ANDROID_LATEST_VERSION=2.2`
   - `ANDROID_STORE_URL=https://play.google.com/store/apps/details?id=br.com.etedaf.reservas`

## Teste no emulador

Se voce quer validar o app Android contra o backend local antes do deploy, use o modo de emulador:

1. Deixe o backend local rodando na porta `5000`.
2. No projeto Ionic, rode:
   - `npm run build:android:emulator`
3. Abra o projeto Android:
   - `npm run cap:open:android`
4. Espere o Gradle Sync terminar.
5. Escolha um emulador Android.
6. Rode o app em modo `debug`.
7. Valide pelo menos estes fluxos:
   - login
   - restauracao de sessao ao fechar e abrir o app
   - criacao de reserva
   - edicao da propria reserva
   - bloqueio de alteracao de reserva alheia
   - cancelamento de reserva
   - area administrativa
   - fluxo de redefinicao de senha
   - rolagem automatica ao selecionar data
   - rolagem automatica ao tocar em `Escolher aulas`
   - rolagem automatica ao tocar em `Cancelar aula`

Observacoes:
- nesse modo, o app usa `http://localhost:5000/api`
- antes de abrir o app no emulador, execute:
  - `adb reverse tcp:5000 tcp:5000`
- esse comando faz o `localhost` do emulador apontar para a porta `5000` do seu computador
- para validar a configuracao exata de producao antes da publicacao, rode `npm run build:android`

## Como funciona a exigencia de atualizacao

- o app Android consulta `GET /api/app/bootstrap` ao iniciar
- se a versao instalada estiver abaixo de `ANDROID_MINIMUM_SUPPORTED_VERSION`, o uso normal e bloqueado
- para permitir que uma versao antiga continue funcionando por algum tempo, basta manter a versao minima antiga no Render
- para obrigar a atualizacao depois da publicacao, basta subir `ANDROID_MINIMUM_SUPPORTED_VERSION` para a nova versao

## Gerar o AAB no Android Studio

1. No Android Studio, abra o modulo `android`.
2. No menu superior, clique em:
   - `Build` -> `Generate Signed Bundle / APK...`
3. Escolha:
   - `Android App Bundle`
4. Clique em `Next`.
5. Selecione a mesma `keystore` usada nas versoes anteriores.
6. Preencha:
   - `Key store path`
   - `Password`
   - `Key alias`
   - `Key password`
7. Clique em `Next`.
8. Marque:
   - `release`
9. Clique em `Create`.
10. Espere o Android Studio finalizar a geracao.

Observacao:
- o Android Studio costuma exibir um link clicavel com o caminho final do arquivo gerado
- um caminho comum e `android/app/build/outputs/bundle/release/app-release.aab`

## O que conferir antes de subir o AAB

- `versionCode` maior que o da ultima versao publicada
- `versionName` coerente com a release
- `applicationId` inalterado
- assinatura feita com a mesma keystore da versao anterior
- app abrindo e autenticando normalmente no emulador
- nenhuma URL local como `localhost` presente no build de producao
- antes de gerar o bundle final, rode novamente `npm run build:android`

## Subir o AAB para a Play Store

1. Acesse o [Google Play Console](https://play.google.com/console/).
2. Abra o aplicativo correto.
3. No menu lateral, escolha a trilha que voce vai usar.
   Recomendacao:
   - primeiro `Teste interno`, se quiser validar rapidamente no celular
   - depois `Producao`, quando estiver seguro
4. Clique em `Criar nova versao`.
5. Envie o arquivo `.aab`.
6. Aguarde o processamento do bundle.
7. Preencha as notas da versao.
8. Revise os avisos que o Play Console mostrar.
9. Salve.
10. Envie para revisao ou publique, conforme a trilha escolhida.

## Recomendacao de rollout

Se esta atualizacao mexe com autenticacao, reservas e experiencia mobile, o caminho mais seguro e:

1. publicar primeiro em `Teste interno`
2. validar com 1 ou 2 aparelhos reais
3. depois promover para `Producao`

## Comandos uteis

- `npm run test:ci`
- `npm run build:android`
- `npm run build:android:emulator`
- `npm run cap:sync`
- `npm run cap:open:android`
