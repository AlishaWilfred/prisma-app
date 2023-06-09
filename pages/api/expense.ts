import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    switch(req.method){
        case "POST":
            const {userId}=req.query
          
            if(!userId) return res.status(400).json("Invalid userId")
            const user=await prisma.userGroup.findUnique({
                where:{
                    id:parseInt(userId as string)
                }
            })
            const addExpense=await prisma.expense.create({
                data:{
                    description:req.body.description,
                    amount:req.body.amount,
                    title:req.body.title,
                    userId:user?.userId
                }
            })
           
        
            return res.json(addExpense)
    }
    
}