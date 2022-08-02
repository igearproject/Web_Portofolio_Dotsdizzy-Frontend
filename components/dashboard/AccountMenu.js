import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import { Dropdown } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { RiUserSettingsLine } from "react-icons/ri";
import CryptoJS from "crypto-js";
import userHandling from "../../services/userHandling";

const AccountMenu = (props) => {
    const [userInfo,setUserInfo]=useState([]);
    // const [key,setKey]=useState(process.env.NEXT_PUBLIC_SECRET_KEY);
    const [token,setToken]=useState('');
    const router=useRouter();
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
                router.push('/dashboard');
            }else if(err.response.status === 401){
            }else{
                console.log(err.message);
            }
            
        }
    }

    useEffect(()=>{
        getData()
    },[])
    return (
        <Dropdown className={props.className}>
            <Dropdown.Toggle variant="dark" id="account-menu-basic">
                {userInfo.name} ({userInfo.role})
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                <Dropdown.Item href="#/action-1"><RiUserSettingsLine/> Account Setting</Dropdown.Item>
                <Dropdown.Item href="#/action-2"><BiLogOut/> logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AccountMenu