
import { useEffect, useState } from 'react';
import '../style/Topbar.scss';
import NavBar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../config.json';
import { Account } from '../types';


export default function TopBar() {
    const nav = useNavigate();
    const [elapse, setElapse] = useState(false);
    const [account, setAccount] = useState<Account | undefined>(undefined);
    const location = useLocation();

    const pageName = location.pathname.split('/').filter(Boolean).pop() || 'home';

    const handleButtonClick = () => {
        setElapse(prevElapse => !prevElapse);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token !== null) {
            const fetchAccountInfo = async () => {
                try {
                    const result = await fetch(config.api_url + "/api/me", {
                        method: "GET",
                        headers: {
                            "Authorization": token
                        }
                    });

                    if (!result.status) {
                        localStorage.removeItem("token");
                        throw new Error("response failed");
                    }

                    const response: Account = await result.json();
                    console.log(response);
                    setAccount(response);
                } catch (e) {
                    console.log(e);
                }
            }

            fetchAccountInfo();
        }
    }, []);

    return (
    <div>
        <div className='relative z-10 top-0'>
            {elapse ? 
                (
                    <div>
                        <NavBar />
                    </div>
                )
                :
                (
                    <div></div>
                )
            }
        </div>
        <div className={
            [
                "fixed flex top-0 items-center overflow-hidden",
                "w-full h-[55px]",
                "backdrop-blur",
                "z-10",
                "border-b border-[rgba(255,255,255,calc(var(--transparency)+0.25))]",
                "topbar"
            ].join(" ")}>
            <div className="fixed">
                <button className='border-none rounded-md p-2 ml-2 bg-secondary text-primary-text-color' onClick={handleButtonClick}>{elapse ? 'Close Navbar' : 'Open Navbar'}</button>
            </div>
            <div className="flex justify-center items-center w-full">
                <h3 className='font-bold'>{pageName}</h3>
            </div>
            {account ? (
            <div className='flex items-center justify-center pr-3 pl-3'>
                <h4>{account.username}</h4>
            </div>
            ) : (
            <div className='flex items-center justify-center pr-3 pl-3'>
                <button className='border-none rounded-md p-2 ml-2 bg-secondary text-primary-text-color' onClick={() => nav('/register_or_login')}>Login</button>
            </div>
 
            )}
            
            
        </div>
    </div>

    )
}