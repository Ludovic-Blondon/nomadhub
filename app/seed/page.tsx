import { seed } from "@/db/seed/seed";

export default function SeedPage() {
  // Empêcher l'accès en production
  if (process.env.NODE_ENV === "production") {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Accès refusé</h1>
        <p className="mt-4 text-gray-600">
          Cette page n'est pas disponible en production pour des raisons de
          sécurité.
        </p>
      </div>
    );
  }

  seed();

  return <div>SeedPage</div>;
}
