import AdminForm from "@/app/components/organism/AdminForm/AdminForm";
import { Suspense } from "react";

const Admin = () => {
  return (
    <Suspense>
      <AdminForm />
    </Suspense>
  );
};

export default Admin;
