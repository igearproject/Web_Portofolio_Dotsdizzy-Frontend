import http from "./httpClient";
import getToken from "./getToken";

class projectHandling{
    async getAll(option){
        const token=await getToken.new();
        return http.get(`project?page=${option.page}&limit=${option.limit}&searchKey=${option.searchKey}&searchBy=${option.searchBy}&sortBy=${option.sortBy}&sortOption=${option.sortOption}&category=${option.category}`,{
            headers:{
                'Authorization':token
            },
        });
    }
    async getAllPublish(option){
        return http.get(`project/published?page=${option.page}&limit=${option.limit}&searchKey=${option.searchKey}&searchBy=${option.searchBy}&sortBy=${option.sortBy}&sortOption=${option.sortOption}&category=${option.category}&tags=${option.tags}`);
    }

    async getOnePublish(_id){
        return http.get(`project/published/${_id}`);
    }

    async addOne(data){
        const token=await getToken.new();
        // console.log("token="+token)
        return http.post('project',{
            title:data.title,
            description:data.description,
            tags:data.tags,
            url:data.url,
            metaKeyword:data.metaKeyword,
            metaDescription:data.metaDescription,
            published:data.published,
            showAtHome:data.showAtHome,
            categorys:data.categorys,
            images:data.images
        },{
            headers:{
                'Authorization':token
            },
        });
    }

    async updateOne(data){
        const token=await getToken.new();
        // console.log("token="+token)
        return http.put(`project/${data._id}`,{
            title:data.title,
            description:data.description,
            tags:data.tags,
            url:data.url,
            metaKeyword:data.metaKeyword,
            metaDescription:data.metaDescription,
            published:data.published,
            showAtHome:data.showAtHome,
            categorys:data.categorys,
            images:data.images
        },{
            headers:{
                'Authorization':token
            },
        });
    }

    async deleteOne(_id){
        const token=await getToken.new();
        // console.log("token="+token)
        return http.delete(`project/${_id}`,{
            headers:{
                'Authorization':token
            },
        });
    }


    
}

export default new projectHandling;