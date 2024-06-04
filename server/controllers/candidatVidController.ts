import { Request, Response } from "express";
import CandidatVid, { ICandidatVid } from "../models/candidatVid";

class CandidatVidController {
  public static async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const candidats: ICandidatVid[] = await CandidatVid.findAll();
      return res.json(candidats);
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      return res.status(500).send("Ошибка сервера!");
    }
  }

  public static async getUserById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const candidatId = req.params.id;
      const candidat: ICandidatVid | null = await CandidatVid.findByPk(
        candidatId
      );

      if (!candidat) {
        return res.status(404).send("Пользователь не найден!");
      }

      // console.log(`Пользователь с id ${candidatId} получен`);
      return res.status(200).json(candidat);
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      return res.status(500).send("Ошибка сервера!");
    }
  }

  public static async addUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).send("Имя обязательно!");
      }

      const existingUser = await CandidatVid.findOne({ where: { name } });

      if (existingUser) {
        return res.status(409).json({
          message: "Пользователь с таким именем уже зарегистрирован!",
        });
      }

      const newCandidat = await CandidatVid.create({ name });
      return res.status(201).json(newCandidat);
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      return res.status(500).send("Ошибка сервера!");
    }
  }

  public static async editUser(req: Request, res: Response): Promise<Response> {
    try {
      const candidatId = req.params.id;
      const { name } = req.body;

      const candidat = await CandidatVid.findByPk(candidatId);
      if (!candidat) {
        return res.status(404).send("Пользователь не найден!");
      }

      candidat.name = name;

      await candidat.save();
      // console.log(`Пользователь с id ${candidatId} обновлен.`);
      return res.status(200).json(candidat);
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      return res.status(500).send("Ошибка сервера!");
    }
  }

  public static async deleteUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const candidatId = req.params.id;
      const candidat = await CandidatVid.findByPk(candidatId);

      if (!candidat) {
        return res.status(404).send("Пользователь не найден");
      }

      await candidat.destroy();

      return res.status(200).send("Пользователь удален.");
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      return res.status(500).send("Ошибка сервера!");
    }
  }
}

export default CandidatVidController;
