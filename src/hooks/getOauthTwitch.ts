import axios from "axios";
import { DataUrl, OauthInterface } from "./interfaces/OauthInterface";

export async function getOauth(): Promise<DataUrl> {
    const endPoint = "http://localhost:3333/";
    const games = "https://api.twitch.tv/helix/games/top";

    const response = await axios.get<DataUrl>(endPoint);
    const postUrl = response.data;

    const post = await axios.post<OauthInterface>(postUrl);
    const a = post.data?.access_token;
    const config = axios.create({
        headers: {
            Authorization: `Bearer ${a}`,
            "Client-Id": "s7ggirazrr0dhehoji0dsb5qqz2jnr",
        },
    });

    const res = await config.get(games);

    return res.data;
}
