import React from 'react';

import styled from '@emotion/styled';

import { inner, outer } from '../styles/shared';
import { PageContext } from '../templates/post';
import {PostCard} from './PostCard';
import { ReadNextCard } from './ReadNextCard';

interface ReadNextProps {
  tags: string[];
  currentPageSlug: string;
  relatedPosts: {
    totalCount: number;
    edges: Array<{
      node: {
        timeToRead: number;
        frontmatter: {
          date: string;
          title: string;
        };
        fields: {
          slug: string;
        };
      };
    }>;
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

export const ReadNext = ({ relatedPosts, currentPageSlug, tags, pageContext }: ReadNextProps) => {
  const showRelatedPosts = relatedPosts.totalCount > 1;

  return (
    <ReadNextAside className="read-next" css={outer}>
      <div css={inner}>
        <ReadNextFeed className="read-next-feed">
          {showRelatedPosts && (
            <ReadNextCard
              currentPageSlug={currentPageSlug}
              tags={tags}
              relatedPosts={relatedPosts}
            />
          )}

          {pageContext.prev && <PostCard post={pageContext.prev} />}
          {pageContext.next && <PostCard post={pageContext.next} />}
        </ReadNextFeed>
      </div>
    </ReadNextAside>
  );
};

const ReadNextAside = styled.aside`
  .post-card {
    padding-bottom: 0;
    border-bottom: none;
  }
  .post-card-excerpt {
    display: none;
  }
`;

const ReadNextFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -25px;PostFeedRaise
  padding: 60px 0 0 0;
`;
