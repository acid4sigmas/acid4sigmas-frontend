
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
        <div className='navbar-container'>
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
        <div className="topbar">
            <div className="open-navbar-container">
                <button className='open-navbar-btn' onClick={handleButtonClick}>{elapse ? 'Close Navbar' : 'Open Navbar'}</button>
            </div>
            <div className="current-page-header-container">
                <div className='current-page-header-container-inner'>
                    <h3>{pageName}</h3>
                </div>
            </div>
            {account ? (
            <div className='acc-top-bar-container'>
                <div className='acc-top-bar-container'>
                    <h4>{account.username}</h4>
                </div>
            </div>
            ) : (
            <div className='user-login-container'>
                <div className='user-login-container-inner'>
                    <button className='user-login-btn' onClick={() => nav('/register_or_login')}>Login</button>
                </div>
            </div>
            )}
            
            
        </div>
    </div>

    )
}