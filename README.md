# Como ligar o formulário a uma Google Sheet

1. Crie uma planilha nova no Google Sheets.
2. Vá em **Extensões > Apps Script**, apague o código que aparece e cole o conteúdo de `apps-script.gs`. Salve.
3. Clique em **Implantar > Nova implantação**, escolha o tipo **App da Web**.
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
4. Autorize o acesso e copie a URL que termina em `/exec`.
5. Abra `form.js` e cole a URL em `const SHEET_ENDPOINT = '';`.
6. Pronto: cada envio vira uma linha na aba **Respostas**, com data e hora.

Enquanto `SHEET_ENDPOINT` estiver vazio, o site funciona em modo demonstração: mostra a mensagem de sucesso e guarda o pedido no `localStorage` do navegador.

## Publicar no GitHub Pages
Suba esta pasta para um repositório, vá em **Settings > Pages**, escolha a branch `main` e a pasta `/ (root)`. O `index.html` já está na raiz.
