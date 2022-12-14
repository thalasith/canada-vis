import Link from "next/link";
import { useState } from "react";
// import { GiHamburgerMenu, GiBasketballBall } from "react-icons/gi";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="relative mb-3 flex flex-wrap items-center justify-between bg-red-700 px-2 py-3">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <Link
          href="/"

          // className=" flex w-full flex-row text-2xl font-bold text-white lg:static lg:block lg:w-auto lg:justify-start"
        >
          {/* <GiBasketballBall className="mt-1 mr-1" color="EA8500" />{" "} */}
          <p className="flex flex-row rounded-full text-2xl font-bold  text-white ">
            Canada Census Visualization Tool
          </p>
        </Link>
        <button
          className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-white outline-none focus:outline-none lg:hidden"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          {/* <GiHamburgerMenu /> */}
        </button>

        <div
          className={
            "flex-grow items-center lg:flex" +
            (navbarOpen ? " flex flex-col" : " hidden")
          }
        >
          {/* <ul className="flex list-none flex-col justify-end px-3 lg:ml-auto lg:flex-row lg:px-0">
            <li className="nav-item">
              <div className="mt-2 flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-white lg:mt-0">
                Hi there
              </div>
            </li>
            <li className="nav-item">
              <div className="mt-2 grid border-separate items-center rounded-lg border-2 bg-white px-3 py-1 text-xs font-bold uppercase leading-snug text-blue-500 hover:bg-gray-200 lg:mt-0.5">
                There too
              </div>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
