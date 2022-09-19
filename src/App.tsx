import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { listAllGames } from "./hooks/getDatagames";

import { CreateAdDou } from "./components/CreateAdDuo/CreateAdDuou";
import { GameBanner } from "./components/GameBanner/GameBanner";
import { Input } from "./components/Form/Input";

import { GameController, Check, CaretDown } from "phosphor-react";

import "./styles/main.css";

import logo from "./assets/Logo.png";

import { GamesInterface, Data } from "./hooks/interfaces/GamesInterface";

function App() {
    const [games, setGames] = useState<Data[]>([]);
    const [week, setWeek] = useState<string[]>([]);
    const [chatVoice, setChatVoice] = useState(false);
    console.log(week);

    useEffect(() => {
        listAllGames().then((resp) => setGames(resp));
    }, []);

    async function hendleCreateAd(e: FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.dicord,
                weekDays: week.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: chatVoice,
            });
            alert("aaaaa")
        } catch (error) {
            alert("errour")
            console.log(error)
        }
    }
    const handleChecked = (e) => {
        setChatVoice(e.target.checked);
    };
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

                        <form
                            onSubmit={hendleCreateAd}
                            className="mt-8 flex flex-col gap-4"
                        >
                            <div className="flex flex-col gap-2">
                                <label htmlFor="game" className="font-semibold">
                                    Qual o game?
                                </label>

                                <Select.Root>
                                    <Select.Trigger
                                        aria-label="game"
                                        id="game"
                                        name="game"
                                        className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 flex items-center justify-between"
                                    >
                                        <Select.Value
                                            placeholder="Selecione o game que deseja jogar"
                                            className="text-zinc-500  placeholder:text-zinc-500"
                                        />
                                        <Select.Icon>
                                            <CaretDown size={23} />
                                        </Select.Icon>
                                    </Select.Trigger>

                                    <Select.Portal>
                                        <Select.Content>
                                            <Select.ScrollUpButton />
                                            <Select.Viewport>
                                                <Select.Group>
                                                    {games.map((game) => {
                                                        return (
                                                            <Select.Item
                                                                value={game.id}
                                                                id={game.id}
                                                                key={game.id}
                                                            >
                                                                <Select.ItemText>
                                                                    {game.title}
                                                                </Select.ItemText>
                                                                <Select.ItemIndicator>
                                                                    <Check
                                                                        size={
                                                                            32
                                                                        }
                                                                    />
                                                                </Select.ItemIndicator>
                                                            </Select.Item>
                                                        );
                                                    })}
                                                </Select.Group>

                                                <Select.Separator />
                                            </Select.Viewport>
                                            <Select.ScrollDownButton />
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Root>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="font-semibold">
                                    Qual o seu nome(ounickname)?{" "}
                                </label>
                                <Input
                                    id="name"
                                    name="name"
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
                                        name="yearsPlaying"
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
                                        name="discord"
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

                                    <ToggleGroup.Root
                                        onValueChange={setWeek}
                                        value={week}
                                        type="multiple"
                                        className="grid grid-cols-4 gap-2"
                                    >
                                        <ToggleGroup.Item
                                            title="Domingo"
                                            value="0"
                                            className={`w-8 h-8 rounded  ${
                                                week.includes("0")
                                                    ? "bg-violet-500"
                                                    : "bg-zinc-900"
                                            }`}
                                        >
                                            D
                                        </ToggleGroup.Item>

                                        <ToggleGroup.Item
                                            title="Sabado"
                                            value="1"
                                            className={`w-8 h-8 rounded  ${
                                                week.includes("1")
                                                    ? "bg-violet-500"
                                                    : "bg-zinc-900"
                                            }`}
                                        >
                                            S
                                        </ToggleGroup.Item>

                                        <ToggleGroup.Item
                                            title="Segunda"
                                            value="2"
                                            className={`w-8 h-8 rounded  ${
                                                week.includes("2")
                                                    ? "bg-violet-500"
                                                    : "bg-zinc-900"
                                            }`}
                                        >
                                            S
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            title="Terça"
                                            value="3"
                                            className={`w-8 h-8 rounded  ${
                                                week.includes("3")
                                                    ? "bg-violet-500"
                                                    : "bg-zinc-900"
                                            }`}
                                        >
                                            T
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            title="Quarta"
                                            value="4"
                                            className={`w-8 h-8 rounded  ${
                                                week.includes("4")
                                                    ? "bg-violet-500"
                                                    : "bg-zinc-900"
                                            }`}
                                        >
                                            Q
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            title="Quinta"
                                            value="5"
                                            className={`w-8 h-8 rounded  ${
                                                week.includes("5")
                                                    ? "bg-violet-500"
                                                    : "bg-zinc-900"
                                            }`}
                                        >
                                            Q
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            title="Sexta"
                                            value="6"
                                            className={`w-8 h-8 rounded  ${
                                                week.includes("6")
                                                    ? "bg-violet-500"
                                                    : "bg-zinc-900"
                                            }`}
                                        >
                                            S
                                        </ToggleGroup.Item>
                                    </ToggleGroup.Root>
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
                                            name="hourStart"
                                            placeholder="De"
                                        />
                                        <Input
                                            type="time"
                                            id="hourEnd"
                                            name="hourEnd"
                                            placeholder="Até"
                                        />
                                    </div>
                                </div>
                            </div>
                            <label className="mt-2 flex gap-2 text-sm">
                                <Input
                                    type="checkbox"
                                    checked={chatVoice}
                                    onChange={handleChecked}
                                />
                                Costume me conectar ao chat de voz
                            </label>
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
