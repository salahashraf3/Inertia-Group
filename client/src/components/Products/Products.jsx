import React, { useEffect, useState } from 'react'
import { Cards } from '../Card'
import { Input } from "@material-tailwind/react";
import axios from "axios"

const Products =  () => {
  const [search,setSearch] = useState("")
  const [products,setProducts] = useState([])

    useEffect(()=>{
      try {
        const response =  axios.get("http://localhost:3000/api/user/product-list")
        response.then((data) => {
          setProducts(data.data)
        }).catch(error=>console.log(error))
      } catch (error) {
        console.log(error)
      }
      
    },[])

  return (
    <div className="product-container ">
      
       <div className="w-72 mb-2 text-white">
      <Input color ="blue" className='text-white' label="Search....." onChange={(e)=> setSearch(e.target.value)} />
    </div>
        <div className="product-List">
          {products.filter((value) => value.title.toLowerCase().includes(search.toLowerCase())).map((value) => {
            return (
        <Cards key= {value.id} name= {value.title} desc={value.description} img= {value.thumbnail} rating = {value.rating} price={value.price} id= {value.id}/> 
            )
             
          })}
       
    </div>
    </div>
    
  )
}

export default Products