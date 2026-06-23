# 💰 DT Money App: Gestão Financeira Pessoal com Performance e Escalabilidade

## 🎯 O Problema que este Projeto Resolve

Gerenciar finanças pessoais pode ser um desafio, especialmente quando se busca uma visão clara e organizada de receitas e despesas. Muitas aplicações existentes falham em oferecer uma experiência de usuário fluida, com carregamento rápido e navegação intuitiva, ou carecem de funcionalidades essenciais como filtragem avançada e categorização eficiente. Além disso, a performance em dispositivos móveis é crucial para uma boa experiência.

Este projeto foi desenvolvido para resolver a necessidade de uma ferramenta de gestão financeira pessoal que seja:
1.  **Performática e Responsiva:** Oferecendo uma experiência de usuário fluida e sem travamentos, mesmo com um grande volume de transações.
2.  **Intuitiva e Completa:** Permitindo o registro fácil de transações, categorização, filtragem e visualização de saldos.
3.  **Escalável e Manutenível:** Construída com uma arquitetura que facilita a adição de novas funcionalidades e a manutenção do código.
4.  **Otimizada para Mobile:** Com foco em uma experiência nativa e eficiente em dispositivos móveis.

---

## Visão Geral

O DT Money App é uma aplicação móvel de gestão financeira pessoal, desenvolvida com **React Native (Expo)**, que permite aos usuários registrar, categorizar e visualizar suas transações (receitas e despesas) de forma eficiente. O foco principal do projeto é demonstrar a construção de uma aplicação robusta, performática e com uma arquitetura bem definida, utilizando as melhores práticas do ecossistema React Native.

## Solução Implementada

O aplicativo foi construído como uma solução Full Stack (com um backend separado, `DT-money-backend`, que interage via API) e se destaca pela sua abordagem técnica para garantir performance e uma excelente experiência de usuário. As principais funcionalidades e soluções técnicas incluem:

*   **Gerenciamento de Estado Otimizado:** Utilização da **React Context API** para gerenciar o estado global das transações, categorias e filtros, garantindo que os dados sejam acessíveis e atualizados de forma eficiente em toda a aplicação.
*   **Performance de Renderização:** Implementação de `useCallback` e `useMemo` em pontos estratégicos para evitar re-renderizações desnecessárias de componentes e funções, resultando em uma interface fluida e responsiva.
*   **Formulários Inteligentes e Validados:** Uso do **React Hook Form** em conjunto com o **Yup** para a criação de formulários performáticos e com validação robusta, minimizando o impacto na renderização e garantindo a integridade dos dados.
*   **Filtragem e Paginação Avançadas:** Lógica de negócios para filtrar transações por texto, categoria e data, além de uma implementação de paginação (scroll infinito) que otimiza o carregamento de grandes volumes de dados.
*   **Interface de Usuário Moderna e Responsiva:** Estilização com **NativeWind (Tailwind CSS para React Native)**, garantindo um design consistente e adaptável a diferentes tamanhos de tela e dispositivos.
*   **Interações Fluidas:** Componentes de UI como `Gorhom Bottom Sheet` e animações com `React Native Reanimated` proporcionam uma experiência de usuário rica e interativa.

## Stack Tecnológica

*   **Frontend (Mobile):** [React Native](https://reactnative.dev/) (com [Expo](https://expo.dev/))
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
*   **Estilização:** [NativeWind](https://www.nativewind.dev/) (Tailwind CSS para React Native)
*   **Gerenciamento de Estado:** [React Context API](https://react.dev/learn/passing-props-with-a-context)
*   **Formulários:** [React Hook Form](https://react-hook-form.com/) com [Yup](https://github.com/jquense/yup) (validação de esquemas)
*   **Consumo de API:** [Axios](https://axios-http.com/)
*   **Navegação:** [React Navigation](https://reactnavigation.org/) ([Native](https://reactnavigation.org/docs/native-stack-navigator/) & [Stack](https://reactnavigation.org/docs/stack-navigator/))
*   **Componentes de UI:**
    *   [Gorhom Bottom Sheet](https://gorhom.github.io/react-native-bottom-sheet/)
    *   [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
    *   [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
*   **Armazenamento Local:** [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
*   **Utilitários:** [Date-fns](https://date-fns.org/), [Clsx](https://github.com/clsx-unit/clsx), [Qs](https://github.com/ljharb/qs)

## Arquitetura e Design

O projeto adota uma arquitetura modular, com uma clara separação de responsabilidades entre as camadas de UI (`screens`, `components`), gerenciamento de estado (`context`), e lógica de negócios/integração com API (`shared/services`). Essa abordagem facilita a manutenção, o teste e a escalabilidade da aplicação. O uso de TypeScript em todo o projeto garante a segurança de tipos e melhora a experiência do desenvolvedor.


## Pré-visualização  

| Tela de Login | Tela de Dashboard |
|---------------|------------------|
| <img src="https://github.com/user-attachments/assets/edbff45c-cbbd-4915-8304-fe89dd15f536" width="250" /> | <img src="https://github.com/user-attachments/assets/820b0cfd-edde-492e-9efe-112fce336a67" width="250" /> |

---

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar o ambiente de desenvolvimento e executar o projeto em sua máquina.

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/) (versão 18 ou superior)
*   [pnpm](https://pnpm.io/) (ou npm/yarn)
*   [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/ElFabrica/dt-money-app.git
cd dt-money-app/dt-money-app
```

### Passo 2: Instalar Dependências

```bash
pnpm install
```

### Passo 3: Configurar o Backend (Opcional, mas recomendado)

Este projeto foi projetado para funcionar com um backend. Você pode encontrar o repositório do backend aqui: [DT-money-backend](https://github.com/ElFabrica/dt-money-app/tree/main/DT-money-backend). Siga as instruções no README do backend para configurá-lo e executá-lo localmente.

Após configurar o backend, crie um arquivo `.env` na raiz do projeto `dt-money-app` com a URL da sua API:

```env
EXPO_PUBLIC_API_URL=http://localhost:3333/api
```

### Passo 4: Executar o Projeto

Inicie o servidor de desenvolvimento do Expo:

```bash
pnpm start
```

Você pode então escanear o QR Code com o aplicativo Expo Go no seu celular ou rodar em um emulador/simulador.

## 🛠️ Scripts Disponíveis

*   `pnpm start`: Inicia o servidor de desenvolvimento do Expo.
*   `pnpm android`: Executa a aplicação em um emulador/dispositivo Android.
*   `pnpm ios`: Executa a aplicação em um simulador/dispositivo iOS.
*   `pnpm web`: Inicia a aplicação em um navegador web.
