export type GameMode = "truth-or-dare" | "never-have-i-ever" | "drink-if";
export type Difficulty = "soft" | "party" | "extreme";

export interface Question {
  text: string;
  type?: "truth" | "dare";
}

const truthOrDare: Record<Difficulty, Question[]> = {
  soft: [
    { text: "Jaki jest najbardziej żenujący utwór na Twojej playliście?", type: "truth" },
    { text: "Zrób najlepszą imitację innego gracza.", type: "dare" },
    { text: "Jakie było Twoje ostatnie kłamstwo?", type: "truth" },
    { text: "Pozwól komuś wrzucić story na Twoje social media.", type: "dare" },
    { text: "Jaki jest Twój guilty pleasure serialowy?", type: "truth" },
    { text: "Mów z obcym akcentem przez następne 3 rundy.", type: "dare" },
    { text: "Jakie dziwne połączenie jedzenia potajemnie lubisz?", type: "truth" },
    { text: "Zrób 10 pompek teraz.", type: "dare" },
    { text: "Z kim w tym pokoju zamieniłbyś się życiem?", type: "truth" },
    { text: "Pozwól grupie wybrać Twoje zdjęcie profilowe na 24 godziny.", type: "dare" },
    { text: "Co najbardziej dziecinnego nadal robisz?", type: "truth" },
    { text: "Mów w zwolnionym tempie przez następne 2 minuty.", type: "dare" },
    { text: "Jaki jest Twój najbardziej irracjonalny lęk?", type: "truth" },
    { text: "Przeczytaj dramatycznie ostatnią wiadomość, którą wysłałeś.", type: "dare" },
    { text: "Gdybyś mógł być niewidzialny na jeden dzień, co byś zrobił?", type: "truth" },
    { text: "Jaki jest Twój najgorszy nawyk?", type: "truth" },
    { text: "Zadzwoń do losowego kontaktu i zaśpiewaj 'Sto lat'.", type: "dare" },
    { text: "Czego najbardziej żałujesz w życiu?", type: "truth" },
    { text: "Zrób 20 przysiadów teraz.", type: "dare" },
  ],
  party: [
    { text: "Jak bardzo byłeś kiedyś pijany?", type: "truth" },
    { text: "Wypij shota albo dokończ drinka.", type: "dare" },
    { text: "Z kim tutaj chciałbyś utknąć na bezludnej wyspie?", type: "truth" },
    { text: "Zadzwoń do losowego kontaktu i zaśpiewaj 'Sto lat'.", type: "dare" },
    { text: "Jaka była Twoja najgorsza randka?", type: "truth" },
    { text: "Pozwól komuś przeglądać Twój telefon przez 30 sekund.", type: "dare" },
    { text: "Czy kiedykolwiek kogoś zghostowałeś? Dlaczego?", type: "truth" },
    { text: "Napisz do ex 'tęsknię' teraz.", type: "dare" },
    { text: "Co najbardziej impulsywnego zrobiłeś w życiu?", type: "truth" },
    { text: "Zatańcz TikToka przed wszystkimi.", type: "dare" },
    { text: "Jaki sekret nigdy nikomu tutaj nie powiedziałeś?", type: "truth" },
    { text: "Zamień się ubraniem z osobą po lewej.", type: "dare" },
    { text: "Kto jest Twoim żenującym celebrity crushem?", type: "truth" },
    { text: "Pozwól grupie wysłać wiadomość z Twojego telefonu.", type: "dare" },
    { text: "Jaką największą zasadę złamałeś?", type: "truth" },
    { text: "Zrób serenę osobie naprzeciwko.", type: "dare" },
    { text: "Powiedz najbardziej żenującą rzecz, jaką zrobiłeś na imprezie.", type: "truth" },
  ],
  extreme: [
    { text: "Ile osób było w Twoim życiu intymnym?", type: "truth" },
    { text: "Zatańcz na kolanach wybranej osoby.", type: "dare" },
    { text: "Co najdzikszego zrobiłeś na imprezie?", type: "truth" },
    { text: "Zdejmij jedną część garderoby.", type: "dare" },
    { text: "Do kogo w tym pokoju czujesz największy pociąg?", type: "truth" },
    { text: "Usiądź komuś na kolanach na następne 2 rundy.", type: "dare" },
    { text: "Opisz swój najbardziej żenujący romans.", type: "truth" },
    { text: "Pozwól komuś napisać coś na Twoim ciele markerem.", type: "dare" },
    { text: "Jakie jest najdziwniejsze miejsce, w którym się całowałeś?", type: "truth" },
    { text: "Szepnij coś uwodzicielskiego osobie po prawej.", type: "dare" },
    { text: "Co Cię najbardziej kręci?", type: "truth" },
    { text: "Zatańcz swój najlepszy seksowny taniec przez 30 sekund.", type: "dare" },
    { text: "Czy kiedykolwiek zostałeś przyłapany na czymś niegrzecznym?", type: "truth" },
    { text: "Pozwól komuś zawiązać Ci oczy i nakarmić Cię czymś.", type: "dare" },
    { text: "Jaki jest Twój najbardziej skandaliczny sekret?", type: "truth" },
  ],
};

