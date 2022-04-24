import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'entities/administrator.entity';
import { Repository } from 'typeorm';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { ApiRespone } from '../../../misc/api.response.class';
import { resolve } from 'path';
import * as crypto from 'crypto';

@Injectable()
export class AdministratorService {
    constructor(
       @InjectRepository(Administrator)
       private readonly administrator: Repository<Administrator>,
    ) { }
    getAll(): Promise<Administrator[]> {
        return this.administrator.find();
    }
   getById(id: number) {
       return  this.administrator.findOneById(id);
   }

    add(data: AddAdministratorDto): Promise<Administrator | ApiRespone> {
        const crypto = require('crypto');
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let newAdmin: Administrator = new Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        return new Promise((resolve) =>{
            this.administrator.save(newAdmin).then(data => resolve(data))
            .catch(error => {
                const response: ApiRespone = new ApiRespone("Error", -1001);
                resolve(response);
            });
        });
    }

    async editById(id: number, data: EditAdministratorDto): Promise<Administrator | ApiRespone> {
        let admin: Administrator = await this.administrator.findOneById(id);

        if (admin === undefined || admin === null) {
            return new Promise((resolve) => {
                resolve(new ApiRespone("error", -1002));
            });
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        admin.passwordHash = passwordHashString;

        return this.administrator.save(admin);
    }

}
