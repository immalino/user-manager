import {
  BriefcaseBusiness,
  Edit2,
  Mail,
  Phone,
  Trash2,
  User,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  department: string;
  createdAt: string;
  updatedAt: string;
};

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          {/* User Avatar */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={user.name}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "";
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
              <div className="w-full h-full bg-white flex items-center justify-center">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-1">
              {user.name}
            </h3>
          </div>

          {/* User Info */}
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-blue-500" />
                <span className="text-sm truncate">{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-3 text-green-500" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BriefcaseBusiness className="w-4 h-4 mr-3 text-red-500" />
                <span className="text-sm">{user.department}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-6">
              <button
                onClick={() => {}}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={() => {}}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default UserList;
