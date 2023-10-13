import {useQuery} from "@tanstack/react-query";
import {fetchAll} from "./Fetch.ts";
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Heading, IconButton} from "@chakra-ui/react";
import {ChevronRightIcon, HamburgerIcon} from "@chakra-ui/icons";
import {useState} from "react";

const CreateRecipe = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const {data, isError} = useQuery(['data', searchQuery], () => fetchAll(searchQuery));

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <>
            <Box pt={"16px"} pb={"12px"} px={"calc(3% + 16px)"} ml={0}>
                <Breadcrumb padding={"2px 21px 16px 0px"} spacing='8px' color={"rgb(57,57,59)"}
                            separator={<ChevronRightIcon color='gray.500'/>}>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize={"12px"} href='www.rohlik.cz'>Rohlik.cz</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize={"12px"} href='www.rohlik.cz/#/recepty'>Recepty</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink fontSize={"12px"} href='www.rohlik.cz/#/pridat-recept'>Nový
                            recept</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex flexDir={"row"} justifyContent={"space-between"} alignItems={"center"} mb={"32px"}>
                    <Heading mr={"12px"} fontSize={"36px"} fontWeight={"900"} lineHeight={"48px"}>
                        Přidejte nový recept
                    </Heading>
                    <Flex flexDir={"row"}>
                        <Button mr={"8px"} height={"40px"} bg={"rgb(109, 163, 5)"} fontSize={"14px"} fontWeight={"600"}
                                rounded={"lg"} boxShadow={"md"} color={"white"} _hover={{bg: "rgb(87, 130, 4)"}}>
                            Uložit recept
                        </Button>
                        <IconButton aria-label='Select' boxSize={"40px"}
                                    _hover={{border: "1px solid rgb(156, 164, 169)"}}
                                    border={"1px solid rgb(218, 222, 224)"} bg={"white"}
                                    rounded={"2xl"} icon={<HamburgerIcon boxSize={"18px"}/>}/>
                    </Flex>
                </Flex>
            </Box>
            <CreateRecipe searchQuery={searchQuery} setSearchQuery={setSearchQuery} data={data}/>
        </>
    )
}

export default CreateRecipe;