import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tickets } from "./tickets.type";
import { Model } from "mongoose";
import { TicketsDTO } from "./tickets.dto";
import { UserDTO } from "src/users/user.dto";

@Injectable()
export class TicketsService {
    constructor(@InjectModel(Tickets.name) private ticketsModel: Model<Tickets>) { }

    async Tickets(): Promise<Tickets[]> {
        return await this.ticketsModel.find()
    }

    async Ticket(_id: string): Promise<Tickets> {
        return await this.ticketsModel.findById(_id).populate('ticketsOwner')
    }

    async createTickets(ticketsDTO: TicketsDTO): Promise<Tickets> {
        const tickets = new this.ticketsModel(ticketsDTO)

        return tickets.save()
    }

    async removeTickets(_id: string): Promise<{}> {
        return await this.ticketsModel.findByIdAndDelete(_id)
    }

    async updateTickets(_id: string, ticketsDTO: TicketsDTO): Promise<Tickets> {
        return await this.ticketsModel.findByIdAndUpdate(_id, ticketsDTO)
    }

}