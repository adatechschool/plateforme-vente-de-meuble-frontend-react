import { createBrowserHistory } from 'history'
import { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from './ui/button';

function Product () {
    const history = createBrowserHistory(); 
    const splitPathname = history.location.pathname.split('/')
    const productId = splitPathname[2]

    const [ productData, setProductData ] = useState<any>()
    const [ isInCart, setIsInCart ] = useState<boolean>(false)    
  
    
    const formattedProductData = {
        id: productData?.[0].id, 
        image: productData?.[0].image_links[0], 
        product_name: productData?.[0].product_name, 
        price: productData?.[0].price,
    }

    const handleClickFromCart = () => {
      if (isInCart) {
        localStorage.removeItem(productData?.[0].id)
      } else {
        localStorage.setItem(productData?.[0].id, JSON.stringify(formattedProductData));    
      }
      setIsInCart(!isInCart)
    }
    
    const getProductInfo = async () => {
        const request = await fetch(`http://localhost:3000/product/${productId}`)
        const fetchProductData = await request.json()
        setProductData(fetchProductData)
        return fetchProductData[0].id
    }

    useEffect(() => {
        const initializeProduct = async () => {
            const fetchedId = await getProductInfo()
            if (fetchedId) {
                setIsInCart(localStorage.getItem(fetchedId.toString()) ? true : false)
            }
        }
        initializeProduct()
    }, [])

    function capitalizeFirstLetter(val: string) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const dynamicClasses = isInCart ? "bg-white text-black hover:bg-slate-100 min-w-40": "bg-slate-900 text-white min-w-40" 

    return (
    <div className='min-h-[85vh]'>
        <div className='flex w-full justify-center items-center py-10 px-4 gap-20'>
            <div className="flex w-1/3 gap-8">
                    <Carousel opts={{loop: true}} className="flex flex-col gap-4">
                        <CarouselContent className='w-full items-center'>
                            {productData?.[0].image_links.map((image: string, index: number) => (
                                <CarouselItem  key={index} className='basis-full'>
                                    <img src={image} className="" alt="" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='' />
                        <CarouselNext />
                    </Carousel>
                </div>
                <div className='w-1/3 flex flex-col gap-8'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <h2 className="text-4xl mb-2">{productData?.[0].product_name}</h2>
                            <p className="text-2xl">{productData?.[0].price.toFixed(2).replace(".", ",")}€</p>
                        </div>
                        <div className='leading-6'>
                            <p className="font-bold mt-3">Description</p>
                            <p>{productData?.[0].description}</p>
                            <p className="font-bold mt-3">Catégorie</p>
                            <p>{capitalizeFirstLetter(productData?.[0].type)}</p>
                            <p className="font-bold mt-3">Matière</p>
                            <p>{capitalizeFirstLetter(productData?.[0].material)}</p>
                            <p className="font-bold mt-3">État</p>
                            <p>{capitalizeFirstLetter(productData?.[0].state)}</p>
                        </div>
                    </div>
                    <div>
                        <Button className={dynamicClasses} onClick={handleClickFromCart}>{isInCart ? "Retirer du panier" : "Ajouter au panier"}</Button>
                    </div>
                </div>
        </div>
    </div>
    )
}

export default Product 