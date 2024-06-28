import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { weaponData as w } from "./weapons";
import terradle from "./assets/logo.png";
import coin from "./assets/images/weapons_hint/selling_price_hint.png";
import tooltip from "./assets/images/weapons_hint/tooltip_hint.png";
import imageHint from "./assets/images/weapons_hint/image_hint.png";
import play from "./assets/images/playbutton.png";
import GuessCard from "./GuessCard";

function App() {
    const [weaponData, setWeaponData] = React.useState(w);
    const [guesses, setGuesses] = React.useState([]);
    const [tries, setTries] = React.useState(0);
    const [value, setValue] = React.useState("");
    const [weapon, setWeapon] = React.useState(null);
    const [suggestion, setSuggestion] = React.useState([]);
    const [hint, setHint] = React.useState({
        price: false,
        tooltip: false,
        image: false,
        censoredTooltip: "No tooltip",
    });

    const togglePrice = () => {
        setHint({ ...hint, price: !hint.price });
    };

    const toggleTooltip = () => {
        setHint({ ...hint, tooltip: !hint.tooltip });
    };

    const toggleImage = () => {
        setHint({ ...hint, image: !hint.image });
    };

    function generateRandom() {
        return Math.floor(Math.random() * weaponData.length);
    }

    function searchWeapon() {
        const ret = [];
        let items = 0;
        weaponData.forEach((el) => {
            if (
                el.data.name.toLowerCase().includes(value.toLowerCase()) &&
                items < 3
            ) {
                ret.push(el);
                items++;
            }
        });
        return ret;
    }

    function searchArray(searchArray) {
        const ret = [];
        let items = 0;
        searchArray.forEach((el) => {
            if (
                el.data.name.toLowerCase().includes(value.toLowerCase()) &&
                items < 3
            ) {
                ret.push(el);
                items++;
            }
        });
        return ret;
    }

    React.useEffect(() => {
        const wep = weaponData[generateRandom()];
        setWeapon(wep);
        if (typeof wep.data.tooltip === "object") {
            let ret = "";
            const w = wep.data.tooltip[0].split(" ");
            w.forEach((el) => {
                ret = ret.concat(el.substring(0, 3));
                if (el.substring(3).length > 0)
                    for (let i = 0; i < el.substring(3).length; i++)
                        ret = ret.concat("-");
                ret = ret.concat(" ");
            });
            setHint({ ...hint, censoredTooltip: ret });
        }
    }, []);
    React.useEffect(() => {
        setSuggestion(searchWeapon);
    }, [value]);

    const submitGuess = () => {
        if (suggestion.length === 1) {
            if (suggestion[0].data.name === weapon.data.name) {
                alert(
                    "You got it! The weapon was the " +
                        weapon.data.name +
                        ". You got it on attempt number " +
                        tries +
                        "."
                );
                window.location.reload();
            }
            setGuesses([...guesses, suggestion[0]]);
            setValue("");
            setWeaponData(weaponData.filter((el) => el !== suggestion[0]));
            setTries(tries + 1);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col items-center gap-4 pt-4 w-[100%] h-[100%]">
                <img src={terradle} className="w-80 mb-4" />
                <div>
                    <div className="bg-[#202747] rounded-3xl border border-black px-4 pb-4">
                        <h1 className="text-white text-2xl bg-[#495EAB] border border-black p-2 rounded-3xl -translate-y-5 text-center">
                            Guess the weapon!
                        </h1>
                        <div className="flex flex-col gap-2">
                            <button
                                className="text-white bg-[#25305D] border border-black rounded-xl hover:bg-[#354175]"
                                onClick={() => {
                                    alert(
                                        "You lose! The mystery weapon was: " +
                                            weapon.data.name +
                                            ". You threw the towel in at attempt number " +
                                            tries +
                                            "."
                                    );
                                    window.location.reload();
                                }}
                            >
                                Give Up ❌
                            </button>
                            <div className="flex gap-2">
                                <div
                                    className="flex flex-col items-center justify-center text-center bg-[#25305D] border border-black rounded-xl w-[100px] h-[80px] hover:bg-[#354175] hover:cursor-pointer"
                                    onClick={() => {
                                        if (tries >= 3) togglePrice();
                                        else
                                            toast.error(
                                                "You can only show the price after 3 attempts."
                                            );
                                    }}
                                >
                                    <img src={coin} />
                                    <h1 className="text-white text-sm">
                                        {tries < 3 ? (
                                            `Selling price in ${
                                                3 - tries
                                            } tries`
                                        ) : hint.price ? (
                                            <span>
                                                Sell price:{" "}
                                                <span className="text-yellow-500">
                                                    {weapon.data.sell}
                                                </span>
                                            </span>
                                        ) : (
                                            "Click to reveal"
                                        )}
                                    </h1>
                                </div>
                                <div
                                    className="flex flex-col items-center justify-center text-center bg-[#25305D] border border-black rounded-xl w-[100px] h-[80px] hover:bg-[#354175] hover:cursor-pointer"
                                    onClick={() => {
                                        if (tries >= 7) toggleTooltip();
                                        else
                                            toast.error(
                                                "You can only show the tooltip after 7 attempts."
                                            );
                                    }}
                                >
                                    {hint.tooltip ? null : (
                                        <img src={tooltip} />
                                    )}
                                    <h1
                                        className={`text-white ${
                                            hint.tooltip ? "text-xs" : "text-sm"
                                        }`}
                                    >
                                        {tries < 7
                                            ? `Tooltip in ${7 - tries} tries`
                                            : hint.tooltip
                                            ? hint.censoredTooltip
                                            : "Click to reveal"}
                                    </h1>
                                </div>
                                <div
                                    className="flex flex-col items-center justify-center text-center bg-[#25305D] border border-black rounded-xl w-[100px] h-[80px] hover:bg-[#354175] hover:cursor-pointer"
                                    onClick={() => {
                                        if (tries >= 11) toggleImage();
                                        else
                                            toast.error(
                                                "You can only show the image after 11 attempts."
                                            );
                                    }}
                                >
                                    <img
                                        src={
                                            hint.image
                                                ? `weapons/${weapon.data.id}.png`
                                                : imageHint
                                        }
                                        className={
                                            hint.image ? "blur-[3.5px]" : null
                                        }
                                    />
                                    <h1 className="text-white text-sm">
                                        {tries < 11
                                            ? `Image in ${11 - tries} tries`
                                            : hint.image
                                            ? null
                                            : "Click to reveal"}
                                    </h1>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    className="w-full rounded-lg h-8 px-2 text-white text-xl bg-[#2C3A74] border border-[#3D529B]"
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.code === "Enter") {
                                            submitGuess();
                                        }
                                    }}
                                />

                                <img
                                    src={play}
                                    className="h-8 w-8 rounded-lg bg-[#2C3A74] border border-[#3D529B] hover:cursor-pointer hover:bg-[#3d51a0] transition-all ease-in-out"
                                    onClick={submitGuess}
                                />
                            </div>
                            {suggestion.length > 0 ? (
                                <div className="text-white flex flex-col gap-2">
                                    {suggestion.map((el) => {
                                        return (
                                            <div
                                                className="hover:cursor-pointer hover:bg-[#354175] px-2 rounded-xl flex gap-2"
                                                key={el.data.id}
                                                onClick={() => {
                                                    setGuesses([
                                                        ...guesses,
                                                        el,
                                                    ]);
                                                    if (
                                                        el.data.name ===
                                                        weapon.data.name
                                                    ) {
                                                        alert(
                                                            "You got it! The weapon was the " +
                                                                weapon.data
                                                                    .name +
                                                                ". You got it on attempt number " +
                                                                tries +
                                                                "."
                                                        );
                                                        window.location.reload();
                                                    }
                                                    setValue("");
                                                    setWeaponData(
                                                        weaponData.filter(
                                                            (filterEl) =>
                                                                filterEl !== el
                                                        )
                                                    );
                                                    setSuggestion(
                                                        searchArray(
                                                            weaponData.filter(
                                                                (filterEl) =>
                                                                    filterEl !==
                                                                    el
                                                            )
                                                        )
                                                    );
                                                    setTries(tries + 1);
                                                }}
                                            >
                                                <div className="w-8 h-8">
                                                    <img
                                                        src={`weapons/${el.data.id}.png`}
                                                        className="w-fit"
                                                    />
                                                </div>
                                                <h1>{el.data.name}</h1>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                {guesses.length > 0 ? (
                    <div className="mt-8 flex flex-col">
                        <div className="flex gap-12 mb-4 bg-gray-900 items-center justify-center">
                            {[
                                "Item",
                                "Damage Type",
                                "Damage",
                                "Knockback",
                                "Speed",
                                "Rarity",
                                "Autoswing",
                                "Material",
                                "Obtained",
                            ].map((el) => (
                                <h1
                                    key={[
                                        "Item",
                                        "Damage Type",
                                        "Damage",
                                        "Knockback",
                                        "Speed",
                                        "Rarity",
                                        "Autoswing",
                                        "Material",
                                        "Obtained",
                                    ].indexOf(el)}
                                    className="text-xl text-white"
                                >
                                    {el}
                                </h1>
                            ))}
                        </div>
                        <div className="flex flex-col-reverse gap-4 mb-8">
                            {guesses.map((el) => (
                                <GuessCard
                                    key={guesses.indexOf(el)}
                                    guess={el}
                                    correct={weapon}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default App;
