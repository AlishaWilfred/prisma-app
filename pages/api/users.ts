import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../lib/prisma";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case 'GET':
            try{
                const user=await prisma.users.findMany({
                    include:{
                        group:true
                    }
                })
                return res.status(200).json(user)
        
            }catch(err){
                res.status(500).json({err:"Internal server error"})
            }

        case "POST":
            const addUser=await prisma.users.create({
                data:{
                    name:req.body.name,
                    email:req.body.email
                }
            })  
            if(addUser.email) return res.status(400).json({message:"User already exists!!"})
            return res.json(addUser)

        case "PATCH":
            const {id}=req.query
            const {name,email}=req.body
            if(!id) return
            const updateuser=await prisma.users.update({
              where:{id:parseInt(id as string)},
              data:{name,email}
            })    

        return res.json(updateuser)

        case 'DELETE':
        const { userid } = req.query;
        if (!userid) {
          return res.status(400).json({ error: 'User ID is required' });
        }
        await prisma.userGroup.delete({
          where:{
            id:parseInt(userid as string)
          }
        })
        const deletedUser = await prisma.users.delete({
          where: { id: parseFloat(userid as string) },
        });
        return res.status(200).json(deletedUser);


        default:
              return res.status(405).json({ error: 'Method Not Allowed' });
        
    }
   
}