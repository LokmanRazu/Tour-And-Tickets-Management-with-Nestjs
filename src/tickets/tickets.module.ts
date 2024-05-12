import { Module } from "@nestjs/common";
import { TicketsController } from "./ticktes.controller";
import { TicketsService } from "./tickets.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Tickets, TicketsSchema } from "./tickets.type";

@Module({
    imports:[
        MongooseModule.forFeatureAsync([
            {
                name:Tickets.name,
                useFactory:()=>{
                    return TicketsSchema
                }
            }
        ])

    ],
    controllers:[TicketsController],
    providers:[TicketsService],
    exports:[]
    
})
export class TicketsModule{

}