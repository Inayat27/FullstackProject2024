import { Outlet } from "react-router-dom";

function AuthLayout() {
  //   const isAuthenticated = false;

  return (
    <div className="flex items-center justify-center">
      {/* {isAuthenticated ? (<Navigate to='/' />):"False"} */}

      <Outlet />
    </div>
  );
}

export default AuthLayout;
