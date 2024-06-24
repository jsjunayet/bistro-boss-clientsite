import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import UseAuth from "../../../Hooks/UseAuth";
import img from '../../../assets/image/assets/home/placeholder.jpg';
const DashboardNavbar = () => {
    const {user} = UseAuth();
  return (
    <div className="h-16 border-b mb-2 border-gray-300 flex items-center text-sm text-gray-500">
      <div className="w-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="border border-gray-200 rounded-md flex items-center px-3">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none border-none bg-transparent mr-2"
            />
            <SearchOutlinedIcon />
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <LanguageOutlinedIcon className="mr-1" />
            English
          </div>
          <DarkModeOutlinedIcon
            className="mr-4 cursor-pointer"

          />
          <FullscreenExitOutlinedIcon className="mr-4" />
          <div className="relative mr-4">
            <NotificationsNoneOutlinedIcon />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
              1
            </div>
          </div>
          <div className="relative mr-4">
            <ChatBubbleOutlineOutlinedIcon />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
              2
            </div>
          </div>
          <ListOutlinedIcon className="mr-4" />
          <div className="flex items-center">
          {user ? <img className="w-8 h-8 rounded-full" src={user?.photoURL} /> : <img className="w-8 h-8 rounded-full" src={img} alt="" />}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
