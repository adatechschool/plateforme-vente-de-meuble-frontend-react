type Card = {
    image: string,
    product_name: string,
    price: number
}

const Card = ({ image, product_name, price }: Card) => {



    return (
        <>
        <img src={image} alt="" />
        <h2>{product_name}</h2>
        <p>Prix: {price}</p>
        <button>Ajouter au panier</button>
        </>
    )

}

export default Card