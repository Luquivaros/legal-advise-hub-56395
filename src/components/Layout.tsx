
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';

const Layout = () => {
  
  const { user, setor } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar 
        userRole={setor || 'comercial'}
      />
      
      <main className="flex-1 transition-all duration-300 ease-in-out ml-52">
        <div className="p-6 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;