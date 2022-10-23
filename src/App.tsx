import { useState, useEffect } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { getOauth } from "./hooks/getOauthTwitch";

import { CreateAdDou } from "./components/CreateAdDuo/CreateAdDuou";
import { GameBanner } from "./components/GameBanner/GameBanner";
import { Form } from "./components/Form/Form";

import "./styles/main.css";

import logo from "./assets/Logo.png";

import { TwGame } from "./hooks/interfaces/GamesInterface";

function App() {
    const [gamess, setTw] = useState<TwGame[]>([]);

    useEffect(() => {
        getOauth().then((resp) => setTw(resp.data));
    }, []);

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <img src={logo} alt="Logo" />
            <h1 className="text-6xl text-white font-black mt-20">
                Seu{" "}
                <span className="text-transparent bg-nlw-gradient bg-clip-text">
                    duo{" "}
                </span>
                está aqui.
            </h1>
            <div className="grid grid-cols-6 gap-6 mt-16">
                {gamess.map((a) => {
                    let newUrl = a.box_art_url
                        .replace("{width}", "188")
                        .replace("{height}", "250");

                    return (
                        <GameBanner
                            key={a.id}
                            id={a.id}
                            box_art_url={newUrl}
                            name={a.name}
                        />
                    );
                })}
            </div>
            <Dialog.Root>
                <CreateAdDou />

                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
                    <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                        <Dialog.Title className="text-3xl font-black">
                            Publique um anúncio
                        </Dialog.Title>
                        <Form />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}

export default App;
