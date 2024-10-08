
# Desafio Angular - Itaú

Olá, seja bem-vindo ao meu projeto! Este projeto foi um desafio para uma vaga de Angular no banco Itaú.

## Link para o readme antigo, com os requisitos do projeto:
[Caminho as requisitos](./especificações.md)

## Como rodar o projeto:

1. Clone o projeto:
   ```bash
   git clone https://github.com/karendev1/itau-angular-challenge.git
   ```
   
2. Acesse a branch:
   ```bash
   git checkout interview/karen-santana
   ```
   
3. Entre na pasta do projeto:
   ```bash
   cd toDoList
   ```
   
4. Instale as dependências:
   ```bash
   npm install
   ```
   
5. Rode o projeto:
   ```bash
   npm start
   ```
   > **Atenção**: Configurei para que, ao rodar `npm start`, o JSON Server também seja iniciado automaticamente.

6. Acesse o projeto em `localhost:4200` para utilizá-lo.

## Especificações

- **Banco de dados**: Utilizei o JSON Server para simular o banco de dados e as requisições HTTP.
- **Serviços**: Criei o service `TaskService` para realizar as requisições HTTP.
- **Componentes**: 
  - `TaskForm`
  - `TaskList`
  - `TaskItem`
  - `CompletedTasks`
  - `TaskModal`
  
- **Arquitetura**: A pasta `shared` contém os *enums*, interfaces, mocks e helpers utilizados no projeto. A pasta `core` contém o service e a pasta `components` contém os componentes utilizados no projeto.
- **Testes**: Todos os testes unitários foram feitos. Para rodar, execute:
  ```bash
  npm run test
  ```
- **Estilos**: As variáveis de cor estão definidas no arquivo `_variables.scss`, seguindo as boas práticas.
- **Metodologia BEM**: Para definição das classes, utilizei a metodologia BEM. Saiba mais em: [BEM Introduction](https://getbem.com/introduction/)
- **Commits**: Usei a padronização do [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) para organização dos commits.
- **Responsividade**: O projeto é totalmente responsivo, adequado tanto para web quanto para dispositivos móveis. Utilizei FlexBox, Grid e media queries.
- **Angular Signals**: Implementado no projeto.
- **Standalone Components**: Utilizado para otimização e organização dos componentes.

## Utilização

1. **Criar tarefa**:
   - Digite a tarefa no input e pressione "Enter" ou clique no botão "Adicionar".
   - A tarefa deve ter no mínimo 3 caracteres.

2. **Editar tarefa**:
   - Clique no ícone de lápis. Um input será habilitado para edição substituindo a label da tarefa.
   - Após editar, pressione "Enter" ou clique no ícone de confirmação para salvar.

3. **Excluir tarefa**:
   - Clique no ícone de lixeira para abrir um modal de confirmação.
   - Confirme para excluir a tarefa, ou cancele para mantê-la.

4. **Marcar como concluída**:
   - Marque a tarefa no checkbox para movê-la para a lista de "Tarefas concluídas".
   - A tarefa riscada será exibida com data e hora de conclusão.
   - Você pode removê-la da lista de concluídas, se desejar.

---

Obrigada pela oportunidade! Qualquer dúvida, estou à disposição. 😊
