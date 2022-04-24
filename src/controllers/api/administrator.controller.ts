import { Controller, Get, Param, Put, Body, Post } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { Administrator } from "entities/administrator.entity";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { ApiRespone } from '../../../misc/api.response.class';
import { resolve } from 'path';

@Controller('api/administrator')
export class AdministratorController {
    constructor(
        private administratorService: AdministratorService
    ) { }

    // GET http://localhost:3000/api/administrator/
    @Get()
    getAll(): Promise<Administrator[]> {
        return this.administratorService.getAll();
    }

    // GET http://localhost:3000/api/administrator/4/
    @Get(':id')
     async getById(@Param('id') administratorId: number): Promise<Administrator | ApiRespone> {
         return new Promise(async(resolve) =>{

         
        let admin = await  this.administratorService.getById(administratorId);
        if(admin === undefined){
            resolve(new ApiRespone("error", -1002))

        }
        resolve(admin);
    });
    }

    // PUT http://localhost:3000/api/administrator/
    @Put()
    add(@Body() data: AddAdministratorDto): Promise<Administrator | ApiRespone> {
        return this.administratorService.add(data);
    }

    // POST http://localhost:3000/api/administrator/4/
    @Post(':id')
    edit(@Param('id') id: number, @Body() data: EditAdministratorDto): Promise<Administrator | ApiRespone> {
        return this.administratorService.editById(id, data);
    }
}