import { createFileRoute } from "@tanstack/react-router";
import Header from "./-components/header";
import { useState } from "react";
import { deleteUser, getUsers } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SearchBar from "./-components/search-bar";
import { useDebounce } from "@/hooks/use-debounce";
import UserList, { type User } from "./-components/user-list";
import NoResultSearch from "./-components/no-result-search";
import { toast } from "sonner";
import EditUserModal from "./-components/edit-user-modal";
import useConfirm from "@/hooks/use-confirm";

export const Route = createFileRoute("/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);

  const [DeleteUserModal, confirmDialog] = useConfirm(
    "Delete User",
    "Are you sure you want to delete this user?"
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", debouncedSearchTerm],
    queryFn: () => getUsers(debouncedSearchTerm),
    placeholderData: (previousData) => previousData,
  });

  if (error) {
    toast.error(error.message);
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleEdit = (user: User) => {
    setEditingUser({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive,
      department: user.department,
    });
    setIsEditModalOpen(true);
  };

  const { mutate } = useMutation({
    mutationFn: async (userId: string) => {
      return await deleteUser(userId);
    },
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(message);
    },
  });

  const handleDelete = async (userId: string) => {
    const ok = await confirmDialog();

    if (!ok) return;

    mutate(userId);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <SearchBar
          onSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />
        {isLoading && (
          <div className="flex items-center justify-center h-screen max-h-72 py-20">
            <div className="animate-spin rounded-full size-6 border-b-2 border-blue-500"></div>
          </div>
        )}
        {data && data.data && (
          <UserList
            users={data.data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
        {data?.data?.length === 0 && searchTerm && (
          <NoResultSearch setSearchTerm={setSearchTerm} />
        )}
        <EditUserModal
          editingUser={editingUser}
          setIsEditModalOpen={setIsEditModalOpen}
          isEditModalOpen={isEditModalOpen}
        />
        <DeleteUserModal />
      </div>
    </div>
  );
}
