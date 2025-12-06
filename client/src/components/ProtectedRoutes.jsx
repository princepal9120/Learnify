import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  // If NOT authenticated, show login page
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  // If authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  if (user?.role !== "instructor") {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center border-3 border-black p-8">
          <p className="font-black text-xl mb-4">Access Denied</p>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </motion.div>
    );
  }

  return children;
};
