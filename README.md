# Gerenciamento de Produtos
![alt text](magalu-painel.png)

## Visão Geral
Este é um sistema de gerenciamento de produtos, desenvolvido com Next.js, TypeScript e Tailwind CSS, seguindo princípios de Test-Driven Development (TDD).

## Tecnologias Principais
- **Next.js 13+**: Framework React para renderização híbrida
- **TypeScript**: Adiciona tipagem estática ao JavaScript
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **React Hook Form**: Para gerenciamento de formulários
- **JSONPlaceholder**: API mock para simular dados de produtos
- **React Testing Library**: Para testes de componentes

## Funcionalidades Implementadas
- **Listagem**
  - Cards com imagem, nome, preço e especificações
  - Layout responsivo (mobile, tablet, desktop)

- **Cadastro**
  - Formulário com validação
  - Campos para especificações técnicas
  - Upload de url opcional de imagem

- **Filtros e Ordenação**
  - Busca por nome
  - Filtro por faixa de preço
  - Ordenação por nome, preço ou categoria
  - Ícones visuais para ordenação ascendente/descendente

- **Gerenciamento de Estado**
  - Context API para estado global
  - Separação clara entre lógica de negócios e UI

- **Testes**
  - Testes de componentes

## Configuração do Ambiente

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- npm install
- npm run dev

### Instalação
1. Clone o repositório
```bash
cd product-manager