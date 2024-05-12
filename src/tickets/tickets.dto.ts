import { IsNotEmpty } from "class-validator";

export class TicketsDTO{
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    ticketsOwner:string

    @IsNotEmpty()
    location:string

    @IsNotEmpty()
    price:number
}