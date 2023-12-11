import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useParentElement = (element: any) => {
  const navigate = useNavigate();

  const [parentElement, setParentElement] = useState(() => element);

  useEffect(() => {
    const body = document.querySelector("body");

    const observer = new MutationObserver(() => {
      if (!parentElement || !document.body.contains(parentElement)) {
        setParentElement(element);
      }
    });

    if (body) {
      observer.observe(body, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [element, navigate, parentElement]);

  return parentElement;
};
