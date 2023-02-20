import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import GithubIcon from "../icons/GithubIcon";

const Page = ({ children, goto }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button
      className={`${
        location.pathname === goto
          ? "text-white underline underline-offset-2 decoration-blue-500 decoration-2"
          : "text-white hover:text-blue-500"
      } text-md`}
      onClick={() => navigate(goto)}
    >
      <h1>{children}</h1>
    </button>
  );
};

const Navbar = () => {
  return (
    <div className="w-full h-20 border-b-2 border-[rgba(255,255,255,0.1)] mb-5 flex flex-row items-center space-x-8 px-3 pr-2">
      {/* <h1 className="text-white text-2xl font-bold">Eye-ya!</h1> */}
      <img src={logo} className="h-14 -mr-2" />
      <Page goto="/">about</Page>
      <Page goto="/focus">focus mode</Page>
      <Page goto="/exercises">eye exercises</Page>
      <div className="flex-grow"></div>
      <a href="https://github.com/megargayu/eye-ya" target="_blank">
        <GithubIcon className={"h-12 hover:opacity-90"} />
      </a>
    </div>
  );
};

export default Navbar;
