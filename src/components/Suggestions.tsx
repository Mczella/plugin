import { FC } from "react";
import { Box, Button, Grid, Image, Text } from "@chakra-ui/react";

type Props = {
  products: Product[];
};

type Product = {
  id: string;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
  unit: string;
  textualAmount: string;
  badges: string;
  image: string;
  pricePerUnit: {
    amount: number;
    currency: string;
  };
  sales: string;
  packageInfo: string;
  inStock: string;
};

const Suggestions: FC<Props> = ({ products }) => {
  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={4}>
      {products.map((product) => (
        <Box key={product.id} p={4} justifyItems={"center"} display={"grid"}>
          <Image
            src={product.image}
            objectFit={"contain"}
            height={"120px"}
            mb={"20px"}
          />
          <Text>{product.name}</Text>
          <Text>
            {product.price.amount} {product.price.currency}
          </Text>
          <Button
            mt="10px"
            bg="white"
            color="black"
            border="1px solid rgba(0, 0, 0, 0.15)"
            height="32px"
            display="flex"
            alignItems="center"
            _hover={{ bg: "rgb(109, 163, 5)", color: "white" }}
          >
            Označit za preferovanou
          </Button>
        </Box>
      ))}
    </Grid>
  );
};

export default Suggestions;
