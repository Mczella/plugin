import React, { FC, useEffect, useState } from "react";
import { ShadowDom } from "./ShadowDom";
import "./rohlik.css";

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

/*
function Main(){
    render (
        <Header>
        {recepts.map(<Recept>...)}
    )
}


export funection Rohlik(): {
    <NewReceptButton/>
    <Main/>
}

*/

type Props = {
  label: string;
  icon: string;
  onClick: () => void;
};

export const Button: FC<Props> = ({ label, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
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
        src={icon}
        style={{ width: "20px", marginRight: "5px" }}
      />
      <span style={{ fontSize: "13px" }}>{label}</span>
    </button>
  );
};

function NavigationArea() {
  const [parentElement] = useState(() =>
    document.querySelector(".sectionsItem")
  );
  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <div>
        <Button
          label={"Vytvořit recept"}
          icon={"https://www.svgrepo.com/show/303501/red-star-1-logo.svg"}
          onClick={() => {
            console.log("Ahoj");
          }}
        />

        <Button
          label={"Objednat recept"}
          icon={"https://www.svgrepo.com/show/303501/red-star-1-logo.svg"}
          onClick={() => {
            console.log("čau");
          }}
        />
      </div>
    </ShadowDom>
  ) : null;
}

function MainArea() {
  const [parentElement] = useState(() =>
    document.querySelector('[data-gtm-section="hp-topBanner"]')
  );

  useEffect(() => {
    const bannerSpace = document.querySelector(
      '[data-gtm-section="hp-topBanner"]'
    );
    const banner3 = document.querySelector('[data-gtm-section="hp-banners"]');
    if (bannerSpace) {
      bannerSpace.innerHTML = "";
    }

    if (banner3) {
      console.log("banner3");

      banner3?.remove();
    }
  }, []);

  return parentElement ? (
    <ShadowDom parentElement={parentElement}>
      <h1>ahoj</h1>
    </ShadowDom>
  ) : null;
}

export function Rohlik(): React.ReactNode {
  return (
    <>
      <NavigationArea />
      <MainArea />
    </>
  );
}

export function Rohlik_(): React.ReactElement | null {
  const bannerSpace = document.querySelector(
    '[data-gtm-section="hp-topBanner"]'
  );
  const banner1 = document.querySelector(".topBannerBigger");
  const banner2 = document.querySelector(".topBannerSmallerWrapper");
  const banner3 = document.querySelector('[data-gtm-section="hp-banners"]');
  const handleClick = () => {
    if (banner1 && banner2) {
      banner1.remove();
      banner2.remove();
      banner3.remove();
    }
    if (bannerSpace) {
      bannerSpace.style.height = "auto";
      bannerSpace.innerHTML = "";

      const gridContainer = document.createElement("div");
      gridContainer.classList.add("gridContainer");

      items.forEach((item) => {
        const gridItem = document.createElement("div");
        gridItem.style.display = "flex";
        gridItem.style.flexDirection = "column";
        gridItem.style.alignItems = "center";

        const imageElement = document.createElement("img");
        imageElement.src = item.imageUrl;
        imageElement.style.width = "100%";

        const textContainer = document.createElement("div");
        textContainer.classList.add("textContainer");

        const textElement = document.createElement("span");
        textElement.textContent = item.text;

        const priceElement = document.createElement("span");
        priceElement.textContent = "100 Kč";
        priceElement.style.fontSize = "24px";
        priceElement.style.fontWeight = "bold";
        priceElement.style.lineHeight = "1.4";

        const portionPriceElement = document.createElement("span");
        portionPriceElement.textContent = "20,00 Kč/porce";
        portionPriceElement.style.fontSize = "12px";
        portionPriceElement.style.lineHeight = "1.4";

        const buttonElement = document.createElement("button");
        buttonElement.textContent = "Do košíku";
        buttonElement.classList.add("buttonElement");

        gridItem.appendChild(imageElement);
        gridItem.appendChild(textContainer);
        textContainer.appendChild(textElement);
        gridItem.appendChild(priceElement);
        gridItem.appendChild(portionPriceElement);
        gridItem.appendChild(buttonElement);
        gridContainer.appendChild(gridItem);
      });

      bannerSpace.appendChild(gridContainer);
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
