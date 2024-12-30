import { Modal } from "./modal";

interface IModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onOk: () => void;
  cancelText?: string;
  okText?: string;
}

export function ModalAlert({
  isOpen,
  onClose,
  title,
  description,
  onOk,
  cancelText = "Cancel",
  okText = "Accept",
}: IModalDeleteProps) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p>{description}</p>
      <div className='flex justify-end mt-4'>
        <button
          onClick={onClose}
          className='bg-gray-300 text-black rounded px-4 py-2 mr-2'
        >
          {cancelText}
        </button>
        <button
          onClick={onOk}
          className='bg-red-500 text-white rounded px-4 py-2'
        >
          {okText}
        </button>
      </div>
    </Modal>
  );
}
