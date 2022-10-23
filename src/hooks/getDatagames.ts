import axios from "axios";
import { GamesInterface } from "./interfaces/GamesInterface";

interface GameInterface {
    data: GamesInterface[];
}

export async function listAllGames(): Promise<GameInterface> {
    const endPoint = "http://localhost:3333/games";

    const response = await axios.get<GameInterface>(endPoint);
    
   

    return response.data;
}
