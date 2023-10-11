import {useQuery} from "@tanstack/react-query";
import {fetchData, fetchPrices, fetchProducts, fetchStock} from "./Fetch.ts";
import {Box, Input, Text} from "@chakra-ui/react";
import {useState} from "react";

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
    const [searchQuery, setSearchQuery] = useState("")
    const {data, isLoading, isError} = useQuery(['data', searchQuery], () => fetchAll(searchQuery));
    console.log(data)

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Box p={"20px"}>
            <Input width={"400px"}
                   placeholder={"Vyhledejte suroviny, které chcete přidat do receptu."}
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}/>
            {isLoading ?
                <Text>...</Text>
                :
                Object.entries(data).map(([id, product]) => (
                    <Text key={id}>{product.name}</Text>
                ))}
        </Box>


    )
}

export default CreateRecipe;