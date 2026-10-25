// Pre-built rich offline playable cases for fallback and instant offline play
export const OFFLINE_CASES = [
  {
    id: "case-toast-to-the-dead",
    title: "A Toast to the Dead",
    setting: "Dunmore Manor, Scottish Highlands, Autumn 1931",
    victim: "Lord Reginald Dunmore — wealthy collector and industrialist",
    summary: "At an isolated estate during a torrential storm, Lord Dunmore hosted a bizarre banquet to celebrate his own funeral arrangements. Moments after proposing a toast from his private vintage, he collapsed. Every guest received an identical sealed envelope containing an inheritance codicil, but one envelope had been sliced open and resealed before dinner.",
    truth: "Mr. Harold Fitch, the family solicitor, poisoned the crystal decanter after Lord Dunmore discovered Fitch had embezzled the estate's trust fund. Fitch tampered with the will envelope to substitute an earlier draft naming himself trustee.",
    culpritId: "s4",
    visual: {
      environment: "mansion",
      timeOfDay: "night",
      weather: "storm",
      palette: {
        sky: "#0c0d18",
        building: "#1c1e2e",
        accent: "#d4a030"
      }
    },
    suspects: [
      {
        id: "s1",
        name: "Lady Eleanor Hartwood",
        role: "The Estranged Sister",
        look: {
          skin: "#e8c8a8",
          hairStyle: "updo",
          hairColor: "#7a6a58",
          outfitColor: "#3a2d52",
          accessory: "earrings"
        },
        motive: "Was about to be cut out of the Dunmore inheritance entirely.",
        secret: "She sneaked into the cellar to steal back her mother's diamond necklace before the reading.",
        alibi: "Claimed she was admiring the family portraits in the north gallery from 8:15 to 8:45 PM.",
        cannedReply: "Reginald was impossible, darling, but I am an aristocrat, not a poisoner! I was admiring our grandmother's portrait in the north gallery when the gong struck.",
        cannedMood: "smug"
      },
      {
        id: "s2",
        name: "Dr. Arthur Crane",
        role: "The Personal Physician",
        look: {
          skin: "#deb896",
          hairStyle: "short",
          hairColor: "#4a3c2a",
          outfitColor: "#1d3e52",
          accessory: "glasses"
        },
        motive: "Lord Dunmore was threatening to report him to the Medical Board for prescribing banned narcotics.",
        secret: "He administered a mild sedative to Dunmore earlier that afternoon to prevent a public scandal.",
        alibi: "Was in the library reading medical journals until the dinner bell.",
        cannedReply: "I examined Reginald's wine glass immediately. The scent of bitter almond was unmistakable. My medical kit was locked in my carriage all evening!",
        cannedMood: "nervous"
      },
      {
        id: "s3",
        name: "Miss Iris Vane",
        role: "The Investigative Journalist",
        look: {
          skin: "#f2d6b3",
          hairStyle: "bob",
          hairColor: "#8b2500",
          outfitColor: "#784a1e",
          accessory: "scarf"
        },
        motive: "Hunting for Lord Dunmore's private ledger detailing wartime bribery.",
        secret: "She bribed the butler to give her the key to Dunmore's private study.",
        alibi: "Was on the terrace smoking a cigarette and observing the thunderstorm.",
        cannedReply: "I had pen and paper in hand all evening. I came for a headline about Dunmore's financial syndicate, not a murder scene!",
        cannedMood: "neutral"
      },
      {
        id: "s4",
        name: "Mr. Harold Fitch",
        role: "The Estate Solicitor",
        look: {
          skin: "#c89d7c",
          hairStyle: "bald",
          hairColor: "#222222",
          outfitColor: "#2e2e38",
          accessory: "mustache"
        },
        motive: "Dunmore had discovered a £40,000 shortfall in the estate accounts and demanded an audit the next morning.",
        secret: "He brought cyanide from his own garden shed and broke into the dining hall during the cocktail hour.",
        alibi: "Claims he was in the drawing room drafting notes on the will with the door closed.",
        cannedReply: "My books are pristine! Lord Dunmore and I were in total agreement. I drafted every clause of his testamentary deed with the utmost professional devotion.",
        cannedMood: "angry"
      }
    ]
  },
  {
    id: "case-last-train-to-blackwood",
    title: "The Last Train to Blackwood",
    setting: "First-Class Carriage of the Blackwood Express, 1934",
    victim: "Silas Vance — ruthless railway tycoon and industrialist",
    summary: "Silas Vance was discovered dead inside his locked private Pullman compartment minutes before arriving at Blackwood Junction. All four suspects swore they heard Vance shouting angrily through the door at 9:45 PM, but the autopsy confirms he died nearly an hour earlier. A portable dictaphone was found under the velvet seat cushion.",
    truth: "Conductor Thomas Rigby conspired with Silas Vance's former business partner. Rigby planted a recorded phonograph wax cylinder to play Vance's voice on a timer at 9:45 PM while he was on the platform, establishing an airtight alibi for when Vance actually died at 8:50 PM.",
    culpritId: "s1",
    visual: {
      environment: "train",
      timeOfDay: "night",
      weather: "storm",
      palette: {
        sky: "#0a0c14",
        building: "#1b2230",
        accent: "#3db9c0"
      }
    },
    suspects: [
      {
        id: "s1",
        name: "Thomas Rigby",
        role: "Train Conductor",
        look: {
          skin: "#deb896",
          hairStyle: "short",
          hairColor: "#333333",
          outfitColor: "#1a2c42",
          accessory: "hat"
        },
        motive: "Vance had fired Rigby's son and refused a pension after a deadly workshop fire.",
        secret: "Possesses the master key to all Pullman compartments and smuggled a wax cylinder recorder aboard.",
        alibi: "Punching tickets in third class at 9:45 PM when passengers reported hearing Vance.",
        cannedReply: "I was punching tickets in coach when everyone heard Mr. Vance hollering at 9:45! Ask any passenger back in car four—they all saw me!",
        cannedMood: "nervous"
      },
      {
        id: "s2",
        name: "Clara Beaumont",
        role: "Disinherited Heiress",
        look: {
          skin: "#f2d6b3",
          hairStyle: "updo",
          hairColor: "#402010",
          outfitColor: "#4a2238",
          accessory: "earrings"
        },
        motive: "Vance bought out her family's railway shares through hostile foreclosure.",
        secret: "She carried a pistol in her evening purse with the intention of threatening Vance.",
        alibi: "Sipping tea in the dining car with Madame Dupree until 9:30 PM.",
        cannedReply: "I detested Silas Vance with all my soul, but shooting him through a locked compartment keyhole? I was in the dining car finishing my tea.",
        cannedMood: "angry"
      },
      {
        id: "s3",
        name: "Julian Cross",
        role: "Vance's Personal Secretary",
        look: {
          skin: "#e8c8a8",
          hairStyle: "slick",
          hairColor: "#222222",
          outfitColor: "#283438",
          accessory: "glasses"
        },
        motive: "Facing embezzlement charges over railway bond commissions.",
        secret: "He shredded financial ledgers and flushed them into the train lavatory at 9:15 PM.",
        alibi: "Typing telegrams in the baggage compartment from 8:30 PM onward.",
        cannedReply: "Mr. Vance had me typing dispatches until my knuckles bled. I heard him yell at someone at 9:45 through the partition, clear as day!",
        cannedMood: "neutral"
      },
      {
        id: "s4",
        name: "Madame Celeste Dupree",
        role: "Stage Medium & Clairvoyant",
        look: {
          skin: "#c89d7c",
          hairStyle: "long",
          hairColor: "#111111",
          outfitColor: "#3e1c4e",
          accessory: "scarf"
        },
        motive: "Vance threatened to expose her psychic séances as fraudulent trickery in the morning papers.",
        secret: "She eavesdropped outside Vance's door at 8:45 PM and heard a choking noise, but fled in terror.",
        alibi: "Dining car reading tarot cards for passengers from 9:00 PM to 10:00 PM.",
        cannedReply: "The spirits whispered of cold iron and betrayal long before we passed the junction! Silas Vance had a black aura, but I stayed in the dining coach.",
        cannedMood: "smug"
      }
    ]
  },
  {
    id: "case-death-beneath-red-curtain",
    title: "Death Beneath the Red Curtain",
    setting: "Imperial Playhouse, London West End, 1925",
    victim: "Julian Montgomery — celebrated Shakespearean tragedian",
    summary: "During Act V of Hamlet before a packed house, lead actor Julian Montgomery collapsed after the climactic duel. The audience cheered at his realism until the curtain fell and crimson blood pooled on the stage floor. The prop combat rapier had been replaced with a razor-sharp poisoned blade, and the backstage cue book was found missing page 42.",
    truth: "Vincent Sterling, the envious understudy who stood in the stage wings, swapped the blunted fencing foil with an antique dueling rapier coated in belladonna extract, hoping to seize the leading role for the royal command performance.",
    culpritId: "s3",
    visual: {
      environment: "theater",
      timeOfDay: "night",
      weather: "clear",
      palette: {
        sky: "#120a1c",
        building: "#26152a",
        accent: "#d04545"
      }
    },
    suspects: [
      {
        id: "s1",
        name: "Lydia Ravenscroft",
        role: "The Leading Lady",
        look: {
          skin: "#f2d6b3",
          hairStyle: "bob",
          hairColor: "#d4a030",
          outfitColor: "#542036",
          accessory: "earrings"
        },
        motive: "Montgomery was having an affair and threatened to ruin her marriage.",
        secret: "She had secretly married the play's financier last month.",
        alibi: "In the dressing room changing into Ophelia's mourning gown during the duel scene.",
        cannedReply: "Julian was unbearable to rehearse with, but an artist never sabotages the climactic act! I was in costume changes when the applause broke out.",
        cannedMood: "sad"
      },
      {
        id: "s2",
        name: "Arthur Finch",
        role: "The Prop Master",
        look: {
          skin: "#deb896",
          hairStyle: "bald",
          hairColor: "#555555",
          outfitColor: "#2a3038",
          accessory: "glasses"
        },
        motive: "Montgomery publicly humiliated Finch and had his wages docked for a missed cue.",
        secret: "He owes huge gambling debts to backstage bookmakers.",
        alibi: "Operating the stage fly-lines from the upper gantry during Act V.",
        cannedReply: "I checked every single prop blade at six o'clock sharp! That foil was cork-tipped and blunted with zinc tape when I hung it in the stage-left armory rack.",
        cannedMood: "angry"
      },
      {
        id: "s3",
        name: "Vincent Sterling",
        role: "The Ambitious Understudy",
        look: {
          skin: "#e8c8a8",
          hairStyle: "slick",
          hairColor: "#2b1c10",
          outfitColor: "#1a2c3a",
          accessory: "scarf"
        },
        motive: "Spent five years in Montgomery's shadow; knew talent scouts from Broadway were in the royal box tonight.",
        secret: "Kept a locked antique weapons chest in his dressing room and purchased belladonna tincture last Tuesday.",
        alibi: "Claims he was waiting in the green room reviewing lines until his curtain call.",
        cannedReply: "Julian was a titan of the stage. Why would I want harm to come to my mentor on the night Broadway producers sat in row three?",
        cannedMood: "smug"
      },
      {
        id: "s4",
        name: "Gwendolyn Marsh",
        role: "The Stage Director",
        look: {
          skin: "#c89d7c",
          hairStyle: "short",
          hairColor: "#888888",
          outfitColor: "#1d222e",
          accessory: "mustache"
        },
        motive: "Montgomery threatened to walk out of the production before the European tour, bankrupting her.",
        secret: "Took out an insurance policy on Montgomery's life to protect the theater's lease.",
        alibi: "At the prompter's desk behind the stage curtains following the script.",
        cannedReply: "I built this theatre with my bare hands! Do you think I'd allow blood to ruin my stage velvet when the critics were writing their reviews?",
        cannedMood: "neutral"
      }
    ]
  }
];

export function getOfflineCase(seedId) {
  if (seedId) {
    const match = OFFLINE_CASES.find(c => c.id.includes(seedId.replace("seed-", "")));
    if (match) return JSON.parse(JSON.stringify(match));
  }
  // Pick random
  const pick = OFFLINE_CASES[Math.floor(Math.random() * OFFLINE_CASES.length)];
  return JSON.parse(JSON.stringify(pick));
}
