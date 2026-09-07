const mongoose = require("mongoose");
require("dotenv").config();

const Player = require("./models/Player");

const players = [
  {
    firstName: "Jarl",
    lastName: "Hautekeete",
    position: "Doelman",
    number: 1,
    birthDate: new Date("1998-04-12"),
    image: "jarl",
    bio: "Vaste nummer 1 tussen de palen, bekend om zijn rust in de opbouw en sterke reflexen bij één-tegen-ééns.",
  },
  {
    firstName: "Mauro",
    lastName: "Van Goethem",
    position: "Doelman",
    number: 12,
    birthDate: new Date("2003-09-18"),
    image: "mauro",
    bio: "Tweede doelman die stevig doorgroeit en bij elke kans die hij krijgt laat zien klaar te zijn voor meer speeltijd.",
  },
  {
    firstName: "Sander",
    lastName: "Bellemans",
    position: "Doelman",
    number: 30,
    birthDate: new Date("2006-01-15"),
    image: "sander",
    bio: "Jongste doelman van de kern, traint mee met de eerste ploeg en ontwikkelt zich elk seizoen zichtbaar.",
  },

  {
    firstName: "Samuell",
    lastName: "Kassels",
    position: "Verdediger",
    number: 2,
    birthDate: new Date("2000-05-22"),
    image: "samuell",
    bio: "Rechtsachter met veel loopvermogen, komt graag mee naar voren over de flank.",
  },
  {
    firstName: "Mike",
    lastName: "Smet",
    position: "Verdediger",
    number: 3,
    birthDate: new Date("1991-03-06"),
    image: "mike",
    bio: "Ervaren rot in de verdediging en informele leider van de defensie, speelt al jaren voor de club.",
  },
  {
    firstName: "Emmanuel",
    lastName: "Griffioen",
    position: "Verdediger",
    number: 4,
    birthDate: new Date("1994-11-08"),
    image: "emmanuel",
    bio: "Centrale verdediger die sterk is in de duels en de laatste lijn georganiseerd houdt.",
  },
  {
    firstName: "Dylan",
    lastName: "Van Camp",
    position: "Verdediger",
    number: 5,
    birthDate: new Date("2002-03-27"),
    image: "dylan",
    bio: "Flexibele verdediger die zowel centraal als op de flank kan uitpakken.",
  },
  {
    firstName: "Moussa",
    lastName: "Mbaye El Hadji",
    position: "Verdediger",
    number: 13,
    birthDate: new Date("1999-07-19"),
    image: "moussa",
    bio: "Fysiek sterke verdediger die kopbalduels zelden verliest en rust brengt in de defensie.",
  },
  {
    firstName: "Robbe",
    lastName: "Broeckaert",
    position: "Verdediger",
    number: 15,
    birthDate: new Date("2004-02-27"),
    image: "fil_geenfoto",
    bio: "Jong talent dat afgelopen seizoen doorstroomde vanuit de jeugd en zich snel aanpaste aan het eerste elftal.",
  },
  {
    firstName: "Ward",
    lastName: "Huygens",
    position: "Verdediger",
    number: 20,
    birthDate: new Date("1997-10-03"),
    image: "ward",
    bio: "Linksachter met een goed passeerspel, vaak de starter van de aanvallen vanuit eigen zestien.",
  },
  {
    firstName: "Niels",
    lastName: "De Pauw",
    position: "Verdediger",
    number: 21,
    birthDate: new Date("1996-01-19"),
    image: "fil_geenfoto",
    bio: "Verdediger die vooral uitblinkt in de duels en zelden zijn directe tegenstander laat lopen.",
  },
  {
    firstName: "Arno",
    lastName: "De Kuyffer",
    position: "Verdediger",
    number: 23,
    birthDate: new Date("2001-08-14"),
    image: "arno",
    bio: "Veelzijdige verdediger die inzetbaar is op meerdere linies achterin.",
  },

  {
    firstName: "Zakaria",
    lastName: "Benjouhra",
    position: "Middenvelder",
    number: 6,
    birthDate: new Date("1998-12-05"),
    image: "fil_geenfoto",
    bio: "Verdedigende middenvelder die het meeste vuile werk opknapt en de ploeg balans geeft.",
  },
  {
    firstName: "Jean Danick",
    lastName: "Tchang",
    position: "Middenvelder",
    number: 8,
    birthDate: new Date("2000-03-17"),
    image: "jean",
    bio: "Box-to-box middenvelder met een uitstekende conditie, overal op het veld te vinden.",
  },
  {
    firstName: "Cédric",
    lastName: "Praet",
    position: "Middenvelder",
    number: 10,
    birthDate: new Date("2003-06-16"),
    image: "cedric",
    bio: "De creatieve spelverdeler van de ploeg, geeft de meeste assists en heeft een uitstekend overzicht.",
  },
  {
    firstName: "Warre",
    lastName: "Ponnet",
    position: "Middenvelder",
    number: 14,
    birthDate: new Date("2001-12-26"),
    image: "warre",
    bio: "Middenvelder die sterk is in de duels en de tegenstander graag onder druk zet.",
  },
  {
    firstName: "Raphael",
    lastName: "Holzhauser",
    position: "Middenvelder",
    number: 16,
    birthDate: new Date("1990-02-14"),
    image: "raphael",
    bio: "Meest ervaren speler van de kern, brengt rust en klasse op het middenveld.",
  },
  {
    firstName: "Mathias",
    lastName: "Pijl",
    position: "Middenvelder",
    number: 17,
    birthDate: new Date("2002-09-09"),
    image: "mathias",
    bio: "Dynamische middenvelder die het spel graag versnelt met een goede eerste pass.",
  },
  {
    firstName: "Emiel",
    lastName: "De Schepper",
    position: "Middenvelder",
    number: 18,
    birthDate: new Date("2002-03-05"),
    image: "emiel",
    bio: "Werkt hard voor de ploeg en is altijd inzetbaar op verschillende posities op het middenveld.",
  },
  {
    firstName: "Seppe",
    lastName: "Troch",
    position: "Middenvelder",
    number: 19,
    birthDate: new Date("1996-04-25"),
    image: "seppe",
    bio: "Ervaren middenvelder met een goed schot van afstand, gevaarlijk bij vrije trappen.",
  },
  {
    firstName: "Muhammad",
    lastName: "Al Hanji",
    position: "Middenvelder",
    number: 22,
    birthDate: new Date("2001-01-30"),
    image: "muhammad",
    bio: "Technisch onderlegde middenvelder die goed is in kleine ruimtes.",
  },
  {
    firstName: "Sami",
    lastName: "Kandil",
    position: "Middenvelder",
    number: 24,
    birthDate: new Date("2005-02-17"),
    image: "fil_geenfoto",
    bio: "Jong talent met veel dynamiek, groeit met de week mee in het eerste elftal.",
  },
  {
    firstName: "Adam",
    lastName: "Tounsi",
    position: "Middenvelder",
    number: 25,
    birthDate: new Date("2005-05-14"),
    image: "adam",
    bio: "Een van de jongste spelers van de kern, maakt indruk met zijn inzet en leergierigheid.",
  },
  {
    firstName: "Gabriel Rocha",
    lastName: "Quissonge",
    position: "Middenvelder",
    number: 26,
    birthDate: new Date("1999-10-21"),
    image: "fil_geenfoto",
    bio: "Middenvelder met een uitstekende balcontrole, houdt de bal graag aan de voet.",
  },

  {
    firstName: "Yentl",
    lastName: "Van De Velde",
    position: "Aanvaller",
    number: 7,
    birthDate: new Date("1995-11-23"),
    image: "yentl",
    bio: "Snelle buitenspeler die met zijn acties voor overtal zorgt en veel kansen creëert.",
  },
  {
    firstName: "Jean-Baptist",
    lastName: "Monden",
    position: "Aanvaller",
    number: 9,
    birthDate: new Date("2004-01-21"),
    image: "jean-baptist",
    bio: "Vaste spits van de ploeg, koel voor doel en de topschutter van het voorbije seizoen.",
  },
  {
    firstName: "Yannick",
    lastName: "Braem",
    position: "Aanvaller",
    number: 11,
    birthDate: new Date("1997-03-08"),
    image: "yannick",
    bio: "Aanvaller met een goede neus voor de kleine ruimte en een sterke afwerking in het zestienmetergebied.",
  },
  {
    firstName: "Victor",
    lastName: "Zaman",
    position: "Aanvaller",
    number: 27,
    birthDate: new Date("2003-12-02"),
    image: "victor",
    bio: "Explosieve aanvaller die graag één-op-één gaat met zijn tegenstander.",
  },
  {
    firstName: "Milan",
    lastName: "Roelandt",
    position: "Aanvaller",
    number: 29,
    birthDate: new Date("2006-06-19"),
    image: "milan",
    bio: "Jongste speler van de kern, een aanvaller met veel potentieel die zich verder ontwikkelt bij de eerste ploeg.",
  },
];

async function seedPlayers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB verbonden!");

    await Player.deleteMany({});

    await Player.insertMany(players);

    console.log(`${players.length} spelers toegevoegd!`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Fout:", error);
    process.exit(1);
  }
}

seedPlayers();