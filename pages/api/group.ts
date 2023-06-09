import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    switch(req.method){
        case "GET":
            const group= await prisma.groups.findMany({
                include:{
                    user:true
                }
            })
            return res.status(200).json(group)

            case "POST":    
            const addGroup=await prisma.groups.create({
                data:{
                name:req.body.name,
            }
            })
            if(addGroup.name) return res.status(400).json({error:"group already exists"})
            return res.status(200).json(addGroup)

        case "PATCH":
            const {id}=req.query
            if(!id)  return res.status(400).json({error:"No such group exists"})
            const updateGroup=await prisma.groups.update({
                where:{
                    id:parseInt(id as string)
                },
                data:{
                    name:req.body.name
                }
            })
          return res.status(200).json(updateGroup)

          case "DELETE":
            const {groupId}=req.query
            if(!groupId)  return res.status(400).json({error:"No such group exists"})
            const deleteGroup=await prisma.groups.delete({
                where:{
                    id:parseInt(groupId as string)
                }
            })
            return res.status(200).json(deleteGroup)

        
          
                default:
                    return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
}