import React from 'react';

type HomePageLayoutProps = {
  seoTitle?: string;
  children?: React.ReactNode;
};

const HomePageLayout: React.FC<HomePageLayoutProps> = ({ children }) => {
  return (
    <div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default HomePageLayout;
