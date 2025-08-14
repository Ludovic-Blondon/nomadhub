import Breadcrumb from "@/app/ui/breadcrumb";

export default async function Bargain({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <Breadcrumb id={id} />
    </div>
  );
}
