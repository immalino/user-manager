import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const Header = () => {
  return (
    <div className="text-center mb-8">
      <Link
        to="/users"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Users
      </Link>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">Add New User</h1>
      <p className="text-xl text-gray-600">
        Fill in the details below to add a new user to the system
      </p>
    </div>
  );
};
export default Header;
