const mongoose = require("mongoose");
require("dotenv").config();

const News = require("./models/News");

const news = [
  {
    title: "Sterke start van de competitie!",
    summary:
      "KSK Beveren is uitstekend gestart met een 4-0 overwinning tegen SK Berlare.",
    content:
      "KSK Beveren is de competitie uitstekend gestart. Op de openingsspeeldag werd SK Berlare met 4-0 verslagen. Bekijk de mooiste momenten van onze eerste competitiewedstrijd.",
    image: "",
    category: "Wedstrijd",
    author: "KSK Beveren",
    publishedAt: new Date("2026-08-30"),
  },

  {
    title: "Gratis inkom tegen SK Berlare",
    summary:
      "Iedereen kon gratis naar de eerste competitiewedstrijd van het seizoen.",
    content:
      "Vanavond is het eindelijk zover: onze eerste competitiewedstrijd van het nieuwe seizoen. Om er samen meteen een mooie voetbalavond van te maken, mocht iedereen gratis binnen.",
    image: "",
    category: "Club",
    author: "KSK Beveren",
    publishedAt: new Date("2026-08-29"),
  },

  {
    title: "Welkom SK Berlare",
    summary:
      "KSK Beveren ontving SK Berlare in de eerste thuismatch van het seizoen.",
    content:
      "In onze eerste thuismatch ontvingen we SK Berlare. De tegenstander werd in het seizoen 2024-2025 kampioen in eerste provinciale.",
    image: "",
    category: "Voorbeschouwing",
    author: "KSK Beveren",
    publishedAt: new Date("2026-08-28"),
  },

  {
    title: "Word peter of meter van een speler",
    summary:
      "Supporters kunnen peter of meter worden van een speler.",
    content:
      "Altijd al een speciale band willen hebben met één van onze spelers? Dan is dit jouw kans. Vanaf nu kan je peter of meter worden van een speler.",
    image: "",
    category: "Club",
    author: "KSK Beveren",
    publishedAt: new Date("2026-08-13"),
  },

  {
    title: "Zondag naar Berchem Sport",
    summary:
      "KSK Beveren speelde een oefenwedstrijd tegen Berchem Sport.",
    content:
      "Zondag stond er een mooie oefenwedstrijd op het programma. KSK Beveren trok naar het Ludo Coeckstadion, de thuisbasis van Berchem Sport.",
    image: "",
    category: "Wedstrijd",
    author: "KSK Beveren",
    publishedAt: new Date("2026-08-13"),
  },

  {
    title: "Crowdfunding Coming Home groot succes!",
    summary:
      "De crowdfundingactie Coming Home van KSK Beveren werd een groot succes.",
    content:
      "De crowdfundingactie Coming Home van KSK Beveren is een groot succes geworden. Dankzij de massale steun van supporters en sympathisanten werd een prachtig bedrag verzameld.",
    image: "",
    category: "Club",
    author: "KSK Beveren",
    publishedAt: new Date("2026-07-15"),
  },
];

async function seedNews() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB verbonden!");

    await News.deleteMany({});

    await News.insertMany(news);

    console.log(`${news.length} nieuwsartikels toegevoegd!`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Fout:", error);
    process.exit(1);
  }
}

seedNews();