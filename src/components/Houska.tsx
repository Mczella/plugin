import React, { useState } from "react";
import { ShadowDom } from "./ShadowDom";
import "./rohlik.css";
import ReactDOM from "react-dom";
import Recipes from "./Recipes.tsx";

const items = [
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Smažený sýr",
  },
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Bramborová polévka",
  },
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Svíčková na smetaně",
  },
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Guláš",
  },
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Knedlíky s uzeným",
  },
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Rajská omáčka s těstovinami",
  },
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Česnečka",
  },
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Bramboráky",
  },
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Sekaná s bramborovou kaší",
  },
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Vepřo knedlo zelo",
  },
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Hovězí guláš",
  },
  {
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/009/262/531/original/cute-panda-welcomes-with-a-paw-the-panda-is-waving-its-paw-illustration-isolated-on-white-background-vector.jpg",
    text: "Zelňačka",
  },
];

export function Houska(): React.ReactElement | null {
  const [parentElement] = useState(() =>
    document.querySelector(".sectionsItem")
  );

  const bannerSpace = document.querySelector(
    '[data-gtm-section="hp-topBanner"]'
  ) as HTMLElement;
  const banner1 = document.querySelector(".topBannerBigger");
  const banner2 = document.querySelector(".topBannerSmallerWrapper");
  const banner3 = document.querySelector('[data-gtm-section="hp-banners"]');
  const handleClick = () => {
    if (banner1 && banner2) {
      banner1.remove();
      banner2.remove();
      banner3?.remove();
    }
    if (bannerSpace) {
      bannerSpace.style.height = "auto";
      bannerSpace.innerHTML = "";

      ReactDOM.render(<Recipes items={items} />, bannerSpace);
    }
  };

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <div
        style={{ display: "flex", flexDirection: "row", paddingInline: "8px" }}
      >
        <button
          onClick={handleClick}
          style={{
            background: "none",
            border: "none",
            paddingInline: "10px",
            height: "35px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <img
            alt={"icon"}
            src="https://www.svgrepo.com/show/303501/red-star-1-logo.svg"
            style={{ width: "20px", marginRight: "5px" }}
          />
          <span style={{ fontSize: "13px" }}>Vytvořit recept</span>
        </button>
      </div>
    </ShadowDom>
  ) : null;
}
