import { NextFunction, Request, Response } from "express";
import PravaDostupa from "../models/pravaDostupa";
import ApiError from "../error/ApiError";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

class PravaDostupaController {
  private static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private static generateJwt(id: number, user_name: string): string {
    return jwt.sign(
      {
        id,
        user_name,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
  }

  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user_name, password, description } = req.body;

      if (!user_name || !password || !description) {
        res
          .status(400)
          .send("Поля: user_name, password, и description обязательны!");
        return;
      }

      const existingUser = await PravaDostupa.findOne({ where: { user_name } });

      if (existingUser) {
        return next(
          ApiError.badRequest(
            `Пользователь ${existingUser.user_name} уже зарегистрирован!`
          )
        );
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const newPravaDostupa = await PravaDostupa.create({
        user_name,
        password: hashPassword,
        description,
      });

      const token = PravaDostupaController.generateJwt(
        newPravaDostupa.id,
        user_name
      );
      res.json({ token });
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      res.status(500).send("Ошибка сервера!");
    }
  }

  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user_name, password } = req.body;
      const user = await PravaDostupa.findOne({
        where: { user_name },
      });

      if (!user) {
        return next(
          ApiError.badRequest(`Пользователь ${user_name} не зарегистрирован!`)
        );
      }

      const isPasswordValid = await PravaDostupaController.comparePasswords(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return next(ApiError.badRequest("Неверный пароль!"));
      }

      const token = PravaDostupaController.generateJwt(user.id, user.user_name);

      // res.setHeader("Authorization", `Bearer ${token}`);

      res.json({ token, id: user.id, description: user.description });
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      res.status(500).send("Ошибка сервера!");
    }
  }

  // id возвращается undefined!
  public static async check(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, user_name } = req.body;
      // console.log(`id: ${id}, username: ${user_name}`);
      const token = PravaDostupaController.generateJwt(id, user_name);
      // return res.json({ token });
      res.json({ token });
    } catch (e) {
      console.error(e instanceof Error ? e.message : e);
      res.status(500).send("Ошибка серввера!");
    }
  }
}

export default PravaDostupaController;
