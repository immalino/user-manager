import { createFileRoute } from "@tanstack/react-router";
import Header from "./-components/header";
import { useEffect, useState } from "react";
import { getUsers } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./-components/search-bar";
import { useDebounce } from "@/hooks/use-debounce";
import UserList from "./-components/user-list";

export const Route = createFileRoute("/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos", debouncedSearchTerm],
    queryFn: () => getUsers(debouncedSearchTerm),
    placeholderData: (previousData) => previousData,
  });

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <SearchBar onSearchChange={handleSearchChange} />
        {data && data.data && <UserList users={data.data} />}
      </div>
    </div>
  );
}
