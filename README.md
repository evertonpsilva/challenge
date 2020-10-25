Projeto criado com intuito de ser um gerenciador de questões acadêmicas, sobre diversos temas.

## O que foi utilizado:

- NodeJS: v12.19.0
- ReactJS: v16.14.0
- @material-ui/core: v4.11.0
- @material-ui/icons: v4.9.1
- react-dom: v16.9.0,
- react-redux: v7.2.1,
- react-router-dom: v5.2.0
- axios: v0.20.0,
- history: v4.10.1,
- redux: v4.0.5,

## Como utilizar

Para utilizar o projeto virtualmente, você pode ![clicar aqui](https://ecstatic-newton-52a240.netlify.app/) que será redirecionado para o aplicativo em funcionamento. Foi feito deploy no site ![Netlify](https://www.netlify.com/) utilizando o comando "yarn build".

## Como instalar em máquina local

Para instalar o projeto, você precisa ter instado o NodeJS. Você pode baixar nesse ![link](https://nodejs.org/en/download/)<br />

Após isso, basta abrir um promp de comando e usar o comando "npm start" ou "yarn start". (O yarn é uma dependência externa que precisa ser instalada.)

Obs.: As versões utilizadas estão listadas acima.

### O projeto

O projeto utiliza uma api pública para buscar as categorias e questões, e realiza o gerenciamento das mesmas com redux, utilizando typescript.

Ao entrar na página inicial, serão listadas todas as categorias disponíveis. Ao selecionar uma, serão sorteadas 10 questões que iniciam no nível médio, porém podem alternar para fácil ou também difícil de acordo com seu desempenho. Caso você erre em sequência duas questões de mesmo nível, a próxima questão virá em um nível inferior (a regra não é aplicada caso já esteja no nível fácil). E em caso de acerto de duas questões em sequência do mesmo nível, a próxima questão será no nível superior (a regra não se aplica caso já esteja no nível difícil).

Finalizando a categoria selecionada, você será redirecionado para a página de resumo, onde mostrará os detalhes do seu desempenho, e terá a opção de voltar para a página inicial e escolher outra categoria. Caso selecione uma categoria que já foi finalizada, será redirecionado para a página de resumo.

## Imagens do projeto

### - Desktop
![Lista de categorias](https://github.com/evertonpsilva/challenge/tree/master/public/categories_desktop.PNG)
![Questão](https://github.com/evertonpsilva/challenge/tree/master/public/question_desktop.PNG)
![Resposta correta](https://github.com/evertonpsilva/challenge/tree/master/public/correct_answer_desktop.PNG)
![Resposta errada](https://github.com/evertonpsilva/challenge/tree/master/public/wrong_answer_desktop.PNG)
![Resumo de acertos](https://github.com/evertonpsilva/challenge/tree/master/public/category_results_desktop.PNG)

### - Mobile
![Listagem de categorias](https://github.com/evertonpsilva/challenge/tree/master/public/categories_mobile.PNG)
![Questão](https://github.com/evertonpsilva/challenge/tree/master/public/question_mobile.PNG)
![Resposta correta](https://github.com/evertonpsilva/challenge/tree/master/public/correct_answer_mobile.PNG)
![Resposta errada](https://github.com/evertonpsilva/challenge/tree/master/public/wrong_answer_mobile.PNG)
![Resumo de acertos](https://github.com/evertonpsilva/challenge/tree/master/public/category_results_mobile.PNG)
