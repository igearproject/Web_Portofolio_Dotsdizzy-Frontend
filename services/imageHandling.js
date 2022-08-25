import http from "./httpClient";
import getToken from "./getToken";

class imageHandling{
    
    async getAll(option){
        const token=await getToken.new();
        return http.get(`image?limit=${option.limit}&last=${option.last}&searchKey=${option.searchKey}&searchBy=${option.searchBy}&sortBy=${option.sortBy}&sortOption=${option.sortOption}`,{
        // return http.get(`image`,{
            headers:{
                'Authorization':token
            },
        });
    }

    async addOne(image,alt_text,thumbnail,onUploadProgress){
        const token=await getToken.new();
        let formData=new FormData();
        formData.append('image',image);
        formData.append('alt_text',alt_text);
        formData.append('thumbnail',thumbnail);
        // console.log(formData)

        return http.post('image',formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':token
            },
            onUploadProgress,
            // onDownloadProgress
        });
        
    }

    async updateOne(data){
        const token=await getToken.new();
        return http.put(`image/${data._id}`,{
            alt_text:data.alt_text,
            thumbnail:data.thumbnail,
        },{
            headers:{
                'Authorization':token
            },
        });
    }

    async deleteOne(_id,onUploadProgress){
        const token=await getToken.new();
        return http.delete(`image/${_id}`,{
            headers:{
                'Authorization':token
            },
            onUploadProgress,
        });
    }


    
}

export default new imageHandling;