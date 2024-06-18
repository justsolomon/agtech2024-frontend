import Footer from '../Footer';
import Header from '../Header';
import styles from './layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className={styles['main-content']}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
