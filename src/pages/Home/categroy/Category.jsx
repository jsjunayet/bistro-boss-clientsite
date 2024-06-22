import useMenu from "../../../Hooks/useMenu";
import "./Category.css"

const Category = () => {
    const [menu] = useMenu();
    const prizza = menu.filter((item)=>item.category==="pizza")
    const dessert = menu.filter((item)=>item.category==="dessert")
    const soup = menu.filter((item)=>item.category==="soup")
    const Drinks = menu.filter((item)=>item.category==="drinks")
    const salad = menu.filter((item)=>item.category==="salad")
    return (
        <div>
            <div className="max-w-6xl  mx-auto my-16">
                <div className="flex flex-col md:grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-4 md:row-span-2">
                    <div className="relative col-span-2 row-span-2 image_galary">
                        <img className="rounded-xl" src="https://i.ibb.co/zbJpPgW/cocktail-with-lemon-lime-strawberry-decoration-generative-ai.jpg" alt="Drinks" />
                        <div className="absolute right-10 bottom-0 text-white info">
                            <h2 className="text-2xl  font-Roboto font-bold">Drinks</h2>
                            <h3 className="offer mb-2 font-bold font-Roboto">Total: {Drinks.length}</h3>
                        </div>
                    </div>
                    <div className="relative col-span-full row-span-full md:col-span-1 md:row-span-1 image_galary">
                        <img className="rounded-xl" src="https://i.ibb.co/N1yntbD/close-up-piece-cheesecake-wooden-table.jpg" alt="Dessert" />
                        <div className="absolute right-10 bottom-0 text-white info">
                            <h2 className="text-2xl  font-Roboto font-bold">Dessert</h2>
                            <h3 className="offer mb-2 font-bold font-Roboto">Total: {dessert.length}</h3>
                        </div>
                    </div>
                    <div className="relative col-span-1 row-span-1 image_galary">
                        <img className="rounded-xl" src="https://i.ibb.co/d2hdrJz/lentil-soup-with-mixed-ingredients-herbs-white-bowl.jpg" alt="Soup" />
                        <div className="absolute right-10 bottom-0 text-white info">
                            <h2 className="text-2xl  font-Roboto font-bold">Soup</h2>
                            <h3 className="offer mb-2 font-bold font-Roboto">Total: {soup.length}</h3>
                        </div>
                    </div>
                    <div className="relative col-span-2 row-span-2 image_galary">
                        <img className="rounded-xl w-full object-fill h-full md:min-h-[412px]" src="https://i.ibb.co/Tc5cdB2/overhead-shot-vegan-salad-round-white-ceramic-plate.jpg" alt="Salad" />
                        <div className="absolute right-10 bottom-0 text-white info">
                            <h2 className="text-2xl  font-Roboto font-bold">Salad</h2>
                            <h3 className="offer mb-2 font-bold font-Roboto">Total: {salad.length}</h3>
                        </div>
                    </div>
                    <div className="relative col-span-1 row-span-1 image_galary">
                        <img className="rounded-xl" src="https://i.ibb.co/s2npkhF/pizza-pizza-filled-with-tomatoes-salami-olives.jpg" alt="Pizza" />
                        <div className="absolute right-10 bottom-0 text-white info">
                            <h2 className="text-2xl  font-Roboto font-bold">Pizza</h2>
                            <h3 className="offer mb-2 font-bold font-Roboto">Total: {prizza.length}</h3>
                        </div>
                    </div>
                    <div className="relative col-span-1 row-span-1 image_galary">
                        <img className="rounded-xl w-full object-fill md:h-[265px]" src="https://i.ibb.co/g6xvSbC/4704611.jpg" alt="ALL" />
                        <div className="absolute right-10 bottom-0 text-white info">
                            <h2 className="text-2xl  font-Roboto font-bold">ALL</h2>
                            <h3 className="offer mb-2 font-bold font-Roboto">Total: {menu.length}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
