import React from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { PageContext } from '../../templates/post';
import MetaHeadOfTitle from './MetaHeadOfTitle';

interface Props {
  category?: string;
  data: {
    allCategoryYaml: {
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

const CategoryMetaHeadOfTitle: React.FC<Props> = ({ category = '', data }) => {
  return (
    <MetaHeadOfTitle
      title={category}
      edges={data.allCategoryYaml.edges}
      allMarkdownRemark={data.allMarkdownRemark} />
  );
};

export default CategoryMetaHeadOfTitle;
