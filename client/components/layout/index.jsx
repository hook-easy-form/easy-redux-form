import style from './style.module.css';

export const Layout = ({ children }) => {
  return (
    <div className={style.container}>
      <main className={style.main}>
        {children}
      </main>
    </div>
  );
};