import { useNavigate, useLocation } from "react-router-dom";

const Page = ({ children, goto }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button
      className={`${
        location.pathname === goto
          ? "text-blue-500"
          : "text-white hover:text-cyan-500"
      } text-lg`}
      onClick={() => navigate(goto)}
    >
      {children}
    </button>
  );
};

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-black mb-5 flex flex-row items-center space-x-8 px-5">
      <div className="text-white text-2xl font-bold">Eye-ya!</div>
      <Page goto="/">about</Page>
      <Page goto="/focus">focus mode</Page>
      <Page goto="/exercises">eye exercises</Page>
    </div>
  );
};

export default Navbar;
