import style from './style.module.css';

export const ListLayout = ({ children }) => {
  return (
    <div className={style.container}>      
      {children}
    </div>
  );
};