import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";



const Footer = () => {
  const links = (
    <>
      <li className="gray">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="gray">
        <Link to={"/contact-us"}>Contact Us</Link>
      </li>
      <li className="gray">
        <Link to={"/events"}>Bistro</Link>
      </li>
     
    </>
  );

  return (
    <footer className="pt-[1px] bg-black text-white">
      <div className="container mx-auto flex flex-col items-center md:justify-around md:flex-row md:items-start md:my-5">
        <div className="logo my-7">
          <Link to={"/"}>
            <h1 className="mx-3 active font-bold text-3xl">Pizza Potpourri Palace</h1>
          </Link>
        </div>

        <div className="my-7">
          <p className="text-2xl">Menu</p>
          <ul className="mt-2">{links}</ul>
        </div>
        {/* socials */}
        <div className="legal my-7">
          <p className="text-2xl">Socials</p>
          <ul className="mt-2">
            <li className="gray flex  gap-2 items-center">
              <Link className="text-xl" to={"/"}>
                <FaFacebook></FaFacebook>
              </Link>
              <Link to={"/#"}>Facebook</Link>
            </li>
            <li className="gray flex  gap-2 items-center">
              <Link className="text-xl" to={"/"}>
                <FaTwitter></FaTwitter>
              </Link>
              <Link to={"/#"}>Twitter</Link>
            </li>
            <li className="gray flex gap-2 items-center">
              <Link className="text-xl" to={"/"}>
                <FaLinkedinIn></FaLinkedinIn>
              </Link>
              <Link to={"/#"}>LinkedIn</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="divider mt-5"></div>
      <div className=" container  py-2 px-4">
        <p className="my-5 mx-auto text-center">
        Copyright&copy; CulinaryCloud. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;



