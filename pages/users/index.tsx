import React, { useEffect, useState } from 'react'

export default function index() {
    const[users,setUsers]=useState<any[]>([])
    useEffect(()=>{
        const fn=async()=>{
            const fetchdata=await fetch("http://localhost:3000/api/users")
            const data=await fetchdata.json()
            console.log(data)
            setUsers(data)

        }
        fn()
    },[])
    console.log(users)
  return (
    <div>index
        {users.map((user)=>(
            <div key={user.id}>
            <div >
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>
            </div>
        ))}
    </div>
  )
}
