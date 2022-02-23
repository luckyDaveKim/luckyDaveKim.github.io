import React from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { PageContext } from '../../templates/post';
import HeadOfTitle from './HeadOfTitle';

interface Props {
  title?: string;
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
  allMarkdownRemark: {
    totalCount: number;
    edges: Array<{
      node: PageContext;
    }>;
  };
}

const MetaHeadOfTitle: React.FC<Props> = ({ title = '', edges, allMarkdownRemark }) => {
  const metaData = edges.find(
    n => n.node.id.toLowerCase() === title.toLowerCase(),
  );

  const { totalCount } = allMarkdownRemark;
  const postsCount = (totalCount > 0) ? totalCount : 'No';
  const postNoun = (totalCount === 1) ? 'post' : 'posts';
  const subTitle = metaData?.node.description || `A collection of ${postsCount} ${postNoun}`;

  return (
    <HeadOfTitle
      backgroundImageSrc={metaData?.node?.image?.childImageSharp?.gatsbyImageData.images.fallback?.src}
      title={title}
      subTitle={subTitle}
    />
  );
};

export default MetaHeadOfTitle;
