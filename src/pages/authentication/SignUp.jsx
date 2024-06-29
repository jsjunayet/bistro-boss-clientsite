import { useContext, useState } from 'react';
import { PiEyeLight, PiEyeSlash } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import UseaxiosPublic from '../../Hooks/UseaxiosPublic';
import { AuthControl } from '../../Auth/AuthProvider';
import { imgbbupload } from '../../Hooks/utilies';
import { TbFidgetSpinner } from 'react-icons/tb';
import Swal from 'sweetalert2';

const useFormValidation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formData, setFormData, errors, validateForm };
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { formData, setFormData, errors, validateForm } = useFormValidation();
  const { signUp, update, googlelogin } = useContext(AuthControl);
  const navigate = useNavigate();
  const axiosPublic = UseaxiosPublic();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted with data:', formData);
      const image = selectedImage;
      const img = await imgbbupload(image);
      await signUp(formData.email, formData.password)
        .then(result => {
          update(formData.name, img.data?.display_url)
            .then(() => {
              console.log("Successfully updated");
              const userinfo = {
                name: formData.name,
                img: img.data?.display_url,
                email: formData.email,
                role: "user"
              };
              // create user entry in the database
              axiosPublic.post('/users', userinfo)
                .then(res => {
                  if (res.data.insertedId) {
                    console.log(res.data.insertedId)
                  }
                });
              navigate('/');
              Swal.fire("Successfully Resistor...");


            })
            .catch((error) => {
              Swal.fire(`${error.message}`);

            });
        })
        .catch(error => {
          setLoading(false);
          Swal.fire(`${error.message}`);
        });
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setSelectedImage(null);
    } else {
      setLoading(false);
      Swal.fire("Form has validation errors");

    }
  };

  const handleGoogleSignIn = () => {
    setLoadings(true);
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
            setLoadings(false);
            navigate('/');
            Swal.fire("Successfully Resistor...");

          });
      })
      .catch(error => {
        setLoadings(false);
        Swal.fire(`${error.message}`);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div className="bg-[url('https://i.ibb.co/09fff83/crop-plate-with-vegetable-salad-1.jpg')] bg-cover bg-left min-h-screen flex items-center justify-center md:justify-end md:pr-10 pr-0">
      <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg w-full max-w-md mx-2">
        <h2 className="text-center text-2xl font-bold mb-2">JUNAEYT | RESTAURANT</h2>
        {selectedImage && (
          <div className="flex flex-col justify-center items-center mb-4">
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-20 h-20 object-cover rounded-full" />
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>

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
          <div className="relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowConfirmPass(!showConfirmPass)}>
              {showConfirmPass ? <PiEyeLight /> : <PiEyeSlash />}
            </div>
          </div>
          <div className="mt-6">
            <input type="file" accept="image/*" className='w-full p-2 border border-gray-300 rounded' onChange={handleImageUpload} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-800"
          >
            {loading ? <TbFidgetSpinner className='animate-spin mx-auto' /> : "REGISTER"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            <FcGoogle className="mr-2" /> {loadings ? <TbFidgetSpinner className='animate-spin mx-auto' /> : "Sign in with Google"}
          </button>
          <Link
            to='/login'
            className='hover:underline flex py-2 text-sm text-center hover:text-rose-500 text-gray-700'
          >
            <p>Already have an account?{' '}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
