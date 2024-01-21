import { Badge, Box, Grid, Image, Text } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useMyStore } from "../store/store.tsx";
import { RohlikProduct } from "../types.ts";

const ChosenProducts = () => {
  const { selectedProducts, editSelectedProducts, deleteSelectedProduct } =
    useMyStore();
  console.log("selected", selectedProducts);

  const handleSetPreffered = (product: RohlikProduct) => {
    const updatedProducts = selectedProducts.map(
      (existingProduct: RohlikProduct) => {
        if (existingProduct.id === product.id) {
          return { ...existingProduct, preferred: true };
        } else {
          return { ...existingProduct, preferred: false };
        }
      },
    );
    editSelectedProducts(updatedProducts);
  };

  const handleUnsetPreffered = (product: RohlikProduct) => {
    const updatedProducts = selectedProducts.map(
      (existingProduct: RohlikProduct) => {
        if (existingProduct.id === product.id) {
          return { ...existingProduct, preferred: false };
        }
        return existingProduct;
      },
    );
    editSelectedProducts(updatedProducts);
  };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={8}>
      {selectedProducts.map((product) => (
        <Box key={product.id} p={4} justifyItems={"center"} display={"grid"}>
          <Box
            w={"150px"}
            h={"150px"}
            position={"relative"}
            pt={"10px"}
            mt={"20px"}
            display={"grid"}
          >
            <Box position={"absolute"} top={0}>
              {product.preferred ? (
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleUnsetPreffered(product)}
                >
                  <g id="SVGRepo_bgCarrier" />

                  <g id="SVGRepo_tracerCarrier" />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="m12 17.328-5.403 3.286a.75.75 0 0 1-1.12-.813l1.456-6.155-4.796-4.123a.75.75 0 0 1 .428-1.316l6.303-.517 2.44-5.835a.75.75 0 0 1 1.384 0l2.44 5.835 6.303.517a.75.75 0 0 1 .427 1.316l-4.795 4.123 1.456 6.155a.75.75 0 0 1-1.12.813L12 17.328z"
                      fill="rgba(209, 17, 0, 0.9)"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleSetPreffered(product)}
                >
                  <g id="SVGRepo_bgCarrier" />

                  <g id="SVGRepo_tracerCarrier" />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                      stroke="rgba(209, 17, 0, 0.9)"
                    />
                  </g>
                </svg>
              )}
            </Box>
            <SmallCloseIcon
              position={"absolute"}
              top={0}
              right={0}
              color={"rgb(218, 222, 224)"}
              _hover={{ color: "rgb(87, 130, 4)" }}
              onClick={() => deleteSelectedProduct(product)}
            />
            <Image
              justifySelf={"center"}
              alignSelf={"center"}
              src={product.image}
              objectFit={"contain"}
              maxH={"100px"}
              maxW={"130px"}
              mb={"20px"}
            />
            <Badge
              justifySelf={"center"}
              position={"absolute"}
              bottom={0}
              bg={"rgba(0, 0, 0, 0.5)"}
              color={"white"}
              fontSize={"12px"}
              fontWeight={600}
              py={"2px"}
              px={"7px"}
              rounded={"2xl"}
            >
              {product.unit}
            </Badge>
          </Box>
          <Text
            cursor={"pointer"}
            pt={"20px"}
            textAlign={"center"}
            h={"60px"}
            casing={"capitalize"}
            display={"-webkit-box"}
            fontSize={"13px"}
            lineHeight={1.4}
            noOfLines={2}
            maxW={"165px"}
            textOverflow={"ellipsis"}
            sx={{ WebkitLineClamp: "2" }}
          >
            {product.name}
          </Text>
          <Text fontSize="16px" lineHeight="1.4" fontWeight={"bold"}>
            {Number(product.price?.amount.toFixed(1))} Kč
          </Text>
        </Box>
      ))}
    </Grid>
  );
};

export default ChosenProducts;
