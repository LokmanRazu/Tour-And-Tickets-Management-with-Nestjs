import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/users/user.type";
import { Document } from "mongoose";

export type TicketsDocument = Tickets & Document


@Schema()
export class Tickets{
    @Prop({required:true})
    name:string

    @Prop({required:true,trim:true,type:Types.ObjectId,ref:'User',default:"Razu"})
    ticketsOwner:Types.ObjectId | User


    @Prop({required:true,enum:['Dhaka','CTG','Cumilla']})
    location:string
    @Prop({required:true,enum:[500,1000]})
    price:number
}

export const TicketsSchema = SchemaFactory.createForClass(Tickets)