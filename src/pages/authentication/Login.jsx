import { useContext, useState } from 'react';
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { AuthControl } from '../../Auth/AuthProvider';
import UseaxiosPublic from '../../Hooks/UseaxiosPublic';
import { TbFidgetSpinner } from 'react-icons/tb';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const useFormValidation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
   
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formData, setFormData, errors, validateForm };
};

const Login = () => {
    const [loading, setloading]= useState(false)
    const [loadings, setloadings]= useState(false)
    const { login, googlelogin } = useContext(AuthControl)
    const axiosPublic = UseaxiosPublic()
    const navigate = useNavigate()
   
  const [showPass, setShowPass] = useState(false);
  const { formData, setFormData, errors, validateForm } = useFormValidation();

  const handleSubmit = (e) => {
    setloading(true)
    e.preventDefault();
    const email = formData.email
    const password = formData.password
    if (validateForm()) {
        login(email, password)
            .then(result => {
              Swal.fire("Successfully Login...");
                navigate('/')
            })
            .catch(error => {
              Swal.fire(`${error.message}`);
            })
      setFormData({
        email: '',
        password: ''
      });
      setloading(false)
      
    } else {
        setloading(false)
        Swal.fire("Form has validation errors");

    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleGoogleSignIn = () => {
    setloadings(true)
    googlelogin()
      .then(result => {
        console.log(result.user);
        const userinfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          img: result.user?.photoURL,
          role: "user"
        };
        axiosPublic.post('/users', userinfo)
          .then(res => {
            console.log(res.data);
            navigate('/');
            Swal.fire("Successfully Login...");
            setloadings(false)
          });
      })
      .catch(error => {
        setloadings(false)
        Swal.fire(`${error.message}`);
      });
  };


  return (
    <div className="bg-[url('https://i.ibb.co/09fff83/crop-plate-with-vegetable-salad-1.jpg')] bg-cover bg-left min-h-screen flex items-center justify-center md:justify-end md:pr-10 pr-0">
      <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg w-full max-w-md mx-2">
        <h2 className="text-center text-2xl font-bold mb-2">JUNAEYT | RESTUARANT</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPass(!showPass)}>
              {showPass ? <PiEyeLight /> : <PiEyeSlash />}
            </div>
          </div>
         
          
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-800"
          >
            {
                loading? <TbFidgetSpinner className=' animate-spin mx-auto' />: "Login"
            }
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            <FcGoogle className="mr-2" /> {loadings?<TbFidgetSpinner className=' animate-spin mx-auto' />:"Sign in with Google"}
          </button>
          <p className=''>
  
  <Link
      to='/signup'
      className='hover:underline flex j pt-3 text-sm text-center  hover:text-rose-500 text-gray-700'
  >
      <p>Please Create Account?{' '}</p>
  </Link>
  .
</p>

        </div>
      </div>
    </div>
  );
};

export default Login;

