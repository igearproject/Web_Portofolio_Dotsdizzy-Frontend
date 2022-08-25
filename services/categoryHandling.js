import http from "./httpClient";
import getToken from "./getToken";

class categoryHandling{
    getAll(){
        const token=getToken.new();
        return http.get('category',{
            headers:{
                'Authorization':token
            },
        });
    }

    async addOne(name,description){
        const token=await getToken.new();
        // console.log("token="+token)
        return http.post('category',{
            name:name,
            description:description
        },{
            headers:{
                'Authorization':token
            },
        });
    }

    async updateOne(_id,name,description){
        const token=await getToken.new();
        // console.log("token="+token)
        return http.put(`category/${_id}`,{
            name:name,
            description:description
        },{
            headers:{
                'Authorization':token
            },
        });
    }

    async deleteOne(_id){
        const token=await getToken.new();
        // console.log("token="+token)
        return http.delete(`category/${_id}`,{
            headers:{
                'Authorization':token
            },
        });
    }


    
}

export default new categoryHandling;