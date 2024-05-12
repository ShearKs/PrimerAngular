export interface PokemonListElement {

    name: string,
    url: string
}
export interface PokemonListCallResponse {

    count: number;
    next: string;
    previous: string;
    results: PokemonListElement[];
}

export interface Pokemon {
    abilities: PokemonAbility[];
    base_experience: number;
    cries: PokemonCry;
    forms: PokemonListElement[];
    height: number;
    id: number;
    is_default: boolean;
    name: string;
    order: number;
    sprites: PokemonSprite;
}

export interface PokemonAbility {
    ability: PokemonListElement;
    is_Hidden: boolean;
    slot: number;
}

export interface PokemonCry {
    latest: string;
    legacy: string;
}

export interface PokemonSprite {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}

// export interface PokemonAbilityAbility {
//     name: string;
//     url: string;
// }