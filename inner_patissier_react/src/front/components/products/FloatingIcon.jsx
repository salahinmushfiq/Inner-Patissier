
import React from 'react'
import { Link} from 'react-router-dom';
const FloatingIcon = () => {
  return (
        <Link to="/cart">
            <div className="m-12 sticky top-[80%] right-0 z-50" >
            <div className="relative inline-flex bg-[#e4d7d19d] rounded-full hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 ">
            <div
            
                className="absolute bg-[#E4D7D1] rounded-xl shadow-lg bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap bg-danger px-1.5 py-1 text-center align-baseline text-xs font-bold leading-none text-[#800020]">
                99+
            </div>
                <div
                    className="mb-2 flex px-4 py-2 text-xl font-medium uppercase leading-normal text-white  transition duration-150 ease-in-out ">
                    <span className="[&>svg]:h-8 [&>svg]:w-8">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#800020">
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>

                    </span>
                </div>
            </div>
            </div>
        </Link>
    )
}

export default FloatingIcon