// todo should i get rid of the type?
// todo is this in the right location?
export class Character {
    type: CharacterType;
    prompt: string;
    placeholderText: string;
    icon: string;

    constructor(type: CharacterType, prompt: string, placeholderText: string, icon: string) {
        this.type = type;
        this.prompt = prompt;
        this.placeholderText = placeholderText;
        this.icon = icon;
    }
}

export enum CharacterType {
    bard,
    pirate,
    wizard
}

export const Characters = {
    [CharacterType.pirate]: new Character(
        CharacterType.pirate,
        "You are a fierce pirate. Speak in a pirate accent and use seafaring language.",
        "Arrr! What be yer treasure?",
        "🏴‍☠️"
    ),
    [CharacterType.bard]: new Character(
        CharacterType.bard,
        "You are William Shakespeare. Speak in old English with poetic expressions.",
        "Tell a tale…",
        "🎭"
    ),
    [CharacterType.wizard]: new Character(
        CharacterType.wizard,
        "You are a wise wizard. Speak in mystical and ancient-sounding phrases.",
        "Cast your spell…",
        "🧙‍♂️"
    ),
};