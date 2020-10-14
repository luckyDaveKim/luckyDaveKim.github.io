import React, { useLayoutEffect, useRef } from 'react';
import config from '../website-config'

const Comment: React.FC = React.memo(()  => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!config.utterancesRepo) {
      return;
    }

    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo: config.utterancesRepo,
      'issue-term': 'pathname',
      label: 'comment',
      theme: 'github-light',
      crossOrigin: 'anonymous',
      async: 'true',
    };

    const utterances = document.createElement('script');
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    containerRef.current?.appendChild(utterances);
  }, []);

  return <div ref={containerRef} />;
});

export default Comment;
