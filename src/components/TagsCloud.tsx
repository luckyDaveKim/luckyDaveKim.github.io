import { navigate } from 'gatsby';
import React from 'react';
import flow from 'lodash/fp/flow';
import flatMap from 'lodash/fp/flatMap';
import groupBy from 'lodash/fp/groupBy';
import map from 'lodash/fp/map';
import sortBy from 'lodash/fp/sortBy';
import slice from 'lodash/fp/slice';
import { TagCloud } from 'react-tagcloud';
import * as _ from 'lodash';
import { PageContext } from '../templates/post';


interface TagsCloudProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

interface Tag {
  value: string;
  count: number;
}

const TagsCloud: React.FC<TagsCloudProps> = props => {
  const minEmSize = 1;
  const maxEmSize = 5;

  const shownTagsCount = 60;
  const tags: Tag[] = flow(
    flatMap(({ node }) => node.frontmatter.tags),
    groupBy(tag => tag),
    map(tagGroup => ({ value: tagGroup[0], count: tagGroup.length })),
    sortBy(tag => -tag.count),
    slice(0, shownTagsCount),
  )(props.data.allMarkdownRemark.edges);

  // https://github.com/davidmerfield/randomColor#options 색상 참고
  const paintTag = {
    luminosity: 'light',
    hue: 'monochrome',
  };

  const renderTag = (tag: Tag, size: number, color: string) => (
    <span
      key={tag.value}
      style={{
        fontSize: `${size}em`,
        margin: '3px',
        padding: '3px',
        display: 'inline-block',
        color: `${color}`,
        cursor: 'pointer',
      }}
    >
      {tag.value}
    </span>
  );

  const onClickTag = (tag: Tag) => navigate(`/tags/${_.kebabCase(tag.value)}`);

  return (
    <TagCloud
      minSize={minEmSize}
      maxSize={maxEmSize}
      tags={tags}
      colorOptions={paintTag}
      renderer={renderTag}
      onClick={onClickTag}
    />
  );
};

export default TagsCloud;
