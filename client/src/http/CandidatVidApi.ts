import axios from "axios";
import { ICandidatVid } from "../types/ICandidatVid";

class CandidatVidApi {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL + "/candidatVid";
  }

  public async getUsers(): Promise<ICandidatVid[]> {
    const response = await axios.get<ICandidatVid[]>(this.apiUrl + "/getUsers");
    return response.data;
  }

  public async getUserById(id: string): Promise<ICandidatVid> {
    const response = await axios.get<ICandidatVid>(
      this.apiUrl + "/getUserById/" + id
    );
    return response.data;
  }

  public async addUser(user: Omit<ICandidatVid, "id">): Promise<ICandidatVid> {
    const response = await axios.post<ICandidatVid>(this.apiUrl + "/add", user);
    return response.data;
  }

  public async updateUser(
    id: string,
    user: ICandidatVid
  ): Promise<ICandidatVid> {
    const response = await axios.put<ICandidatVid>(
      this.apiUrl + /edit/ + id,
      user
    );
    return response.data;
  }

  public async deleteUser(userId: number): Promise<void> {
    await axios.delete(this.apiUrl + "/delete/" + userId);
  }
}

const candidatVidService = new CandidatVidApi();
export default candidatVidService;
