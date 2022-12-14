import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Dialog from "@radix-ui/react-dialog";

import { Input } from "../Field/Input/Input";
import Field from "../Field/Field";

import { getOauth } from "../../hooks/getOauthTwitch";
import { TwGame } from "../../hooks/interfaces/GamesInterface";

import { GameController, Check, CaretDown } from "phosphor-react";
export function Form() {
    const [gamess, setTw] = useState<TwGame[]>([]);
    const [week, setWeek] = useState<string[]>([]);
    const [chatVoice, setChatVoice] = useState(false);

    useEffect(() => {
        getOauth().then((resp) => setTw(resp.data));
    }, []);

    async function hendleCreateAd(e: FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        console.log(data);
        try {
            await axios.post(`http://localhost:3333/games/${data.gameId}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: week.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: chatVoice,
            });
            alert("aaaaa");
        } catch (error) {
            alert("errour");
            console.log(error);
        }
    }
    const handleChecked = (e) => {
        setChatVoice(e.target.checked);
    };
    return (
        <form onSubmit={hendleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="gameId" className="font-semibold">
                    Qual o game?
                </label>

                <Select.Root name="gameId">
                    <Select.Trigger
                        aria-label="gameId"
                        id="gameId"
                        name="gameId"
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
                            <Select.Viewport
                                className="bg-zinc-900 text-white  rounded text-sm overflow-hidden
                                                    
                                                "
                            >
                                {gamess.map((game) => {
                                    return (
                                        <Select.Item
                                            value={game.id}
                                            id={game.id}
                                            key={game.id}
                                            className=" text-sm py-3 px-4 flex items-center justify-between "
                                        >
                                            <Select.ItemText>
                                                {game.name}
                                            </Select.ItemText>
                                            <Select.ItemIndicator>
                                                <Check size={23} />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    );
                                })}

                                <Select.Separator />
                            </Select.Viewport>
                            <Select.ScrollDownButton />
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </div>
            <div className="flex flex-col gap-2">
                <Field.Text
                    text="Qual o seu nome(ounickname)?"
                    htmlFor="name"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Como te chamam dentro do game? "
                />
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <Field.Text
                        text="Joga h?? quantos anos?"
                        htmlFor="yearsPlaying"
                        type="number"
                        id="yearsPlaying"
                        name="yearsPlaying"
                        placeholder="Tudo bem ser ZERO "
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Field.Text
                        text=" Qual seu Discord?"
                        htmlFor="discord"
                        type="text"
                        id="discord"
                        name="discord"
                        placeholder="Usuario#0000"
                    />
                </div>
            </div>
            <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays" className="font-semibold">
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
                            title="Ter??a"
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
                    <label htmlFor="hourStart" className="font-semibold">
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
                            placeholder="At??"
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
    );
}
