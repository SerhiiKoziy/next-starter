import withAuthentication from 'hoc/withAuthentication';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context;

  return {
    props: { ...(await serverSideTranslations(locale as string, ['common', 'catalogs'])) },
  };
};

const Home = () => {

  return (
    <div>
      <p>Home custom page</p>
    </div>
  );
};

export default withAuthentication(Home, [], true);
