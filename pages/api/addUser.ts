import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function addUserToGroup(req:NextApiRequest,res:NextApiResponse) {
    const {groupId,userId}=req.query
    try{
    const group=await prisma.groups.findUnique({
        where:{
            id:parseInt(groupId as string)
        }
    })
    if(!group) return res.status(400).json("No such group exists")
    const user=await prisma.users.findUnique({
        where:{
            id:parseInt(userId as string)
        }
    })
    if(!user) return res.status(400).json("No such user exists")
    const userGroup=await prisma.userGroup.create({
        data:{
            groupId:group.id,
            userId:user.id
        }
    })
   return res.status(200).json(userGroup)
    }catch(err){
        res.status(500).json({err:"an error occured"})
    }
}