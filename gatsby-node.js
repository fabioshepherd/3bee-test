const path = require(`path`);
const axios = require('axios');

exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};
exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const quizData = await axios.get(
    'https://mocki.io/v1/0f39c5e6-2e5e-4222-b8ca-d15dcf16e27a'
  );

  // Creo una pagina per ogni domanda
  const questions = quizData.data.questions.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });

  questions.map((question, i) => {
    let component = null;
    switch (question.type) {
      case 'picture':
        component = require.resolve('./src/templates/quizPictureQuestion.jsx');
        break;

      default:
        component = require.resolve('./src/templates/quizTextQuestion.jsx');

        break;
    }

    createPage({
      path: `/${question.id}`,
      component: component,
      context: {
        question,
        nextPath:
          i + 1 > questions.length - 1 ? null : `/${questions[i + 1].id}`,
      },
    });
  });
};
