import { graphql } from 'gatsby';
import React from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import { Footer } from '../components/Footer';
import { PostCard } from '../components/PostCard';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { inner, outer, PostFeed, SiteMain } from '../styles/shared';
import { PageContext } from './post';
import { Helmet } from 'react-helmet';
import config from '../website-config';
import Pagination from '../components/Pagination';
import MetaHeadOfTitle from '../components/header/MetaHeadOfTitle';

interface CategoryTemplateProps {
  location: Location;
  pageContext: {
    limit: number;
    skip: number;
    currentPage: number;
    numPages: number;
    pathPrefix: string;
    category: string;
  };
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

const Category: React.FC<CategoryTemplateProps> = ({ location, pageContext, data }) => {
  const category = pageContext.category ? pageContext.category : '';
  const { edges } = data.allMarkdownRemark;
  const CategoryData = data.allCategoryYaml.edges.find(
    n => n.node.id.toLowerCase() === category.toLowerCase(),
  );

  return (
    <IndexLayout>
      <Helmet>
        <title>
          {category} - {config.title}
        </title>
        <meta name="description" content={CategoryData?.node ? CategoryData.node.description : ''} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${category} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + location.pathname} />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + location.pathname} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
      </Helmet>
      <Wrapper>
        <MetaHeadOfTitle
          category={pageContext.category}
          data={data}
        />
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={PostFeed}>
              {edges.map(({ node }) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </main>
        <Pagination
          currentPage={pageContext.currentPage}
          numPages={pageContext.numPages}
          pathPrefix={pageContext.pathPrefix}
        />
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Category;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $category: String!) {
    allCategoryYaml {
      edges {
        node {
          id
          description
          image {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                width: 1440
              )
            }
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { category: { eq: $category } }, frontmatter: { draft: { ne: true } } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            excerpt
            tags
            date
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 1440
                )
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
