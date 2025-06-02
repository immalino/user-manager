import FieldInfo from "@/components/field-info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/lib/api";
import type { User as UserType } from "@/routes/users/-components/user-list";
import { createUserSchema } from "@/schema/user.schema";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BriefcaseBusiness, Mail, Phone, Save, User } from "lucide-react";
import { toast } from "sonner";

const AddUserForm = () => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: async (updatedUser: {
      department: string;
      email: string;
      name: string;
      phone: string;
    }) => {
      return await createUser(updatedUser);
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      form.reset();
    },
  });

  if (error) {
    toast.error(error.message);
  }

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      department: "",
    } as Pick<UserType, "name" | "email" | "phone" | "department">,
    validators: {
      onChange: createUserSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
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
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit]) => (
                <Button
                  disabled={!canSubmit}
                  type="submit"
                  className="flex-1 mt-4 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Create User
                </Button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddUserForm;
