import { useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
export default function Dashboard() {
    const apiUrl = process.env.REACT_APP_API_URL;
    let { handleSubmit, register, formState,reset } = useForm()
    let [images, setImages] = useState([])
    let [bacImages, setBacImages] = useState([])
    const [image, setImage] = useState("")
    const [noOfCopies, setNoOfCopies] = useState(0)
    const [showOptions, setShowOptions] = useState(Array(images.length).fill(false));
    const move = useNavigate()

    // $('#myModal').on('shown.bs.modal', function () {
    //     $('#myInput').trigger('focus')
    //   })

    const createCar = async (data) => {
        // console.log(apiUrl)
        let params = new FormData()
        params.append('carModel', data.carModel)
        params.append('city', data.city)
        params.append('phone', data.phone)
        params.append('price', data.price)
        // params.append('images', bacImages)
        params.append("token", localStorage.getItem('token'))
        params.append("noOfCopies", noOfCopies)

        bacImages.forEach((image, index) => {
            params.append('images', image);
        });
        try {
            let res = await axios.post(`${apiUrl}car/create`, params)
            if (res.data && res.data.status === "success") {
                console.log(res.data)
                reset()
                setNoOfCopies(0)
                setBacImages([])
                setImages([])
               toast.success("Car created successfully")




            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }

    }


    const handleImageChange = (e) => {
        if (noOfCopies === 0) {
            return toast.error(`Please choose number of copies first`)
        }
        if (noOfCopies <= images.length) {
            return toast.error(`You have selected ${noOfCopies} in dropdown`)
        }
        const newImages = [...images];
        const files = e.target.files;
        bacImages.push(e.target.files[0])
        setBacImages(bacImages)
       

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = (e) => {
                newImages.push(e.target.result);
                setImages([...newImages]);
            };

            reader.readAsDataURL(files[i]);
        }
    };

    const toggleOptions = (index) => {
        // console.log(showOptions)
        const newShowOptions = [...showOptions];
        newShowOptions[index] = !showOptions[index];
        setShowOptions(newShowOptions);
    };
    const handleDelete = (index) => {
      
        const newImages = images.filter((_, i) => i !== index);
        const newBacImages = bacImages.filter((_, i) => i !== index);
        setImages(newImages);
        setBacImages(newBacImages)
    }
    // console.log(images)
    return (
        <div className=" tw-p-10">
            <div className="">

                <form enctype="multipart/form-data" onSubmit={handleSubmit(createCar)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Car Model:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                            {...register("carModel", { minLength: 3 })}
                        />
                        {formState?.errors?.carModel?.type == "minLength" && <div className=' tw-text-red-600 tw-text-xs'>Enter atleast 3 characters</div>}
                    </div>
                    <div className="mb-3">

                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Price:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="exampleInputPassword1"
                            required
                            {...register("price", {})}
                        />



                    </div>
                    <div className="mb-3">

                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Phone:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="exampleInputPassword1"
                            required
                            {...register("phone", { minLength: 11, maxLength: 11 })}
                        />


                        {formState?.errors?.phone?.type == "minLength" && <div className=' tw-text-red-600 tw-text-xs'>Please enter 11 letter phone num</div>}
                        {formState?.errors?.phone?.type == "maxLength" && <div className=' tw-text-red-600 tw-text-xs'>Please enter 11 letter phone num</div>}
                    </div>

                    <div className="mb-3 tw-flex tw-items-center tw-gap-2">

                        <label htmlFor="exampleInputPassword1" className="">
                            City:
                        </label>
                        <div className="tw-flex tw-items-center tw-gap-2">
                            <label className="" htmlFor="inlineRadio1">
                                Lahore
                            </label>
                            <input
                                className=""
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                defaultValue="lahore"
                                {...register("city", { required: true })}
                            />

                        </div>
                        <div className="tw-flex tw-items-center tw-gap-2">
                            <label className="" htmlFor="inlineRadio2">
                                Kharachi
                            </label>
                            <input
                                className=""
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                defaultValue="kharachi"
                                {...register("city", { required: true })}
                            />

                        </div>


                    </div>
                    {formState?.errors?.city && <div className=' tw-text-red-600 tw-text-xs'>Please Select City</div>}

                    <div className="mb-3">

                        <label htmlFor="exampleInputPassword1" className="form-label">
                            No. of copies:
                        </label>
                        <select value={noOfCopies} className=" tw-border-2 tw-w-64 tw-h-8 tw-ml-2" name="" id="" required onChange={(e) => { setNoOfCopies(e.target.value) }}>
                            <option value="0">---Choose an option---</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>

                    </div>

                    <div className="tw-flex tw-gap-3 mb-3 tw-flex-wrap">
                        {images.map((image, index) => {
                            return <div key={index} className=" tw-w-28 tw-h-28 tw-bg-slate-200 tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-slate-300"
                                onMouseEnter={() => toggleOptions(index)}
                                onMouseLeave={() => toggleOptions(index)}
                            >
                                <div id="options" className={`tw-w-24 tw-h-24 tw-bg-slate-500 tw-absolute tw-opacity-70 tw-flex tw-justify-center tw-items-center tw-gap-4 ${showOptions[index] ? '' : 'tw-hidden'}`}>
                                    <i className="fa-sharp fa-solid fa-eye tw-text-white tw-cursor-pointer" data-toggle="modal"
                                        data-target="#exampleModalCenter" onClick={() => { setImage(image) }}></i>
                                    <i className="fa-sharp fa-solid fa-trash tw-cursor-pointer" style={{ color: "#eaecf1" }} onClick={() => { handleDelete(index) }} />


                                </div>
                                <img className=" tw-w-24 tw-h-24" src={image} alt="" />

                            </div>
                        })}
                        <label htmlFor="ImagePicker" className=" tw-w-28 tw-h-28 tw-bg-slate-200 tw-flex tw-items-center tw-cursor-pointer tw-border-2 tw-border-slate-300">

                            <div>
                                + Add Pictures
                            </div>

                        </label>
                        <input className=" tw-hidden" id="ImagePicker" type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <button type="submit" className=" tw-h-10 tw-rounded-md tw-bg-slate-500 tw-w-full tw-text-white hover:tw-bg-slate-600">
                        Add Car
                    </button>
                </form>
            </div>

            <>

                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModalCenter"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            {/* <div className="modal-header">
                                <div></div>
                                
                            </div> */}
                            <div className="modal-body tw-p-0">
                                <div className="tw-absolute tw-right-10">
                                    <button
                                        type="button"
                                        className="close tw-absolute"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span className=" tw-text-4xl tw-font-bold" aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <img className="lg:tw-w-[1000px] lg:tw-h-[600px]" src={image} alt="" />
                            </div>

                        </div>
                    </div>
                </div>
            </>


        </div>
    )
}