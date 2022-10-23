import { useState, useEffect } from "react";
import { TwGame, GamesInterface } from "../../hooks/interfaces/GamesInterface";
import { listAllGames } from "../../hooks/getDatagames";

export function GameBanner(props: TwGame) {
    const [games, setGames] = useState<GamesInterface[]>([]);
    const teste = games.map((a) => {
        return a.gameId;
    });

    useEffect(() => {
        listAllGames().then((resp) => setGames(resp));
    }, []);

    const adsCount = games.map((a) => {
        const number = a._count.gameId;
        const id = a.gameId;
        const obj = { id, number };
        return obj;
    });
    const newObj = adsCount.map((a) => {
        if (a.id === props.id) {
            const number = a.number;
            const text: string = `${number} anúncios(s)`;

            return text;
        }
    });

    return (
        <a
            href=""
            className="relative rounded-lg overflow-hidden"
            id={props.id}
        >
            <img src={props.box_art_url} alt="game" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="text-base font-bold text-white block">
                    {props.name}
                </strong>
                <span className="text-zinc-300 text-sm block ">
                    {newObj ? newObj : "0 anúncios(s)"}
                </span>
            </div>
        </a>
    );
}
