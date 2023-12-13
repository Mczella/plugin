import { Dispatch, FC, SetStateAction } from "react";
import { useParentElement } from "./hooks/useParentElement.ts";
import { useOutsideClick } from "./hooks/useOutsideClick.ts";
import "./rohlikModal.css";
import { NormalDom } from "./NormalDom.tsx";

type Props = {
  isModalOpen: string | null;
  setIsModalOpen: Dispatch<SetStateAction<string | null>>;
  rohlikId: string;
  isOpen: boolean;
};

export const RohlikModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  rohlikId,
  isOpen,
}) => {
  const parentElement = useParentElement(
    document.querySelector<HTMLElement>("#pageFullWidth"),
  );
  const modalRef = useOutsideClick(() => {
    setIsModalOpen(null);
  });

  return parentElement && isModalOpen && isOpen ? (
    <NormalDom parentElement={parentElement}>
      <div className="modal-container">
        <div className="modal-background"></div>
        <div className="modal-content" ref={modalRef}>
          <div
            style={{
              overflow: "hidden",
              marginTop: "-130px",
              marginLeft: "-18px",
              marginRight: "-18px",
            }}
          >
            <iframe
              className="my-iframe"
              src={`https://www.rohlik.cz/${rohlikId}`}
              height="800px"
              width="100%"
            />
          </div>
        </div>
      </div>
    </NormalDom>
  ) : null;
};
