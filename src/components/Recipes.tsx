import {Button, Grid, GridItem, Image, Text} from "@chakra-ui/react";
import {items} from "./Rohlik.tsx";

const Recipes = () => {

    return (
        <Grid templateColumns="repeat(7, 1fr)" gap="10px" m="20px">
            {items.map((item, index) => (
                <GridItem key={index} display="flex" flexDir="column" alignItems="center">
                    <Image src={item.imageUrl} alt="panda" width="100%"/>
                    <Text height="3em" isTruncated>{item.text}</Text>

                    <Text fontSize="24px" fontWeight="bold" lineHeight="1.4">
                        100 Kč
                    </Text>
                    <Text fontSize="12px" lineHeight={1.4}>
                        20,00 Kč/porce
                    </Text>
                    <Button
                        mt="10px"
                        bg="white"
                        color="black"
                        border="1px solid rgba(0, 0, 0, 0.15)"
                        height="32px"
                        display="flex"
                        alignItems="center"
                        _hover={{bg: "green"}}
                    >
                        Do košíku
                    </Button>
                </GridItem>
            ))}
        </Grid>
    );
};

export default Recipes;

/*
<article className="sc-70f4f501-0 kOYdXa productCard__wrapper" data-gtm-item="product-card"
         data-gtm-product-favourite="true" data-gtm-product-sale="false" data-gtm-product-sold-out="false"
         data-product-card-sold-out-purchase="false" data-productid="1330761" data-status="1330761"
         data-test="product-0">
    <div className="sc-70f4f501-1 dcYkdc">
        <div aria-label="Přidat k oblíbeným Arisi Bazalkové pesto alla Genovese" data-gtm-button="toggle-favorite"
             className="sc-b902a16e-0 dZQyfe favorite u-cursorPointer" data-status="true" data-test="favoriteToggle"
             id="favoriteToggle" role="button" tabIndex="0"><img alt="" className="sc-b902a16e-1 hXyfWf icon-svg"
                                                                 src="/img/icons/icon-favorite-active.svg?v3"
                                                                 height="24" width="24"/></div>
        <div className="sc-3f9cf9b8-0 dApWoy u-position-relative" data-test="add-from-detail">
            <button className="sc-3f9cf9b8-4 fxVEyd h-buttonReset" data-test="lists-product-detail-button"
                    data-toggle="dropdown" title="Přidat do nákupního seznamu">
                <svg data-test="IconListPlus" height="24" viewBox="0 0 24 24" width="24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd"
                          d="M6 8C6 7.44772 6.44772 7 7 7H17C17.5523 7 18 7.44772 18 8C18 8.55228 17.5523 9 17 9H7C6.44772 9 6 8.55228 6 8ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM18 14C18.5523 14 19 14.4477 19 15V17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H19V21C19 21.5523 18.5523 22 18 22C17.4477 22 17 21.5523 17 21V19H15C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17H17V15C17 14.4477 17.4477 14 18 14ZM6 16C6 15.4477 6.44772 15 7 15H12C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17H7C6.44772 17 6 16.5523 6 16Z"
                          fill="#848C91" fill-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    </div>
    <a className="imgWrapper u-cursorPointer" to="/1330761-arisi-bazalkove-pesto-alla-genovese"
       href="/1330761-arisi-bazalkove-pesto-alla-genovese" tabIndex="0">
        <div className="sc-f69d136-0 fGIjPi productCard__imgWrap h-flexCenter u-cursorPointer" id="productItemHeader">
            <div className="productBadges"></div>
            <div className="productCard__imageWrapper"><img alt="" className="productCard__img redirect_link"
                                                            loading="lazy"
                                                            src="https://www.rohlik.cz/cdn-cgi/image/f=auto,w=300,h=300/https://cdn.rohlik.cz/images/grocery/products/1330761/1330761-1564570102.jpg"/>
            </div>
            <div className="quantity">130 g</div>
        </div>
        <h4 className="productCard__title redirect_link" title="Arisi Bazalkové pesto alla Genovese">Arisi Bazalkové
            pesto alla Genovese</h4></a>
    <div className="cardInfo">
        <div className="sc-cfcdcecb-0 gVnZPG">
            <div className="sc-4295768e-0 eDNySu"></div>
            <div className="u-displayFlex u-flexColumn u-typographyCenter"><p
                className="sc-a4f765f3-0 dtMtGC h-flexCenter"></p></div>
            <div className="sc-4295768e-0 eDNySu"><span className="biggerPrice cardPrice">&nbsp;<span
                className="sc-5e043129-0 bstnxg"><span className="offscreen"
                                                       data-test="current-price">78,90&nbsp;Kč</span><span
                aria-hidden="true" className="wrap"><span className="price">78</span><sup
                className="fraction">90</sup><span className="price" data-test="currency">&nbsp;Kč</span></span></span></span>
            </div>
            <div className="pricePerOffer pricePer"><span className="priceOffer">606,92&nbsp;Kč/kg</span></div>
        </div>
        <div className="sc-7b55d595-0 ijlAcn counterWrap">
            <div className="sc-a9d751a2-0 bUgNrc">
                <div data-test="counter" className="sc-a2945aee-0 iXYNHt">
                    <button data-product-id="1330761" aria-label="Přidat jeden kus." data-gtm-button="addPiece"
                            data-test="btnAdd" className="sc-9eef65b4-0 sc-a2945aee-1 jrsdBm iaeISY">Do košíku
                    </button>
                </div>
            </div>
        </div>
    </div>
</article>*/
