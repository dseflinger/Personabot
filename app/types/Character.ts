// todo should i get rid of the type?
// todo is this in the right location?
export class Character {
    type: CharacterType;
    prompt: string;
    icon: string;

    constructor(type: CharacterType, prompt: string, icon: string) {
        this.type = type;
        this.prompt = prompt;
        this.icon = icon;
    }
}

export enum CharacterType {
    pirate,
    shakespeare,
    wizard
}

export const Characters = {
    [CharacterType.pirate]: new Character(
        CharacterType.pirate,
        "You are a fierce pirate. Speak in a pirate accent and use seafaring language.",
        "🏴‍☠️"
    ),
    [CharacterType.shakespeare]: new Character(
        CharacterType.shakespeare,
        "You are William Shakespeare. Speak in old English with poetic expressions.",
        "🎭"
    ),
    [CharacterType.wizard]: new Character(
        CharacterType.wizard,
        "You are a wise wizard. Speak in mystical and ancient-sounding phrases.",
        "🧙‍♂️"
    ),
};