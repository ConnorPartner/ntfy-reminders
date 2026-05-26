"use client";
import { useRef } from "react";
import { deleteReminder } from "../utils/reminders";

export default function DeleteButton({ id, onDeleted }: { id: string | undefined; onDeleted?: () => void }) {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button className="btn btn-soft btn-error" onClick={() => modalRef.current?.showModal()}>
        Delete
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">This action cannot be undone.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => modalRef.current?.close()}>Cancel</button>
            <button className="btn btn-error" onClick={async () => {
              if (id) {
                await deleteReminder(id);
                modalRef.current?.close();
                onDeleted?.();
              }
            }}>Delete</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
