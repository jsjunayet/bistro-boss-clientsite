
const Title = ({ heading, paragraph }) => {
    return (
        <div className=" mx-auto md:w-2/4 ">
            <p className="text-[#D99904] text-center">{heading}</p>
            <p className="text-3xl uppercase text-[#151515] text-center  border-t-4 border-b-4 py-2 my-2">{paragraph}</p>
        </div>
    );
};

export default Title;