import { FC, Key } from "react";
import "./rohlik.css";

type Props = {
  items: {
    imageUrl: string | null | undefined;
    text: string;
  }[];
};

const Recipes: FC<Props> = ({ items }) => {
  return (
    <div className="gridContainer">
      {items.map(
        (
          item: {
            imageUrl: string | undefined | null;
            text: string;
          },
          index: Key
        ) => (
          <div key={index} className="gridItem">
            <img
              src={item.imageUrl}
              alt={`item-${index}`}
              style={{ width: "100%" }}
            />
            <div className="textContainer">
              <span>{item.text}</span>
            </div>
            <button className="buttonElement">Do košíku</button>
          </div>
        )
      )}
    </div>
  );
};

export default Recipes;