const czolko: Record<Difficulty, string[]> = {
  soft: [
    "Pizza", "Kot", "Superman", "Piłka nożna", "Gitara",
    "Słoń", "Rower", "Lody", "Księżyc", "Dinozaur",
    "Kanapka", "Basen", "Telefon", "Parasol", "Pociąg",
    "Pingwin", "Helikopter", "Ciastko", "Lustro", "Pirat",
    "Szkoła", "Komputer", "Pajęczyna", "Korona", "Bałwan",
    "Wulkan", "Syrenka", "Robot", "Smok", "Tęcza",
    "Kowboj", "Ninja", "Astronauta", "Jednorożec", "Zombie",
    "Mikrofon", "Trampolina", "Karuzela", "Lodówka", "Rakieta",
  ],
  party: [
    "Kac", "Tinder", "Shotgun", "Karaoke", "Bodyguard",
    "Disco polo", "Jägermeister", "Uber", "Afterparty", "Beer pong",
    "Kebab o 3 w nocy", "Imprezowy autobus", "Szampan", "DJ",
    "VIP lounge", "Barman", "Mojito", "Parkiet taneczny", "Selfie stick",
    "Limuzyna", "Red Bull", "Neon", "Glitter", "Confetti",
    "Striper", "Karaoke bar", "Tequila sunrise", "Piwo kraftowe",
    "Dyskoteka", "Pole dance", "Grill", "Jacuzzi", "Ognisko",
    "Koktajl", "Toast", "Sztos", "Melanż", "Domówka",
    "Basen z kulkami", "Impreza w basenie",
  ],
  extreme: [
    "Kajdanki", "Striptiz", "Kama Sutra", "Bielizna",
    "Masaż erotyczny", "Gorący wosk", "Porno", "Seks telefon",
    "Dominacja", "Bondage", "Fetysz", "Orgasm", "Afrodyzjak",
    "Erotyczny taniec", "Gra wstępna", "Biczyk", "Kostium pokojówki",
    "Opaska na oczy", "Jacuzzi we dwoje", "50 twarzy Greya",
    "Seksowna bielizna", "Wibracje", "Gorąca kąpiel", "Pocałunek francuski",
    "Randka w ciemno", "Love hotel", "Pikantne zdjęcie", "Noc poślubna",
    "Romans w biurze", "Gra w butelkę",
  ],
};

