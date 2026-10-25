// 10 Fallback Mystery Story Seeds & Mystery Generation Templates
export const FALLBACK_STORY_SEEDS = [
  {
    id: "seed-1",
    title: "The Last Train to Blackwood",
    premise: "A railway tycoon is found dead in a locked compartment minutes before the train reaches its final station. Every passenger claims they heard the victim speaking after his supposed time of death.",
    setting: "First-Class Carriage of the Blackwood Express, 1934",
    victim: "Silas Vance — ruthless railway tycoon and industrialist",
    environment: "train",
    timeOfDay: "night",
    weather: "storm",
    seedPrompt: "Train mystery where Silas Vance died in a locked compartment. Passengers heard his voice through the door after death due to a phonograph trick or an accomplice."
  },
  {
    id: "seed-2",
    title: "Murder at the Midnight Broadcast",
    premise: "A radio host collapses live on air while announcing a name that was never meant to be heard. The station's recording has a missing eleven-second segment.",
    setting: "Studio 4B, Metro City Radio Tower, 1948",
    victim: "Felix Sterling — controversial late-night investigative host",
    environment: "mansion",
    timeOfDay: "night",
    weather: "rain",
    seedPrompt: "1940s noir radio station murder during a live broadcast with a spliced tape delay and a hidden microphone cable."
  },
  {
    id: "seed-3",
    title: "The Hotel with No Room 13",
    premise: "A guest is found murdered in a room absent from every hotel blueprint. Four people insist they visited the room that night, yet each describes a different interior.",
    setting: "The Grand Oakhaven Hotel, 1928",
    victim: "Arthur Pendelton — eccentric architectural historian",
    environment: "hotel",
    timeOfDay: "night",
    weather: "fog",
    seedPrompt: "Hidden architectural chamber in a vintage grand hotel where sliding false partitions made different visitors see completely different rooms."
  },
  {
    id: "seed-4",
    title: "Death Beneath the Red Curtain",
    premise: "During a sold-out theatre performance, the lead actor dies onstage. The audience applauds, believing the death is part of the play, while someone quietly changes the final scene.",
    setting: "Imperial Playhouse, London West End, 1925",
    victim: "Julian Montgomery — celebrated Shakespearean tragedian",
    environment: "theater",
    timeOfDay: "night",
    weather: "clear",
    seedPrompt: "Stage dagger swapped for a poisoned real prop during Act V of Hamlet, with theatre backstage rivalries and a rewritten cue script."
  },
  {
    id: "seed-5",
    title: "A Toast to the Dead",
    premise: "At an isolated mansion, a wealthy collector dies during a dinner celebrating his own funeral arrangements. Every guest received an identical sealed envelope, but one was opened before dinner.",
    setting: "Dunmore Manor, Scottish Highlands, 1931",
    victim: "Lord Reginald Dunmore — wealthy antiquarian and estate owner",
    environment: "mansion",
    timeOfDay: "night",
    weather: "storm",
    seedPrompt: "Estate banquet where the host staged his own mock funeral, poison placed in the crystal decanter, and an altered inheritance letter."
  },
  {
    id: "seed-6",
    title: "The Photograph from Tomorrow",
    premise: "A private detective is found dead beside a photograph showing all four suspects at the crime scene. The photograph is dated the following day.",
    setting: "Vanguard Darkroom & Photography Studio, 1952",
    victim: "Raymond Cross — cynical private eye and blackmailer",
    environment: "hotel",
    timeOfDay: "dusk",
    weather: "fog",
    seedPrompt: "Darkroom murder where a forged contact sheet and timestamped plate exposed a conspiracy among four blackmail victims."
  },
  {
    id: "seed-7",
    title: "Fog Over Pier Nine",
    premise: "A shipping magnate is discovered dead aboard a vessel that never left the harbour. The ship's log records a fifth passenger, although only four people were aboard.",
    setting: "The SS Sovereign docked at Pier Nine, 1937",
    victim: "Captain Douglas Sterling — ruthless freight cartel owner",
    environment: "ship",
    timeOfDay: "night",
    weather: "fog",
    seedPrompt: "Harbour ship murder enveloped in dense sea fog, phantom passenger entry on the deck log, and smuggled contraband."
  },
  {
    id: "seed-8",
    title: "The Clockmaker's Last Hour",
    premise: "An elderly clockmaker is murdered moments before midnight. Every clock in his workshop stopped at a different time, and each suspect relies on one of them to prove their alibi.",
    setting: "Chronos Horology Workshop, Prague, 1929",
    victim: "Maestro Tobias Vane — master clockmaker and inventor",
    environment: "hotel",
    timeOfDay: "night",
    weather: "rain",
    seedPrompt: "Workshop filled with antique pendulum clocks where the killer wound back specific gears to engineer conflicting alibi timestamps."
  },
  {
    id: "seed-9",
    title: "The Snowbound Confession",
    premise: "During a blizzard, a judge is found dead in a remote lodge. A confession to an unsolved murder lies beside the body, written in the victim's handwriting—but the ink is still wet.",
    setting: "Black Ridge Mountain Lodge, 1941",
    victim: "Justice Horatio Ward — retired supreme court judge",
    environment: "mansion",
    timeOfDay: "night",
    weather: "storm",
    seedPrompt: "Alpine blizzard retreat where a forged confession note was coerced under duress using the judge's personal fountain pen."
  },
  {
    id: "seed-10",
    title: "The Funeral Guest",
    premise: "A notorious crime boss is buried in a sealed coffin. That same night, someone begins sending private messages from his number, revealing secrets only the four mourners could know.",
    setting: "Saint Jude's Crypt & Chapel, 1956",
    victim: "Vincenzo Rossi — syndicate boss supposedly buried at dusk",
    environment: "mansion",
    timeOfDay: "night",
    weather: "rain",
    seedPrompt: "Mausoleum vigil where a conspirator used a scheduled telegraph/pager transmitter to frame the other mourners for his theft."
  }
];

export function getRandomSeed() {
  const index = Math.floor(Math.random() * FALLBACK_STORY_SEEDS.length);
  return FALLBACK_STORY_SEEDS[index];
}
