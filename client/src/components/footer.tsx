import { Users } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-blue-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UserManager
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2025 UserManager. Built with React & TailwindCSS.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Manage your users with style and efficiency.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
