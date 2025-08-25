import { Metadata } from "next";

import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre compte NomadHub",
};

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
