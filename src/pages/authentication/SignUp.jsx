import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useContext, useRef } from 'react'
import { AuthControl } from '../../Auth/AuthProvider'
import { updateProfile } from 'firebase/auth'
import { auth } from '../../../public/firebase/firebase.config'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { imgbbupload } from '../../Hooks/utilies'
import UseaxiosPublic from '../../Hooks/UseaxiosPublic'
import { axiosSecure } from '../../Hooks/UseAxois'


const SignUp = () => {
    const { signUp, update, googlelogin } = useContext(AuthControl)
    const navigate = useNavigate()
    const axiosPublic = UseaxiosPublic()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },

    } = useForm()
    const onSubmit = async (data) => {
        // console.log(data.image[0])
        const image = data.image[0]
        const img = await imgbbupload(image)
        await signUp(data.email, data.password)
            .then(result => {

                update(data.name, img.data?.display_url)
                    .then(() => {
                        console.log("succes full")
                        const userinfo = {
                            name: data.name,
                            img: img.data?.display_url,
                            email: data.email,
                            role: "user"
                        }
                        //create user entry the database;
                        axiosPublic.post('/users', userinfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    alert('succeful add')
                                }
                            })
                        reset()
                        navigate('/')
                    })
                    .catch(() => {
                        console.log('error')
                    })
            })
            .catch(error => {
                console.log(error.message)
            })
        // try {
        //     const img = await imgbbupload(image)
        //     await signUp(data?.email, data?.password)
        //     console.log(img.data?.display_url)
        // }
        // catch {
        //     (error) => {
        //         console.log(error.message)
        //     }
        // }

    }
    const handlegoogle = () => {
        googlelogin()
            .then(result => {
                console.log(result.user)
                const userinfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    img: result.user?.photoURL,
                    role: "user"
                }
                axiosSecure.post('/users', userinfo)
                    .then(res => {
                        console.log(res.data)
                        navigate('/')
                    })

            })
            .catch(error => {
                console.log(error.message)
            })
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                    <p className='text-sm text-gray-400'>Welcome to StayVista</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input

                                type='text'
                                name='name'
                                {...register("name", { required: true })}
                                id='name'
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            {
                                errors.name && <span className=' text-red-800'>This Name filed is required</span>
                            }
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input

                                required
                                type='file'
                                id='image'
                                name='image'
                                {...register("image")}
                                accept='image/*'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input

                                type='email'
                                name='email'
                                {...register("email", { required: true })}
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            {
                                errors.email && <span className=' text-red-800'>This email filed is required</span>
                            }
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input

                                type='password'
                                name='password'
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

                                })}
                                autoComplete='new-password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                            {
                                errors.password?.type === "required" && <span className="text-red-800">please This password filed is required</span>
                            }
                            {
                                errors.password?.type === "maxLength" && <span className="text-red-800">please less then 20 number</span>
                            }
                            {
                                errors.password?.type === "minLength" && <span className="text-red-800">please greater than 8 number</span>
                            }
                            {
                                errors.password?.type === "pattern" && <span className=' text-red-800'>Minimum eight characters, at least one letter, one number and one special character: </span>
                            }
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-rose-500 w-full rounded-md py-3 text-white'
                        >
                            Continue
                        </button>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Signup with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={handlegoogle} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default SignUp
