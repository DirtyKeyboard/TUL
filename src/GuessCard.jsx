import React from "react";

const GuessCard = ({ guess, correct }) => {
    console.log(guess);
    const sortSpeed = () => {
        let correctSpeed = -1;
        let guessSpeed = -1;

        switch (correct.data.speed) {
            case "Very slow":
                correctSpeed = 0;
                break;
            case "Slow":
                correctSpeed = 1;
                break;
            case "Average":
                correctSpeed = 2;
                break;
            case "Fast":
                correctSpeed = 3;
                break;
            case "Very fast":
                correctSpeed = 4;
                break;
            case "Insanely fast":
                correctSpeed = 5;
                break;
        }

        switch (guess.data.speed) {
            case "Very slow":
                guessSpeed = 0;
                break;
            case "Slow":
                guessSpeed = 1;
                break;
            case "Average":
                guessSpeed = 2;
                break;
            case "Fast":
                guessSpeed = 3;
                break;
            case "Very fast":
                guessSpeed = 4;
                break;
            case "Insanely fast":
                guessSpeed = 5;
                break;
        }

        if (correctSpeed === guessSpeed) {
            return "";
        } else if (correctSpeed > guessSpeed) {
            return "↑";
        } else return "↓";
    };
    const sortKnockback = () => {
        let correctKnockbackNumber = -1;
        let guessKnockbackNumber = -1;
        switch (correct.data.knockback.toLowerCase()) {
            case "no knockback":
                correctKnockbackNumber = 0;
                break;
            case "extremely weak":
                correctKnockbackNumber = 1;
                break;
            case "very weak":
                correctKnockbackNumber = 2;
                break;
            case "weak":
                correctKnockbackNumber = 3;
                break;
            case "average":
                correctKnockbackNumber = 4;
                break;
            case "strong":
                correctKnockbackNumber = 5;
                break;
            case "very strong":
                correctKnockbackNumber = 6;
                break;
            case "extremely strong":
                correctKnockbackNumber = 7;
                break;
            case "insane":
                correctKnockbackNumber = 8;
                break;
        }

        switch (guess.data.knockback.toLowerCase()) {
            case "no knockback":
                guessKnockbackNumber = 0;
                break;
            case "extremely weak":
                guessKnockbackNumber = 1;
                break;
            case "very weak":
                guessKnockbackNumber = 2;
                break;
            case "weak":
                guessKnockbackNumber = 3;
                break;
            case "average":
                guessKnockbackNumber = 4;
                break;
            case "strong":
                guessKnockbackNumber = 5;
                break;
            case "very strong":
                guessKnockbackNumber = 6;
                break;
            case "extremely strong":
                guessKnockbackNumber = 7;
                break;
            case "insane":
                guessKnockbackNumber = 8;
                break;
        }
        if (guessKnockbackNumber === correctKnockbackNumber) {
            return "";
        } else if (guessKnockbackNumber > correctKnockbackNumber) {
            return "↓";
        } else {
            return "↑";
        }
    };

    const sortRarity = () => {
        if (parseInt(guess.data.rarity) === parseInt(correct.data.rarity)) {
            return "";
        } else if (parseInt(guess.data.rarity) < parseInt(correct.data.rarity))
            return "↑";
        else return "↓";
    };

    const compareObtainedMethods = () => {
        if (guess.data.obtained.length === 2) {
            if (
                guess.data.obtained[0] === "Buy" &&
                correct.data.obtained[0] === "Buy"
            ) {
                if (
                    guess.data.obtained[1] === "Chest" &&
                    correct.data.obtained[1] === "Chest"
                )
                    return 2;
                else if (
                    guess.data.obtained[1] === "Crafting" &&
                    correct.data.obtained[1] === "Crafting"
                )
                    return 2;
            } else if (
                guess.data.obtained[0] === "Chest" &&
                correct.data.obtained[0] === "Chest" &&
                guess.data.obtained[1] === "Crafting" &&
                correct.data.obtained[1] === "Crafting"
            )
                return 2;
            else if (
                guess.data.obtained[0] === "Drop" &&
                correct.data.obtained[0] === "Drop" &&
                guess.data.obtained[1] === "Crafting" &&
                correct.data.obtained[1] === "Crafting"
            )
                return 2;
            else return 0;
        } else {
            if (
                guess.data.obtained[0] === correct.data.obtained[0] ||
                guess.data.obtained[0] === correct.data.obtained[1]
            )
                return 1;
        }
    };

    return (
        <div className="flex gap-4">
            <div className="h-20 w-24 border border-black bg-[#3b3b3b4d] flex items-center justify-center">
                <img src={`weapons/${guess.data.id}.png`} />
            </div>
            <div
                className={`h-20 w-24 border border-black ${
                    guess.data.damageType === correct.data.damageType
                        ? "bg-green-500"
                        : "bg-red-500"
                } flex items-center justify-center`}
            >
                <h1 className="text-white">{guess.data.damageType}</h1>
            </div>
            <div
                className={`h-20 w-24 border border-black ${
                    guess.data.damage === correct.data.damage
                        ? "bg-green-500"
                        : "bg-red-500"
                } flex items-center justify-center`}
            >
                <h1 className="text-white">
                    {guess.data.damage}{" "}
                    {parseInt(guess.data.damage) > parseInt(correct.data.damage)
                        ? "↓"
                        : parseInt(guess.data.damage) ===
                          parseInt(correct.data.damage)
                        ? null
                        : "↑"}
                </h1>
            </div>
            <div
                className={`h-20 w-24 border border-black ${
                    guess.data.knockback === correct.data.knockback
                        ? "bg-green-500"
                        : "bg-red-500"
                } flex items-center justify-center`}
            >
                <h1 className="text-white text-sm">
                    {guess.data.knockback} {sortKnockback()}
                </h1>
            </div>
            <div
                className={`h-20 w-24 border border-black ${
                    guess.data.speed === correct.data.speed
                        ? "bg-green-500"
                        : "bg-red-500"
                } flex items-center justify-center`}
            >
                <h1 className="text-white">
                    {guess.data.speed} {sortSpeed()}
                </h1>
            </div>
            <div
                className={`h-20 w-24 border border-black ${
                    guess.data.rarity === correct.data.rarity
                        ? "bg-green-500"
                        : "bg-red-500"
                } flex items-center justify-center`}
            >
                <img src={`rarity/${guess.data.rarity}.png`} />{" "}
                <h1 className="text-white ml-1">{sortRarity()}</h1>
            </div>
            <div
                className={`h-20 w-24 border border-black ${
                    guess.data.autoswing === correct.data.autoswing
                        ? "bg-green-500"
                        : "bg-red-500"
                } flex items-center justify-center`}
            >
                <h1 className="text-white">
                    {guess.data.autoswing ? "Yes" : " No"}
                </h1>
            </div>
            <div
                className={`h-20 w-24 border border-black ${
                    guess.data.material === correct.data.material
                        ? "bg-green-500"
                        : "bg-red-500"
                } flex items-center justify-center`}
            >
                <h1 className="text-white">
                    {guess.data.material ? "Yes" : "No"}
                </h1>
            </div>
            {correct.data.obtained.length === 1 ? (
                <div
                    className={`h-20 w-24 border border-black ${
                        correct.data.obtained[0] === guess.data.obtained[0]
                            ? "bg-green-500"
                            : "bg-red-500"
                    } flex items-center justify-center`}
                >
                    <h1 className="text-white">
                        {guess.data.obtained.length === 1
                            ? guess.data.obtained[0]
                            : guess.data.obtained[0] +
                              "/" +
                              guess.data.obtained[1]}
                    </h1>
                </div>
            ) : (
                <div
                    className={`h-20 w-24 border border-black ${
                        compareObtainedMethods() === 2
                            ? "bg-green-500"
                            : compareObtainedMethods() === 1
                            ? "bg-orange-500"
                            : "bg-red-500"
                    } flex items-center justify-center`}
                >
                    <h1 className="text-white">
                        {guess.data.obtained.length === 1
                            ? guess.data.obtained[0]
                            : guess.data.obtained[0] +
                              "/" +
                              guess.data.obtained[1]}
                    </h1>
                </div>
            )}
        </div>
    );
};

export default GuessCard;
