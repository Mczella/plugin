import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { AddIcon, MinusIcon, SmallCloseIcon } from "@chakra-ui/icons";

const CheckRecipes = () => {
  useEffect(() => {
    const cartWrapper = document.querySelector(
      ".sc-e3fcc8f0-0.jIOdhV.cartWrapper",
    );
    const chat = document.querySelector(
      ".sc-1cb2d7a8-0.biNOGO.h-flexCenter.chat-placeholder",
    );

    if (cartWrapper) {
      cartWrapper.remove();
    }

    if (chat) {
      chat.remove();
    }
  }, []);

  return (
    <>
      <Flex
        flexDir={"column"}
        bg={"rgb(242, 244, 244)"}
        minH={"100vh"}
        p={"40px 11% 72px"}
        mb={"64px"}
      >
        <Text
          textAlign={"center"}
          mt={"48px"}
          fontSize={"32px"}
          fontWeight={"400"}
          lineHeight={"43px"}
          color={"rgb(28, 37, 41)"}
        >
          Přehled objednávky receptů
        </Text>
        <Text
          mt={"48px"}
          mb={"8px"}
          fontSize={"24px"}
          lineHeight={"33px"}
          fontWeight={"400"}
          color={"rgb(28, 37, 41)"}
        >
          Svíčková
        </Text>
        <Flex
          p={"4px 32px 4px 48px"}
          alignItems={"center"}
          justifyContent={"space-between"}
          minH={"80px"}
          bg={"white"}
          mb={"1px"}
        >
          <Flex flexDir={"row"} w={"720px"} alignItems={"center"}>
            <Image
              width={"64px"}
              src={
                "https://cdn.myshoptet.com/usr/www.dobrereznictvi.cz/user/shop/big/240-1_falesna-hovezi-svickova.png?621eb52c"
              }
            />
            <Text
              color={"rgb(28, 37, 41)"}
              fontSize={" 14px"}
              lineHeight={"1.47"}
              pl={"48px"}
            >
              Hovězí svíčková
            </Text>
            <Text pl={"4"}>300 g</Text>
          </Flex>
          <Flex flexDir={"row"} alignItems={"center"}>
            <Flex flexDir={"row"} alignItems={"center"} gap={"15px"}>
              <Box
                h={"32px"}
                w={"32px"}
                border={"1px solid rgba(0, 0, 0, 0.15)"}
                rounded={"md"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                _hover={{ border: "1px solid rgb(156, 164, 169)" }}
              >
                <MinusIcon />
              </Box>
              <Text fontWeight={"bold"}>1</Text>
              <Box
                h={"32px"}
                w={"32px"}
                border={"1px solid rgba(0, 0, 0, 0.15)"}
                rounded={"md"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                _hover={{ border: "1px solid rgb(156, 164, 169)" }}
              >
                <AddIcon />
              </Box>
            </Flex>
            <Text
              textAlign={"right"}
              color={"rgb(28, 37, 41)"}
              fontSize={"15px"}
              fontWeight={"bold"}
              minW={"210px"}
            >
              195 Kč
            </Text>
            <SmallCloseIcon
              ml={"40px"}
              color={"rgb(218, 222, 224)"}
              _hover={{ color: "rgb(87, 130, 4)" }}
            />
          </Flex>
        </Flex>
        <Flex
          p={"4px 32px 4px 48px"}
          alignItems={"center"}
          justifyContent={"space-between"}
          minH={"80px"}
          bg={"white"}
          mb={"1px"}
        >
          <Flex flexDir={"row"} w={"720px"} alignItems={"center"}>
            <Image
              width={"64px"}
              src={
                "https://cdn.metro-group.com/cz/oo2/cz_pim_397894001001_00?w=440&h=440&format=jpg&quality=90"
              }
            />
            <Text
              color={"rgb(28, 37, 41)"}
              fontSize={" 14px"}
              lineHeight={"1.47"}
              pl={"48px"}
            >
              Houskový knedlík
            </Text>
            <Text pl={"4"}>300 g</Text>
          </Flex>
          <Flex flexDir={"row"} alignItems={"center"}>
            <Flex flexDir={"row"} alignItems={"center"} gap={"15px"}>
              <Box
                h={"32px"}
                w={"32px"}
                border={"1px solid rgba(0, 0, 0, 0.15)"}
                rounded={"md"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                _hover={{ border: "1px solid rgb(156, 164, 169)" }}
              >
                <MinusIcon />
              </Box>
              <Text fontWeight={"bold"}>1</Text>
              <Box
                h={"32px"}
                w={"32px"}
                border={"1px solid rgba(0, 0, 0, 0.15)"}
                rounded={"md"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                _hover={{ border: "1px solid rgb(156, 164, 169)" }}
              >
                <AddIcon />
              </Box>
            </Flex>
            <Text
              textAlign={"right"}
              color={"rgb(28, 37, 41)"}
              fontSize={"15px"}
              fontWeight={"bold"}
              minW={"210px"}
            >
              35 Kč
            </Text>
            <SmallCloseIcon
              ml={"40px"}
              color={"rgb(218, 222, 224)"}
              _hover={{ color: "rgb(87, 130, 4)" }}
            />
          </Flex>
        </Flex>
      </Flex>
      <Box width={"100%"} position={"fixed"} bottom={0} bg={"black"} h={"80px"}>
        <Flex
          p={"12px"}
          zIndex={305}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text
            color={"white"}
            fontSize={"14px"}
            fontWeight={"600"}
            pr={"32px"}
          >
            350 Kč za ingredience k receptům
          </Text>
          <Link
            style={{ all: "unset" }}
            href={`https://www.rohlik.cz/objednavka/prehled-kosiku`}
          >
            <Button
              h={"40px"}
              bg={"rgb(109, 163, 5)"}
              color={"white"}
              fontSize={"14px"}
              fontWeight={"600"}
              lineHeight={"1"}
              mx={"16px"}
              my={"12px"}
              rounded={"xl"}
              _hover={{ bg: "rgb(87, 130, 4)" }}
              // onClick={nahazet veci do kosiku}
            >
              Pokračovat k objednávce
            </Button>
          </Link>
        </Flex>
      </Box>
    </>
  );
};

export default CheckRecipes;
