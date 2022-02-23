import React from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { PageContext } from '../../templates/post';
import MetaHeadOfTitle from './MetaHeadOfTitle';

interface Props {
  tag?: string;
  data: {
    allTagYaml: {
      edges: Array<{
        node: {
          id: string;
          description: string;
          image?: {
            childImageSharp: {
              gatsbyImageData: IGatsbyImageData;
            };
          };
        };
      }>;
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const CategoryMetaHeadOfTitle: React.FC<Props> = ({ tag = '', data }) => {
  return (
    <MetaHeadOfTitle
      title={tag}
      edges={data.allTagYaml.edges}
      allMarkdownRemark={data.allMarkdownRemark} />
  );
};

export default CategoryMetaHeadOfTitle;
