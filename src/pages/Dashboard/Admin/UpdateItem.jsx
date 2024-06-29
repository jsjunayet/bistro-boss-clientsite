import { useForm } from "react-hook-form";
import Title from "../../../share/Title";
import UseaxiosPublic from "../../../Hooks/UseaxiosPublic";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateItem = () => {
    const imgbb = import.meta.env.VITE_IMG_API_KEY;
    const imgapi = (`https://api.imgbb.com/1/upload?key=${imgbb}`)
    const axiosPublic = UseaxiosPublic()
    const { _id, recipe, price, name, category, image } = useLoaderData()
    console.log(category)

    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log(data);
        const imagefile = { image: data.image[0] }
        axiosPublic.post(imgapi, imagefile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {

                if (res.data.success) {
                    const useritem = {
                        name: data.name,
                        recipe: data.recipe,
                        category: data.category,
                        image: res.data.data.display_url,
                        price: parseInt(data.price)
                    }
                    axiosPublic.patch(`/update/${_id}`, useritem)
                        .then(res => {
                            Swal.fire({
                                toast: true,
                                position: "top-end",
                                icon: "success",
                                title: "UPDATE ITEM",
                                showConfirmButton: false,
                                timer: 1500,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            });
                        })
                }
            })


    }
    return (
        <div>
            <div className="mt-10">
                <div className="text-center text-3xl font-semibold">UPDATE ITEM</div>
            </div>
            <div className="mr-20">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name*</span>
                        </label>
                        <input {...register("name")} defaultValue={name} type="text" placeholder="name" className="input input-bordered" required />
                    </div>

                    <div className="flex gap-5">
                        <div className="form-control w-1/2 ">
                            <label className="label">
                                <span className="label-text">Category*</span>

                            </label>
                            <select {...register("category")} className="select select-bordered" defaultValue={category}>
                                <option value="" disabled>Select category</option>
                                <option value="dessert" selected={category === "dessert"}>dessert</option>
                                <option value="drinks" selected={category === "drinks"}>drinks</option>
                                <option value="soup" selected={category === "soup"}>soup</option>
                                <option value="pizza" selected={category === "pizza"}>pizza</option>
                                <option value="salad" selected={category === "salad"}>salad</option>
                            </select>
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">price*</span>
                            </label>
                            <input defaultValue={price} {...register("price")} type="text" placeholder="price" className="input input-bordered" required />
                        </div>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea defaultValue={recipe} {...register("recipe")} placeholder="Bio" className="textarea textarea-bordered textarea-md w-full " ></textarea>

                    </div>
                    <div className="mt-2">
                        <input  {...register("image")} type="file" placeholder="You can't touch this" className="  file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <button className="btn btn-outline btn-ghost my-5 text-xl font-semibold">Summit</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;