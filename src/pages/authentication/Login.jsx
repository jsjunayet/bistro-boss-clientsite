import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthControl } from '../../Auth/AuthProvider';
import UseaxiosPublic from '../../Hooks/UseaxiosPublic';


const Login = () => {
    const { login, googlelogin } = useContext(AuthControl)
    const [disable, setdisable] = useState(true)
    const axiosPublic = UseaxiosPublic()

    const emailref = useRef(null)
    const passwordref = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    const captcharef = useRef(null)
    const handlecaptcha = () => {

        const user_captcha_value = captcharef.current.value
        console.log(user_captcha_value)
        if (validateCaptcha(user_captcha_value)) {
            setdisable(false)
        }
        else {
            setdisable(true)
        }
    }
    const handleform = (e) => {
        e.preventDefault()
        const email = emailref.current.value
        const password = passwordref.current.value
        login(email, password)
            .then(result => {
                navigate('/')
            })
            .catch(error => {
                console.log(error.message)
            })

    }
    const handlegoogle = () => {
        googlelogin()
            .then(result => {
                const userinfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    img: result.user?.photoURL,
                    role: "user"
                }
                axiosPublic.post('/users', userinfo)
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
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
                </div>
                <form onSubmit={handleform}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                ref={emailref}
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                ref={passwordref}
                                type='password'
                                name='password'
                                autoComplete='current-password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <LoadCanvasTemplate />
                            </div>
                            <input
                                ref={captcharef}
                                type='text'
                                name='cpatcha'
                                autoComplete='current-password'
                                id=''
                                required
                                placeholder='please same'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                            <Link onClick={handlecaptcha} className='btn btn-outline btn-xs w-full my-2'>valitdate</Link>
                        </div>
                    </div>

                    <div>
                        <button disabled={disable}
                            type='submit'
                            className='btn btn-primary w-full rounded-md py-3 text-white'
                        >
                            Continue
                        </button>
                    </div>
                </form>
                <div className='space-y-1'>
                    <button className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
                        Forgot password?
                    </button>
                </div>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={handlegoogle} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don&apos;t have an account yet?{' '}
                    <Link
                        to='/signup'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default Login