const drinkIf: Record<Difficulty, Question[]> = {
  soft: [
    { text: "Pij, jeśli dzisiaj scrollowałeś social media dłużej niż godzinę." },
    { text: "Pij, jeśli kiedykolwiek zapomniałeś o urodzinach kogoś bliskiego." },
    { text: "Pij, jeśli śpisz z włączonym światłem." },
    { text: "Pij, jeśli kiedykolwiek udawałeś, że nie widzisz kogoś na ulicy." },
    { text: "Pij, jeśli masz więcej niż 1000 nieodczytanych maili." },
    { text: "Pij, jeśli kiedykolwiek gadałeś ze swoim zwierzakiem jak z człowiekiem." },
    { text: "Pij, jeśli zjadłeś dzisiaj śniadanie po 12:00." },
    { text: "Pij, jeśli masz na telefonie więcej niż 3 nieużywane aplikacje." },
    { text: "Pij, jeśli kiedykolwiek powiedziałeś 'jestem w drodze', będąc jeszcze w domu." },
    { text: "Pij, jeśli płakałeś przy filmie Disneya." },
    { text: "Pij, jeśli kiedykolwiek jadłeś coś prosto z garnka." },
    { text: "Pij, jeśli kiedykolwiek wysłałeś wiadomość do złej osoby." },
    { text: "Pij, jeśli śpisz z pluszakiem." },
    { text: "Pij, jeśli kiedykolwiek zgłosiłeś się na ochotnika i potem tego żałowałeś." },
    { text: "Pij, jeśli masz w telefonie screenshoty rozmów." },
  ],
  party: [
    { text: "Pij, jeśli kiedykolwiek tańczyłeś na stole." },
    { text: "Pij, jeśli kiedykolwiek urwał Ci się film na imprezie." },
    { text: "Pij, jeśli kiedykolwiek pocałowałeś kogoś, kogo ledwo znałeś." },
    { text: "Pij, jeśli kiedykolwiek obudziłeś się w ubraniach z poprzedniego dnia." },
    { text: "Pij, jeśli kiedykolwiek zrobiłeś coś żenującego na imprezie." },
    { text: "Pij, jeśli kiedykolwiek pisałeś po pijaku do ex." },
    { text: "Pij, jeśli kiedykolwiek wymiotowałeś od alkoholu." },
    { text: "Pij, jeśli kiedykolwiek wbiłeś się na imprezę bez zaproszenia." },
    { text: "Pij, jeśli kiedykolwiek zgubiłeś telefon na imprezie." },
    { text: "Pij, jeśli kiedykolwiek obudziłeś się i nie pamiętałeś jak wróciłeś do domu." },
    { text: "Pij, jeśli kiedykolwiek mieszałeś drinki i potem tego żałowałeś." },
    { text: "Pij, jeśli kiedykolwiek śpiewałeś karaoke po pijaku." },
    { text: "Pij, jeśli masz na telefonie żenujące zdjęcia z imprezy." },
    { text: "Pij, jeśli kiedykolwiek zrobiłeś coś szalonego na dare." },
    { text: "Pij, jeśli kiedykolwiek ukradłeś coś z baru (np. kieliszek)." },
  ],
  extreme: [
    { text: "Pij, jeśli kiedykolwiek wysłałeś pikantne zdjęcie." },
    { text: "Pij, jeśli masz na telefonie coś, czego nie chciałbyś nikomu pokazać." },
    { text: "Pij, jeśli kiedykolwiek flirtowałeś z kimś, mając partnera." },
    { text: "Pij, jeśli kiedykolwiek miałeś przygodę na jedną noc." },
    { text: "Pij, jeśli kiedykolwiek całowałeś kogoś z tego pokoju." },
    { text: "Pij, jeśli kiedykolwiek korzystałeś z Tindera." },
    { text: "Pij, jeśli kiedykolwiek zrobiłeś coś, o czym nikt w tym pokoju nie wie." },
    { text: "Pij, jeśli kiedykolwiek skłamałeś o swoim statusie związku." },
    { text: "Pij, jeśli kiedykolwiek miałeś romans w pracy." },
    { text: "Pij, jeśli kiedykolwiek kąpałeś się nago z kimś." },
    { text: "Pij, jeśli kiedykolwiek byłeś w sytuacji 'friends with benefits'." },
    { text: "Pij, jeśli kiedykolwiek zrobiłeś coś skandalicznego na wakacjach." },
    { text: "Pij, jeśli kiedykolwiek zdradziłeś partnera." },
    { text: "Pij, jeśli masz sekret, którego nigdy nikomu nie powiesz." },
    { text: "Pij, jeśli kiedykolwiek role-playowałeś." },
  ],
};

export function getQuestions(mode: GameMode, difficulty: Difficulty): Question[] {
  switch (mode) {
    case "truth-or-dare": return [...truthOrDare[difficulty]];
    case "never-have-i-ever": return [];
    case "drink-if": return [...drinkIf[difficulty]];
  }
}

export function getCzolkoWords(difficulty: Difficulty): string[] {
  return [...czolko[difficulty]];
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
