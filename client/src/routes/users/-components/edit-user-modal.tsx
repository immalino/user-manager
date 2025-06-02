import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateUser } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { updateUserSchema } from "@/schema/user.schema";
import FieldInfo from "@/components/field-info";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { BriefcaseBusiness, Mail, Phone, Save, User, X } from "lucide-react";
import type { User as UserType } from "./user-list";

const EditUserModal = ({
  editingUser,
  isEditModalOpen,
  setIsEditModalOpen,
}: {
  editingUser: Partial<UserType> | null;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (status: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: async (updatedUser: {
      id: string;
      department?: string;
      email?: string;
      name?: string;
      phone?: string;
      isActive?: boolean;
    }) => {
      return await updateUser(updatedUser);
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsEditModalOpen(false);
    },
  });

  if (error) {
    toast.error(error.message);
  }

  const form = useForm({
    defaultValues: {
      name: editingUser?.name || "",
      email: editingUser?.email || "",
      phone: editingUser?.phone || "",
      isActive: editingUser?.isActive || false,
      department: editingUser?.department || "",
    } as Partial<UserType>,
    validators: {
      onChange: updateUserSchema,
    },
    onSubmit: async ({ value }) => {
      mutate({
        id: editingUser?.id || "",
        ...value,
      });
    },
  });

  useEffect(() => {
    if (!isEditModalOpen) {
      form.reset();
    }
  }, [isEditModalOpen]);

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="-mb-2">
          <DialogTitle className="text-xl text-blue-600 font-semibold">
            Edit User
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {editingUser && (
            <div className="grid gap-4 py-4">
              <form.Field
                name="name"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter user name"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="email"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter email address"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="phone"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="department"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Department
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BriefcaseBusiness className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter department"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="isActive"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </Label>
                    <Select
                      value={field.state.value ? "active" : "inactive"}
                      onValueChange={(value) => {
                        field.handleChange(value === "active");
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldInfo field={field} />
                  </div>
                )}
              />
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              <Save className="w-4 h-4 mr-1" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
