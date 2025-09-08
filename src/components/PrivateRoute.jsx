import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (user === null) 
  return(
    <div className="flex justify-center items-center py-10 min-h-screen">
        <span className="loading loading-dots loading-xl text-stone-400"></span>
      </div>
  );
  return user ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;