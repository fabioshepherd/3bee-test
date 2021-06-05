import { Link } from 'gatsby';
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const IndexPage = ({ data }) => {
  const questions = data?.allSitePage?.edges?.filter(
    (el) => el.node.context.question !== null
  );

  questions.sort((a, b) => {
    if (a.node.context.question.order < b.node.context.question.order) {
      return -1;
    }
    if (a.node.context.question.order > b.node.context.question.order) {
      return 1;
    }
    return 0;
  });
  const firstQuestionPath = questions[0]?.node?.path;

  return (
    <div className='container mx-auto px-4 pt-10 flex items-center content-center h-full w-full'>
      <div className='container mx-auto px-4 pt-10 text-center'>
        <div className='text-l'>
          <span className='text-yellow-400 font-bold'>3Bee</span> test
        </div>
        <div className='text-4xl font-bold mb-10'>QUIZ</div>
        <Link to={firstQuestionPath}>
          <button className='text-l font-light bg-gray-900 text-gray-50 rounded-xl px-4 py-4'>
            Vai alla prima domanda!
          </button>
        </Link>
      </div>
    </div>
  );
};

export const query = graphql`
  {
    allSitePage {
      edges {
        node {
          id
          context {
            question {
              id
              order
            }
          }
          path
        }
      }
    }
  }
`;

export default IndexPage;
