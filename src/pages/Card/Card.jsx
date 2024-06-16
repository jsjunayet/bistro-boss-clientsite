import UseCardItem from "../../Hooks/UseCarditem/UseCardItem";


const Card = () => {
    const [card, refetch] = UseCardItem()
    console.log(card)
    return (
        <div className="mt-20">
            <h1>this is card section</h1>
        </div>
    );
};

export default Card;