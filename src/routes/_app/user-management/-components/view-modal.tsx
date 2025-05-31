import Avatar from "@/components/core/avatar";
import Modal, { ModalAction } from "@/components/elements/modal";
import { useNavigate, useSearch } from "@tanstack/react-router";

interface View {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ViewModal = ({ open, setOpen }: View) => {
  const navigate = useNavigate();
  const { name, email, phone, location, avatar } = useSearch({
    from: "/_app/user-management/",
  });

  const confirmActions: ModalAction[] = [
    {
      label: "Done",
      onClick: () => {
        navigate({ to: "." });
        setOpen(false);
      },
      variant: "secondary",
    },
  ];
  return (
    <Modal
      isOpen={open}
      onClose={() => {
        navigate({ to: "." });
        setOpen(false);
      }}
      title="User Details"
      description="User information and description"
      actions={confirmActions}
      size="2xl"
      closeOnBackdropClick={false}
      className="w-full flex justify-center"
    >
      <div className="font-inter w-full">
        <div className="flex items-center gap-4  mb-5">
          <Avatar src={avatar} alt={name ?? "NA"} size="lg" />
          <div className="">
            <h4 className="font-medium text-xl text-[#06275A] ">{name}</h4>
            <p className="font-light text-base text-[#06275A] ">{email} </p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-5 ">
          <div className="flex-1">
            <p className="text-gray-400 text-sm mb-1">Phone:</p>
            <h4 className="text-lg text-[#06275A]">{phone}</h4>
          </div>
          <div className="flex-1">
            <p className="text-gray-400 text-sm mb-1">Locatioin:</p>
            <h4 className="text-lg text-[#06275A]">{location}</h4>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;
