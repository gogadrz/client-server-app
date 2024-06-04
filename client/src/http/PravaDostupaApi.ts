import axios, { AxiosPromise } from "axios";
// import { IPravaDostupa } from "../types/IPravaDostupa";

// interface IPravaDostupaApi {
//   login(credentials: {user_name: string; password: string}): Promise<AxiosPromise>
// }

class PravaDostupaApi {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL + "/pravaDostupa";
  }

  public async login(credentials: {
    user_name: string;
    password: string;
  }): Promise<AxiosPromise> {
    try {
      const response = await axios.post(this.apiUrl + "/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        console.error("Неверное имя пользователя или пароль");
        throw new Error(
          `Неверное имя пользователя или пароль:  ${response.statusText}`
        );
      }
      return response;
    } catch (e) {
      console.log("Не верное имя пользователя или пароль");
      console.error(e instanceof Error ? e.message : e);
      throw new Error("Не верное имя пользователя или пароль");
    }
  }
}

const pravaDostupaApi = new PravaDostupaApi();
export default pravaDostupaApi;
