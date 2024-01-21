import { Dispatch, FC, SetStateAction, useEffect } from "react";
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const modifyModal = (iframe: HTMLIFrameElement) => {
    const productDetailElement: HTMLElement | undefined | null =
      iframe.contentDocument?.getElementById("productDetail");

    const productDetailParent = productDetailElement?.parentNode as HTMLElement;

    iframe.contentDocument?.querySelector("footer")?.remove();
    iframe.contentDocument
      ?.querySelector('[data-test="notification-wrapper"]')
      ?.remove();
    iframe.contentDocument?.querySelector('[data-test="topPanel"]')?.remove();
    iframe.contentDocument?.querySelectorAll(".Toastify");

    iframe.contentDocument?.getElementById("header")?.remove();
    productDetailParent.style.padding = "0px";
    if (productDetailElement) {
      productDetailElement.style.border = "none";
      productDetailElement.style.boxShadow = "none";
    }
  };

  console.log(modalRef);

  return parentElement && isModalOpen && isOpen ? (
    <NormalDom parentElement={parentElement}>
      <div className="modal-container">
        <div className="modal-background"></div>
        <div className="modal-content" ref={modalRef}>
          <iframe
            className="my-iframe"
            src={`https://www.rohlik.cz/${rohlikId}`}
            height="800px"
            width="100%"
            style={{
              borderRadius: "8px",
              visibility: "hidden",
              border: "none",
            }}
            onLoad={(e) => {
              modifyModal(e.target as HTMLIFrameElement);
              (e.target as HTMLIFrameElement).style.visibility = "visible";
            }}
          />
        </div>
      </div>
    </NormalDom>
  ) : null;
};
