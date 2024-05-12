import { Body, Controller, Get, Param, Post, Delete, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Tickets } from "./tickets.type";
import { TicketsService } from "./tickets.service";
import { TicketsDTO } from "./tickets.dto";

@Controller('tickets')
@ApiTags('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }
    @Get()
    async getTickets(): Promise<Tickets[]> {
        return this.ticketsService.Tickets()
    }
    @Get('/:_id')
    async getTicket(@Param('_id') _id: string): Promise<Tickets> {
        return this.ticketsService.Ticket(_id)
    }

    @Post()
    async createTickets(@Body() data: TicketsDTO): Promise<{}> {
        return this.ticketsService.createTickets(data)
    }

    @Delete('/:_id')
    async removeTickets(@Param('_id') _id: string): Promise<{}> {
        return this.ticketsService.removeTickets(_id)
    }

    @Put('/:_id')
    async updateTickets(@Param('_id') _id: string, @Body() data: TicketsDTO): Promise<Tickets> {
        return this.ticketsService.updateTickets(_id, data)
    }

}