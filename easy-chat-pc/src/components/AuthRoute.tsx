import { Navigate, useNavigate } from 'react-router-dom';

export const withAuth = (Component:React.FC<any>) => {
  return (props:any) => {
    const isAuthenticated = false; // 这里应该有你自己的认证逻辑
    if (!isAuthenticated) {
      // 如果未认证，重定向到登录页面
      // navigate('/login');
      return <Navigate to={'/login'}></Navigate>;
    }
    return <Component {...props} />;
  };
};