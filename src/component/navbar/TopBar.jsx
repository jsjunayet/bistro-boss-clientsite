
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IoMdCall } from 'react-icons/io';
import { HiOutlineMail } from 'react-icons/hi';
import { FaInstagram, FaMessage } from 'react-icons/fa6';

const TopBar = () => {
    const phoneNumber = '+8801640011818';
    const email = 'junayetshiblu0@gmail.com';

    return (
        <div className="bg-gray-800 text-white py-2 px-4">
            <div className="max-w-[1150px] md:gap-2 gap-0 mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <IoMdCall className="md:mr-2 mr-1 text-xs md:text-base" />
                    <a
                        href={`https://wa.me/${phoneNumber.replace(/-/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-500 text-xs md:text-base"
                    >
                        {phoneNumber}
                    </a>
                </div>
                <div className="flex items-center ml-2">
                    <HiOutlineMail className="md:mr-2 mr-1  text-xs md:text-base" />
                    <a
                        href={`mailto:${email}`}
                        className="hover:text-blue-300 text-xs md:text-base"
                    >
                        {email}
                    </a>
                </div>
                <div className="flex md:space-x-4 space-x-2 ml-auto">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 md:block hidden">
                        <FaFacebook />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaTwitter />
                    </a>
                    <a  href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 md:block hidden">
                        <FaMessage/>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
