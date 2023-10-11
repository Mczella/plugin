import {useQuery} from "@tanstack/react-query";
import {fetchData, fetchPrices, fetchProducts, fetchStock} from "./Fetch.ts";
import {Box, Flex, IconButton, Image, Input, Text} from "@chakra-ui/react";
import {useState} from "react";
import {AddIcon} from "@chakra-ui/icons";

const fetchAll = async (query: string) => {
    const productIds = await fetchData(query);

    const [products, prices, stock] = await Promise.all([
        fetchProducts(productIds),
        fetchPrices(productIds),
        fetchStock(productIds),
    ])

    return Object.fromEntries(productIds.map((id: number, index: number) => [
        id,
        {
            name: products[index].name,
            unit: products[index].unit,
            textualAmount: products[index].textualAmount,
            badges: products[index].badges,
            image: products[index].images[0],
            price: prices[index].price,
            pricePerUnit: prices[index].pricePerUnit,
            sales: prices[index].sales,
            packageInfo: stock[index].packageInfo,
            inStock: stock[index].inStock,
        },
    ]))
};

const CreateRecipe = () => {
    // change to RecipeInput
    const [searchQuery, setSearchQuery] = useState("")
    const {data, isError} = useQuery(['data', searchQuery], () => fetchAll(searchQuery));
    console.log(data)

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Box p={"20px"}>
            <Input width={"600px"}
                   height={"40px"}
                   rounded={"xl"}
                   fontSize={"14px"}
                   color={"rgb(132, 140, 145)"}
                   outline={"none"}
                   border={"1px solid rgb(132, 140, 145)"}
                   placeholder={"Vyhledejte suroviny, které chcete přidat do receptu."}
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}/>
            {data && Object.keys(data).length > 0 ?
                <Box width={"600px"} border={"1px solid rgb(218, 222, 224)"} rounded={"lg"} boxShadow={"md"}>
                    {Object.entries(data).map(([id, product]) => (
                            <Box key={id} width={"600px"}
                                 borderBottom={
                                     Object.keys(data).indexOf(id) === Object.keys(data).length - 1
                                         ? "none"
                                         : "1px solid rgb(218, 222, 224)"
                                 }
                                 p={"10px"}
                                 _hover={{bg: "gray.100"}}>
                                <Flex flexDir={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Flex flexDir={"row"} alignItems={"center"}>
                                        <Box width={"64px"} height={"64px"} display={"flex"} px={"8px"} py={"8px"}>
                                            <Image src={product.image} alt="panda" objectFit={"contain"}
                                                   alignItems={"center"}
                                                   maxH={"-webkit-fill-available"}/>
                                        </Box>
                                        <Flex flexDir={"column"} alignItems={"flex-start"} width={"450px"}>
                                            <Text fontSize={"13px"} fontWeight={400} mr={"8px"}
                                                  lineHeight={"22px"}>{product.name}</Text>
                                            <Text fontSize={"14px"} fontWeight={600}
                                                  lineHeight={"22px"}>{product.price.amount} {product.price.currency}</Text>
                                        </Flex>
                                    </Flex>
                                    <Box>
                                        <IconButton aria-label={"vybrat"} height={"40px"} width={"40px"} mr={"12px"}
                                                    _hover={{border: "1px solid rgb(156, 164, 169)"}}
                                                    border={"1px solid rgb(218, 222, 224)"} bg={"white"} rounded={"2xl"}
                                                    icon={<AddIcon color={"black"} boxSize={6}/>}/>
                                    </Box>
                                </Flex>
                            </Box>
                        )
                    )}
                </Box>
                : null}
        </Box>


    )
}

export default CreateRecipe;