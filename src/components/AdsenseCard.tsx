import React from 'react';
import GoogleAdsense from 'react-adsense-google';

import { PostCardStyles } from './PostCard';

export interface AdsenseCardProps {
  className?: string;
  style?: object;
  adClient: string;
  adSlot: string;
  adLayout?: string,
  adLayoutKey?: string;
  adFormat?: string;
  fullWidthResponsive?: string;
}

export const AdsenseCard: React.FC<AdsenseCardProps> = (adsenseCardProps) => {
  return (
    <article
      className={`post-card`}
      css={PostCardStyles}
    >
      <GoogleAdsense
        className={adsenseCardProps.className}
        style={adsenseCardProps.style}
        adClient={adsenseCardProps.adClient}
        adSlot={adsenseCardProps.adSlot}
        adLayout={adsenseCardProps.adLayout}
        adLayoutKey={adsenseCardProps.adLayoutKey}
        adFormat={adsenseCardProps.adFormat}
        fullWidthResponsive={adsenseCardProps.fullWidthResponsive}
      />
    </article>
  );
};
