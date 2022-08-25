import CryptoJS from "crypto-js";

class getToken{
    async new(){
        try{
            const encryptToken=await localStorage.getItem('token');
            const realToken=await CryptoJS.AES.decrypt(encryptToken,process.env.NEXT_PUBLIC_SECRET_KEY).toString(CryptoJS.enc.Utf8);
			const token= `Bearer ${realToken}`;
            return token;
        }catch(err){
            return false;
            
        }
    }
}

export default new getToken();