import { Search } from "lucide-react";

const NoResultSearch = ({
  setSearchTerm,
}: {
  setSearchTerm: (term: string) => void;
}) => {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        No users found
      </h3>
      <p className="text-gray-500">
        Try adjusting your search criteria or clear the search to see all users.
      </p>
      <button
        onClick={() => setSearchTerm("")}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Clear Search
      </button>
    </div>
  );
};
export default NoResultSearch;
