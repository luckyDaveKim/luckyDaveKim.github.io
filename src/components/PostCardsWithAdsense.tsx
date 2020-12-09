import React from 'react';

import { PageContext } from '../templates/post';
import { AdsenseCard } from './AdsenseCard';
import { PostCard } from './PostCard';

export interface PostCardsWithAdsenseProps {
  posts: Array<{
    node: PageContext
  }>;
  page: number;
}

export const PostCardsWithAdsense: React.FC<PostCardsWithAdsenseProps> = ({posts, page}) => {
  const adsenseInsertable: boolean = posts.length >= 3;
  const adsenseFeedIndex: number = (page % 3) + 1;

  return (
    <>
      {posts.map((post, index) => {
        return (
          (adsenseInsertable && index === adsenseFeedIndex)
            ? (
              <>
                <AdsenseCard
                  adClient='ca-pub-7933583473323654'
                  adSlot='3191663602'
                  style={{'display': 'block'}}
                  adLayout='in-article'
                  adLayoutKey='-5z+dd+31-e1+74'
                  adFormat='fluid'
                />
                <PostCard key={post.node.fields.slug} post={post.node}/>
              </>
            )
            : (<PostCard key={post.node.fields.slug} post={post.node}/>)
        )
      })}
    </>
  );
};
