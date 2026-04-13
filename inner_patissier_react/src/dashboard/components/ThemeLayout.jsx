// components/ThemeLayout.jsx
import { Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const ThemeLayout = () => {
  const { currentMode } = useStateContext();

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="bg-white dark:bg-main-dark-bg min-h-screen text-slate-900 dark:text-gray-200">
        <Outlet />
      </div>
    </div>
  );
};

export default ThemeLayout;