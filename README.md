# Adega

Catálogo pessoal de vinhos feito com React, TypeScript e Vite. Permite registrar rótulos com foto, editar ou excluir registros, marcar favoritos e explorar a coleção por busca, cor, doçura e safra.

## Executar

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Para validar e gerar a versão de produção:

```bash
npm run lint
npm run build
npm run preview
```

## Dados

Os registros são guardados no `localStorage` do navegador. Não há servidor, conta ou sincronização entre dispositivos. As fotos selecionadas são redimensionadas e comprimidas no navegador antes de serem salvas; como o armazenamento local é limitado pelo navegador, ele não substitui um backup. Os oito vinhos desta coleção são carregados na primeira visita. Se houver dados da versão anterior, os exemplos antigos são substituídos, preservando registros adicionados pelo usuário.

As fotos dos rótulos e as fontes tipográficas são carregadas de serviços externos e precisam de conexão com a internet. Fotos adicionadas pelo usuário ficam no armazenamento local do navegador.