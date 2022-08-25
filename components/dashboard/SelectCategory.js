import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import categoryHandling from "../../services/categoryHandling";
import errorHandling from "../../services/errorHandling";

const SelectCategory = (props) => {
    const [categorys,setCategorys]=useState([]);
    const [selected,setSelected]=useState([]);
    const [option,setOption]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        getData();
        if(props.value){
            setSelected([])
            props.value.map((data)=>{
                setSelected(prev=>([...prev,{
                    label:data.name,
                    value:data._id,
                }
                ]));
            });
        }
    },[]);
    useEffect(()=>{
        let category=[];
        selected.map((data)=>{
            category.push({
                _id:data.value,
                name:data.label,
            });
        });
        props.result(prev=>({...prev,categorys:category}));
    },[selected]);
    useEffect(()=>{
        if(categorys.length>0){
            setOption([]);
            categorys.map((data)=>{
                setOption(prev=>([...prev,{
                    label:data.name,
                    value:data._id,
                }
                ]));
            });
        }
        // console.log("option",option)
    },[categorys]);

    const getData=async()=>{
        setLoading(true);
        try{
            const response=await categoryHandling.getAll();
            // console.log("response",response);
            setCategorys(response.data.data);
            
        }catch(err){
            props.setMsg(errorHandling.getData("category",err));
        }
        setLoading(false);
    }
    return (
        <MultiSelect
            options={option}
            value={selected}
            onChange={setSelected}
            labelledBy="Select Category"
            hasSelectAll={false}
            isLoading={loading}
        />
    )
}

export default SelectCategory