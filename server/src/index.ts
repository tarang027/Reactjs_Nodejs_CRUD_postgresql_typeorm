import * as express from "express";
import "reflect-metadata";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
const cors = require('cors');

createConnection().then(connection => {
    const userRepository = connection.getRepository(User);

    const app = express();
    app.use(express.json());
    app.use(cors());


    app.get("/api/user/getAll", async function (req: Request, res: Response) {
        const users = await userRepository.find();
        res.json({ status: true, data : users });
    });

    app.post("/api/user/addEditUser", async function (req: Request, res: Response) {

        if (req.body.actionType === 'edit') {
            const user = await userRepository.findOne(req.body._id);
            userRepository.merge(user, req.body);
            const results = await userRepository.save(user);
            res.send({ status: true, message: 'User  updated successfully' });
        }
        else {
            const user = await userRepository.create({...req.body , _id: undefined });
            const results = await userRepository.save(user);
            res.send({ status: true, message: 'User  inserted successfully' });
        }
    });

    app.post("/api/user/deleteUser", async function (req: Request, res: Response) {
        const results = await userRepository.delete(req.body._id);
        res.send({ status: true, message: 'User  deleted successfully' })
    });

    app.listen(5000);
});
