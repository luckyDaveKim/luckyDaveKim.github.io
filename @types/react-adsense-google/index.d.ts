declare module 'react-adsense-google' {
  import React from 'react';

  interface GoogleProps {
    className?: string;
    style?: object;
    adClient: string;
    adSlot: string;
    adLayout?: string,
    adLayoutKey?: string;
    adFormat?: string;
    fullWidthResponsive?: string;
  }

  class GoogleAdsense extends React.Component<GoogleProps> {

  }

  export default GoogleAdsense
}
