import { Button } from "./ui/button";

function AddToCart({ handleClickFromCart, isInCart} : any) {

    const dynamicClasses = isInCart ? "bg-slate-900 text-white" : "bg-white text-black hover:bg-slate-100"
    

    return (
        <>
        <Button onClick={handleClickFromCart} className={dynamicClasses} >{isInCart ? "Ajouté" : "Ajouter au panier"}</Button>
        {/* <button onClick={handleClickFromCart} className="p-2 w-full border border-black hover:bg-black hover:text-white duration-150 mt-2 font-nunito ">{isInCart ? "Ajouté ✔️" : "Ajouter au panier"}</button> */}
        </>
    )
}

export default AddToCart;


