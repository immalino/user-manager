import type { AnyFieldApi } from "@tanstack/react-form";

const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="text-[0.8rem] font-medium text-destructive">
          {field.state.meta.errors
            .map((error) => {
              if (typeof error === "string") return error;
              return error.message;
            })
            .join(", ")}
        </span>
      ) : null}
    </>
  );
};

export default FieldInfo;
