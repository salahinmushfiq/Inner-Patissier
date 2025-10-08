import React,{ useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {AiOutlineMail} from 'react-icons/ai';
import {BsPersonBadge} from 'react-icons/bs';
import axios from 'axios';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useMapContext } from '../contexts/MapContextProvider';
const EmployeeProfile = () => {
    const [user,setUser]=useState([]);
    const {currentToken}=useStateContext();
    const base_url = process.env.REACT_APP_API_URL ; 
    const {id}=useParams();
    const {selectedEmployee}=useMapContext();
    // selectedEmployee;
    // console.log(selectedEmployee);
    // console.log(user);
    // useEffect(()=>{
    //     // axios.get(`https://dummyjson.com/users/${id}`).then((response)=>{
    //     console.log("Token: "+currentToken);
    //     axios.get(`http://127.0.0.1:8000/user/profile/${id}`,{
    //         headers:{"Authorization":"Token "+window.localStorage.getItem("token")}
    //       }).then((response)=>{
            
    //         console.log("respose");
    //         console.log(response.data);
    //         setUser(response.data);
    //         console.log(user);
    //     });
    //   },[]);
      
  return (
    
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg">
        <Header category="Page" title="Profile" />
        <div className='flex gap-8 flex-col'>
            <div className='flex flex-wrap md:flex-wrap justify-between items-start gap-3'>
                <a href="#" className="flex flex-col lg-w-1/5 gap-4 md:flex-col md:w-min sm:w-min items-center bg-white rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    
                    { selectedEmployee.hasOwnProperty("image") ? <img className="object-cover w-full h-auto rounded-t-lg md:h-auto md:w-full md:rounded-full shadow-xl" src={selectedEmployee.image} alt=""/> : 
                        <div class="flex items-center mt-4 space-x-3 animate-pulse">
                            <svg class="w-48 h-48 text-gray-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                    
                        </div>
                    }
                    <div className="flex flex-wrap flex-col w-full min-w-fit justify-between p-4 leading-normal md:w-full shadow-lg gap-2">
                        <div className='flex flex-wrap w-full'><h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{selectedEmployee.firstName}</h5></div>
                        <div className='flex flex-wrap w-full font-semibold min-w-max'><AiOutlineMail style={{fontSize:"24",marginRight:"5"}}/><p className="font-normal text-gray-700 dark:text-gray-400 break-word">{selectedEmployee.email}</p></div>
                        <div className='flex flex-wrap w-full font-semibold'><BsPersonBadge style={{fontSize:"24",marginRight:"5"}}/><p className="font-normal text-gray-700 dark:text-gray-400 flex break-normal">{selectedEmployee.username}</p></div>
                    </div>
                </a>
                <div className='flex flex-col items-center gap-4 md:flex-col md:flex-grow sm:w-min'>
                    
                    <div className="flex items-center w-full bg-white rounded-lg border shadow-md md:flex-col md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="flex flex-wrap justify-between p-4 leading-normal md:w-full sm-min">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white w-32">Basic Info</h5>
                                { selectedEmployee.hasOwnProperty("address") ?
                                <div className='mb-2 flex flex-col p-2 text-gray-900 dark:text-white flex-grow'>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>Address: </p>
                                        { selectedEmployee.hasOwnProperty("address")   && <p>{selectedEmployee.address.address}</p>}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>City: </p>
                                        { selectedEmployee.hasOwnProperty("address")   && <p>{selectedEmployee.address.city}</p>}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>Postal Code: </p>
                                        { selectedEmployee.hasOwnProperty("address")    && <p>{selectedEmployee.address.postalCode}</p>}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>State: </p>
                                        { selectedEmployee.hasOwnProperty("address")    && <p>{selectedEmployee.address.state}</p>}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>DOB: </p>
                                        {selectedEmployee.hasOwnProperty("birthDate") && <p>{selectedEmployee.birthDate}</p>}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>Age: </p>
                                        {selectedEmployee.hasOwnProperty("age") && <p>{selectedEmployee.age}</p>}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>Blood Group: </p>
                                        {selectedEmployee.hasOwnProperty("bloodGroup") && <p>{selectedEmployee.bloodGroup}</p>}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>Ip: </p>
                                        {selectedEmployee.hasOwnProperty("ip") && <p>{selectedEmployee.ip}</p>}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>University: </p>
                                        {selectedEmployee.hasOwnProperty("university") && <p>{selectedEmployee.university}</p>}
                                    </div>
                                
                                </div>:
                                <div role="status" class="space-y-2.5 animate-pulse flex flex-col p-2 flex-grow">
                                    <div class="flex items-center space-x-2 w-full">
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                    </div>
                                    <div class="flex items-center w-full space-x-2 max-w-[480px]">
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                    </div>
                                    <div class="flex items-center w-full space-x-2 max-w-[400px]">
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                    </div>
                                    <div class="flex items-center w-full space-x-2 max-w-[480px]">
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                    </div>
                                    <div class="flex items-center w-full space-x-2 max-w-[440px]">
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>
                                    <div class="flex items-center w-full space-x-2 max-w-[360px]">
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                    </div>
                                    <div class="flex items-center w-full space-x-2 max-w-[480px]">
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                    </div>
                                    <div class="flex items-center w-full space-x-2 max-w-[440px]">
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>
                                    <div class="flex items-center w-full space-x-2 max-w-[360px]">
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                    </div>
                                    <div class="flex items-center w-full space-x-2 max-w-[440px]">
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>
                                    <div class="flex items-center w-full space-x-2 max-w-[360px]">
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                    </div>
                                    <span class="sr-only">Loading...</span>
                                </div>
                                }
                        </div>
                    </div>

                    <div className="flex items-center w-full bg-white rounded-lg border shadow-md md:flex-col md:max-w-full md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="flex flex-wrap justify-between p-4 leading-normal md:w-full">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white w-32">Finacial Info</h5>
                        {
                            selectedEmployee.hasOwnProperty("bank") ?
                            <div className='mb-2 flex flex-col p-2 text-gray-900 dark:text-white flex-grow'>
                                <div className='flex flex-row'>
                                    <p className='px-3 text-gray-700 dark:text-white font-semibold'>CardType: </p>
                                    { selectedEmployee.hasOwnProperty("cardType") && <p>{selectedEmployee.bank.cardType}</p>}
                                </div>
                                <div className='flex flex-row'>
                                    <p className='px-3 text-gray-700 dark:text-white font-semibold'>Currency: </p>
                                    { selectedEmployee.hasOwnProperty("currency") && <p>{selectedEmployee.bank.currency}</p>}
                                </div>
                                <div className='flex flex-row'>
                                    <p className='px-3 text-gray-700 dark:text-white font-semibold break-normal'>Card Number: </p>
                                    { selectedEmployee.hasOwnProperty("cardNumber") && <p>{selectedEmployee.bank.cardNumber}</p>}
                                </div>
                                <div className='flex flex-row'>
                                    <p className='px-3 text-gray-700 dark:text-white font-semibold'>Expire Date: </p>
                                    { selectedEmployee.hasOwnProperty("cardExpire") && <p>{selectedEmployee.bank.cardExpire}</p>}
                                </div>
                                
                            
                            </div>:
                            <div role="status" class="space-y-2.5 animate-pulse flex flex-col p-2 flex-grow">
                            <div class="flex items-center space-x-2 w-full">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            </div>
                            <div class="flex items-center w-full space-x-2 max-w-[480px]">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            </div>
                            <div class="flex items-center w-full space-x-2 max-w-[400px]">
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            </div>
                            <div class="flex items-center w-full space-x-2 max-w-[480px]">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            </div>
                            <div class="flex items-center w-full space-x-2 max-w-[440px]">
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            </div>
                            <div class="flex items-center w-full space-x-2 max-w-[360px]">
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            </div>
                            <div class="flex items-center w-full space-x-2 max-w-[480px]">
                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            </div>
                            <span class="sr-only">Loading...</span>
                            </div>
                            }
                        </div>
                    </div>

                    <div className="flex items-center w-full bg-white rounded-lg border shadow-md md:flex-col md:max-w-full md:min-w-1/2 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="flex flex-wrap justify-between p-4 leading-normal  md:w-full ">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white w-32">Official Info</h5>
                            {
                             selectedEmployee.hasOwnProperty("company") ?
                                <div className='mb-2 flex flex-col p-2 text-gray-900 dark:text-white flex-grow'>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>Department: </p>
                                        { selectedEmployee.hasOwnProperty("department") && <p>{selectedEmployee.company.department}</p>}
                                    </div>
                            
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>Designation: </p>
                                        { selectedEmployee.hasOwnProperty("title") && <p>{selectedEmployee.company.title}</p>}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>Address: </p>
                                        { selectedEmployee.hasOwnProperty("address") && <p>{selectedEmployee.company.address.address}</p>}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>City: </p>
                                        { selectedEmployee.hasOwnProperty("city") && <p>{selectedEmployee.company.address.city}</p>}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='px-3 text-gray-700 dark:text-white font-semibold'>Postal Code: </p>
                                        { selectedEmployee.hasOwnProperty("postalCode") && <p>{selectedEmployee.company.address.postalCode}</p>}
                                    </div>
                                </div>    
                                :
                                <div role="status" class="space-y-2.5 animate-pulse flex flex-col p-2 flex-grow">
                                <div class="flex items-center space-x-2 w-full">
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                </div>
                                <div class="flex items-center w-full space-x-2 max-w-[480px]">
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                </div>
                                <div class="flex items-center w-full space-x-2 max-w-[400px]">
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                </div>
                                <div class="flex items-center w-full space-x-2 max-w-[480px]">
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                </div>
                                <div class="flex items-center w-full space-x-2 max-w-[440px]">
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </div>
                                <div class="flex items-center w-full space-x-2 max-w-[360px]">
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                </div>
                                <div class="flex items-center w-full space-x-2 max-w-[480px]">
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                </div>
                                
                                
                                <span class="sr-only">Loading...</span>
                                    </div>
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  );
}


export default EmployeeProfile