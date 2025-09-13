import { seed } from "@/db/seed/seed";

export default function SeedPage() {
  seed();

  return <div>SeedPage</div>;
}
