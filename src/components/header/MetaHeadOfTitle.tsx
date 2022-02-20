import React from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { PageContext } from '../../templates/post';
import HeadOfTitle from './HeadOfTitle';

interface Props {
  category: string;
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

const MetaHeadOfTitle: React.FC<Props> = ({ category, data }) => {
  const title = category || '';

  const MetaData = data.allCategoryYaml.edges.find(
    n => n.node.id.toLowerCase() === title.toLowerCase(),
  );

  const { totalCount } = data.allMarkdownRemark;
  const postsCount = (totalCount > 0) ? totalCount : 'No';
  const postNoun = (totalCount === 1) ? 'post' : 'posts';
  const subTitle = MetaData?.node.description || `A collection of ${postsCount} ${postNoun}`;

  return (
    <HeadOfTitle
      backgroundImageSrc={MetaData?.node?.image?.childImageSharp?.gatsbyImageData.images.fallback?.src}
      title={title}
      subTitle={subTitle}
    />
  );
};

export default MetaHeadOfTitle;
