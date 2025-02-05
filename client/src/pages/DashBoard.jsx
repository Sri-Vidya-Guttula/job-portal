import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const DashBoard = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar (Fixed at the top) */}
            <div className="fixed top-0 left-0 w-full bg-white shadow py-4 px-5 flex justify-between items-center z-50">
                <img 
                    onClick={() => navigate('/')} 
                    className="max-sm:w-32 cursor-pointer" 
                    src={assets.logo} 
                    alt="Company Logo" 
                />
                <div className="flex items-center gap-3">
                    <p className="max-sm:hidden">Welcome, GreatStack</p>
                    <div className="relative group">
                        <img className="w-8 border rounded-full cursor-pointer" src={assets.company_icon} alt="Profile Icon" />
                        <div className="absolute hidden group-hover:block top-12 right-0 min-w-[120px] bg-white shadow-lg rounded-md border">
                            <ul className="p-2 text-sm">
                                <li className="py-1 px-2 cursor-pointer hover:bg-gray-100 rounded-md">Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Layout with Sidebar and Content */}
            <div className="flex flex-1 pt-16"> {/* Add padding-top to avoid overlap */}
                {/* Sidebar */}
                <div className="w-64 min-h-screen p-4 shadow-md">
                    <ul className="flex flex-col gap-4">
                        <NavLink to="/dashboard/add-job" className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
                            <img className="min-w-4" src={assets.add_icon} alt="Add Job Icon" />
                            <p className='max-sm:hidden'>Add Job</p>
                        </NavLink>
                        <NavLink to="/dashboard/manage-jobs" className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
                            <img className="min-w-4" src={assets.home_icon} alt="Manage Jobs Icon" />
                            <p className='max-sm:hidden'>Manage Jobs</p>
                        </NavLink>
                        <NavLink to="/dashboard/view-applications" className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
                            <img className="min-w-4" src={assets.person_tick_icon} alt="View Applications Icon" />
                            <p className='max-sm:hidden'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-5 w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;

