import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import { Dropdown, Spinner } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { RiUserSettingsLine } from "react-icons/ri";
import CryptoJS from "crypto-js";
import userHandling from "../../services/userHandling";
import Link from "next/link";

const AccountMenu = (props) => {
    const [userInfo,setUserInfo]=useState([]);
    // const [key,setKey]=useState(process.env.NEXT_PUBLIC_SECRET_KEY);
    const [token,setToken]=useState('');
    const [loadingLogout,setLoadingLogout]=useState(false);
    const [msg,setMsg]=useState({
        status:'',
        msg:''
    });
    const router=useRouter();
    const path=router.pathname.split('/')[2]||"/"

    const getData=async()=>{
        try{
            const encryptToken=localStorage.getItem('token');
			const realToken=await CryptoJS.AES.decrypt(encryptToken,process.env.NEXT_PUBLIC_SECRET_KEY).toString(CryptoJS.enc.Utf8);
			setToken(`Bearer ${realToken}`);
            const response=await userHandling.profile(`Bearer ${realToken}`);
            setUserInfo(response.data.data.user);
            // console.log(response);
        }catch(err){
            if (err.response.status === 403) {
                router.push('/login');
            }else if(err.response.status === 401){
                console.log(err.message);
            }else{
                console.log(err.message);
            }
            
        }
    }

    useEffect(()=>{
        getData()
    },[])

    const handleLogout=async()=>{
        setLoadingLogout(true)
        try{
            await userHandling.logout();
            localStorage.removeItem('token');
            router.push('/login');
        }catch(err){
            setMsg({
                status:'error',
                msg:'Logout failed >> '+err.message,
            })
        }
        setLoadingLogout(false)
    }
    return (
        <Dropdown className={props.className}>
            <Dropdown.Toggle variant="dark" id="account-menu-basic">
                {userInfo.name?.substring(0, 10)} ({userInfo.role})
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                <li>
                    <Link href="/dashboard/account">
                        <a href="#">
                            <div className={path==="account"?("dropdown-item disabled"):("dropdown-item")} >
                                <RiUserSettingsLine/> Account Setting
                            </div>
                        </a>
                    </Link>
                </li>
                <Dropdown.Item href="#" onClick={handleLogout}>{loadingLogout?(<Spinner size="sm"/>):(<BiLogOut/>)} logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AccountMenu