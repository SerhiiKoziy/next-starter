import React from 'react';
import styles from './styles.module.css'

type PageLayoutProps = {
  seoTitle?: string;
  children?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.pageLayout}>
      <div className={styles.header}>
        Header
      </div>
      <div className={styles.container}>
        {children}
      </div>
      <div className={styles.footer}>
        Footer
      </div>
    </div>
  );
};

export default PageLayout;
