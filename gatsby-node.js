const path = require(`path`);
const axios = require('axios');

exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};
exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  //   const quizData = {
  //     title: '3Bee Quiz - Test',
  //     questions: [
  //       {
  //         id: '2',
  //         order: '2',
  //         text: "Qual'è l'ape?",
  //         type: 'picture',
  //         options: [
  //           {
  //             label: 'Ape',
  //             img: 'https://images.unsplash.com/photo-1599342547798-48a6b801afde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  //             isCorrect: true,
  //           },
  //           {
  //             label: 'Gatto',
  //             img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1927&q=80',
  //           },
  //           {
  //             label: 'Procione',
  //             img: 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  //           },
  //         ],
  //       },
  //       {
  //         id: '1',
  //         order: '1',
  //         text: "Il 'Rosso' è un?",
  //         options: [
  //           {
  //             label: 'Animale',
  //           },
  //           {
  //             label: 'Colore',
  //             isCorrect: true,
  //           },
  //           {
  //             label: 'Cibo',
  //           },
  //         ],
  //       },
  //       {
  //         id: '3',
  //         order: '1',
  //         text: '10 * 10?',
  //         options: [
  //           {
  //             label: '20',
  //           },
  //           {
  //             label: '1000',
  //           },
  //           {
  //             label: '100',
  //             isCorrect: true,
  //           },
  //         ],
  //       },
  //     ],
  //   };

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
