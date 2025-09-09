import { Metadata } from "next";

import { SignUpForm } from "./_components/sign-up-form";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Créez votre compte NomadHub",
};

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
