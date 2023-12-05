import { useQuery } from "@tanstack/react-query";
import { fetchDelivered } from "../api/api.ts";

type HookResponse =
  | undefined
  | {
      daysDifference: number;
      parsedOrderDate: Date;
      matchingItem: {
        id: string;
        amount: number;
      };
    };

export const useFindProductInDelivered = (
  productIds: string[],
): HookResponse => {
  const { data, isError } = useQuery(["data"], () => fetchDelivered());

  if (isError) {
    throw new Error("Error fetching data.");
  }

  console.log("delivered", data);
  if (!data) {
    return;
  }

  let matchingItem: { id: string; amount: number } | undefined;
  const foundPurchase = data.find((purchase) => {
    return productIds.find((productId) => {
      matchingItem = purchase.items.find(
        (item: { id: string; amount: number }) => item.id == productId,
      );
      return matchingItem !== undefined;
    });
  });

  if (!matchingItem) {
    return;
  }

  function parseDateString(dateString: string) {
    const isoString = dateString.replace(/(\d{2})$/, ":$1");
    return new Date(isoString);
  }

  if (foundPurchase && foundPurchase.state === "DELIVERED") {
    const orderDate = foundPurchase.orderTime;
    const parsedOrderDate = parseDateString(orderDate);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - parsedOrderDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return { daysDifference, parsedOrderDate, matchingItem };
  }
  return undefined;
};
