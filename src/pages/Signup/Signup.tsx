import React from "react";

import { SignupForm } from "./components/SignupForm";

const Signup: React.FC = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
