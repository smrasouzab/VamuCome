# VamuCome - Front

Parte Front-end do projeto VamuCome.
## Utilizar o projeto

### Requisitos

- Node v22.12.0 ou superior

### Instalação e Inicialização

Começamos clonando ele do repositório do GitHub e adentrando a pasta:

```bash
  git clone https://github.com/smrasouzab/VamuCome.git
  cd VamuCome/Front
```

Precisamos instalar as dependências do projeto para funcionar:

```bash
  npm install
```

Para inicializar na versão de desenvolvimento basta digitar:

```bash
  npm run dev
```

### Observação

Pode ser necessário alterar o URL da API no arquivo `Api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8082', // Altere para o URL da API
});

export default api;
```


## Autores

- [@thiago420](https://github.com/thiago420)