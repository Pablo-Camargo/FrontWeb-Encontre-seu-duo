import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { listAllGames } from "./hooks/getDatagames";

import { CreateAdDou } from "./components/CreateAdDuo/CreateAdDuou";
import { GameBanner } from "./components/GameBanner/GameBanner";
import { Input } from "./components/Form/Input";

import { GameController } from "phosphor-react";

import "./styles/main.css";

import logo from "./assets/Logo.png";

import { GamesInterface, Data } from "./hooks/interfaces/GamesInterface";

function App() {
    const [games, setGames] = useState<Data[]>([]);

    useEffect(() => {
        listAllGames().then((resp) => setGames(resp));
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
                {games.map((a) => {
                    return (
                        <GameBanner
                            key={a.id}
                            bannerUrl={a.bannerUrl}
                            title={a.title}
                            adsCount={a._count.ads}
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

                        <form action="" className="mt-8 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="game" className="font-semibold">
                                    Qual o game?
                                </label>

                                <Input
                                    type="text"
                                    id="game"
                                    placeholder="Selecione o game que deseja jogar "
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="font-semibold">
                                    Qual o seu nome(ounickname)?{" "}
                                </label>
                                <Input
                                    id="name"
                                    placeholder="Como te chamam dentro do game? "
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="yearsPlaying"
                                        className="font-semibold"
                                    >
                                        Joga há quantos anos?
                                    </label>
                                    <Input
                                        type="number"
                                        id="yearsPlaying"
                                        placeholder="Tudo bem ser ZERO "
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="discord"
                                        className="font-semibold"
                                    >
                                        Qual seu Discord?
                                    </label>
                                    <Input
                                        type="number"
                                        id="discord"
                                        placeholder="Usuario#0000"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="weekDays"
                                        className="font-semibold"
                                    >
                                        Quando costuma jogar?
                                    </label>
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label
                                        htmlFor="hourStart"
                                        className="font-semibold"
                                    >
                                        Qual horario do dia?
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input
                                            type="time"
                                            id="hourStart"
                                            placeholder="De"
                                        />
                                        <Input
                                            type="time"
                                            id="hourEnd"
                                            placeholder="Até"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 flex gap-2 text-sm">
                                <Input type="checkbox" />
                                Costume me conectar ao chat de voz
                            </div>
                            <footer className="mt-4 flex justify-end gap-4">
                                <Dialog.Close
                                    type="button"
                                    className="bg-zinc-500 px-5 h-12 rounded-md font-semibold  hover:bg-zinc-600"
                                >
                                    Cancelar
                                </Dialog.Close>
                                <button
                                    type="submit"
                                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                                >
                                    <GameController className="w-6 h-6" />
                                    Encontrar duo
                                </button>
                            </footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}

export default App;