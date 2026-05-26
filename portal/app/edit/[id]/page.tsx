import { notFound } from "next/navigation";
import { getReminder } from "@/app/utils/reminders";
import EditForm from "@/app/components/EditForm";
import Link from "next/link";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reminder = await getReminder(id);

  if (!reminder) notFound();

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <EditForm reminder={reminder} />
      <Link href="/">
        <button className="btn btn-soft mt-4">Cancel</button>
      </Link>
    </div>
  );
}
