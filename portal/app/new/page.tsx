import NewForm from "../components/NewForm";
import Link from "next/link";

export default function New() {
  return (
    <>
    <div className="flex flex-col h-screen justify-center items-center">
      <NewForm />
      <Link href="/">
        <button className="btn btn-soft mt-4">Back home</button>
      </Link>
    </div>
    </>
  );
}
