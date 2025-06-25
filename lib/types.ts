// Comprehensive type definitions for the dictionary structure

export interface DictionaryGameErrors {
  invalidNumber: string;
  duplicateNumber: string;
  sumExceeded: string;
  tryAgain: string;
  impossible: string;
  checkAnswers: string;
  impossibleValues: string;
  couldNotFind: string;
  rangeError: string;
  debugNotFound: string;
}

export interface DictionaryGameInfoMessages {
  duplicateReminder: string;
  player2GivePicas: string;
  player1GivePicas: string;
  guessPlayer1: string;
  guessPlayer2: string;
  thinking: string;
  picasAndFijas: string;
  checkAnswer: string;
}

export interface DictionaryGameSuccess {
  gameStarted: string;
  player1Won: string;
  player2Won: string;
  congratulations: string;
  machineGuessed: string;
  machineWon: string;
  youWon: string;
  playerWon: string;
  iWon: string;
}

export interface DictionaryGameUI {
  attempt: string;
  give: string;
  digit: string;
  fijas: string;
  picas: string;
}

export interface DictionaryLanguages {
  es: string;
  en: string;
  fr: string;
}

export interface DictionaryGame {
  errors: DictionaryGameErrors;
  info: DictionaryGameInfoMessages;
  success: DictionaryGameSuccess;
  ui: DictionaryGameUI;
}

export interface DictionaryNavigation {
  home: string;
  howToPlay: string;
  play: string;
  faq: string;
}

export interface DictionaryHero {
  title: string;
  subtitle: string;
  description: string;
  playNow: string;
  learnMore: string;
}

export interface DictionaryGameInfo {
  title: string;
  subtitle: string;
  description: string;
  uniqueFeatures: string;
  features: {
    logic: { title: string; description: string };
    difficulty: { title: string; description: string };
    unlimited: { title: string; description: string };
    strategy: { title: string; description: string };
  };
}

export interface DictionaryHowToStart {
  title: string;
  steps: {
    playNow: {
      title: string;
      description: string;
    };
    learnRules: {
      title: string;
      description: string;
    };
    compete: {
      title: string;
      description: string;
    };
  };
}

export interface DictionaryFeatures {
  title: string;
  subtitle: string;
  description: string;
  modern: string;
  modernDescription: string;
  tabs: {
    ai: { title: string; description: string };
    timers: { title: string; description: string };
    statistics: { title: string; description: string };
  };
  items: {
    logic: { title: string; description: string };
    difficulty: { title: string; description: string };
    unlimited: { title: string; description: string };
  };
}

export interface DictionaryHistory {
  title: string;
  description: string;
  subtitle: string;
  evolutionTitle: string;
  timeline: {
    "19th": { era: string; title: string; description: string };
    "1970": { era: string; title: string; description: string };
    digital: { era: string; title: string; description: string };
  };
  legacy: {
    title: string;
    description1: string;
    description2: string;
    stats: {
      years: string;
      yearsLabel: string;
      possibilities: string;
      possibilitiesLabel: string;
      passion: string;
      passionLabel: string;
    };
  };
}

export interface DictionaryComoJugar {
  title: string;
  subtitle: string;
  description: string;
  basicRules: {
    title: string;
    rule1: { title: string; description: string };
    rule2: { title: string; description: string };
    rule3: { title: string; description: string };
  };
  detailedExample: {
    title: string;
    secretNumber: string;
    attempt: string;
    result: string;
    analysis: string;
    analysisText: string;
    info: string;
    infoText: string;
    fijas: string;
    picas: string;
  };
  expertTips: {
    title: string;
    tip1: string;
    tip2: string;
    tip3: string;
  };
  advancedModes: {
    title: string;
    repeats: { title: string; description: string };
    variableLength: { title: string; description: string };
    timed: { title: string; description: string };
  };

  challenge: {
    title: string;
    description: string;
    playButton: string;
  };
}

export interface DictionaryGamePage {
  modePrefix: string;
  title: string;
  description: string;
  detailedInstructions: string;
  player1: string;
  player2: string;
  yourHistory: string;
  gameClosedMessage: string;
  digitQuestion: string;
  submitButton: string;
  tournamentNotAvailable: {
    title: string;
    description: string;
    githubMessage: string;
    collaborationMessage: string;
    helpButton: string;
  };
  modes: {
    hvh: string;
    hvm: string;
    mvh: string;
    torneo: string;
  };
}

export interface DictionaryGameContent {
  title: string;
  subtitle: string;
  description: string;
  callToAction: {
    title: string;
    description: string;
    fixedHint: string;
    picasHint: string;
    detailedInstructions: string;
  };
  information: {
    heroSection: {
      title: string;
      description: string;
    };
    benefits: {
      mentalPower: {
        title: string;
        description: string;
      };
      precision: {
        title: string;
        description: string;
      };
      mentalAgility: {
        title: string;
        description: string;
      };
    };
    gameModes: {
      title: string;
      subtitle: string;
      classic: {
        title: string;
        popularBadge: string;
        description: string;
        features: {
          players: string;
          strategy: string;
          realTime: string;
        };
      };
      humanVsMachine: {
        title: string;
        subtitle: string;
        description: string;
        features: {
          ai: string;
          practice: string;
        };
      };
      machineVsHuman: {
        title: string;
        subtitle: string;
        description: string;
        features: {
          reverse: string;
          algorithms: string;
        };
      };
      tournament: {
        title: string;
        comingSoonBadge: string;
        description: string;
        features: {
          global: string;
          elimination: string;
          rankings: string;
        };
        collaboration: {
          title: string;
          description: string;
          buttonText: string;
        };
      };
    };
  };
}

export interface DictionaryGameMode {
  humanVsHuman: string;
  humanVsMachine: string;
  machineGuesses: string;
  humanVsHumanDesc: string;
  humanVsMachineDesc: string;
  machineGuessesDesc: string;
  onlineTournament: string;
  onlineTournamentDesc: string;
  selectGameMode: string;
  playNow: string;
  comingSoon: string;
}

export interface DictionaryFooter {
  title: string;
  description: string;
  quickLinks: string;
  game: string;
  howToPlay: string;
  aboutUs: string;
  contact: string;
  legal: string;
  faq: string;
  terms: string;
  privacy: string;
  followUs: string;
  allRightsReserved: string;
}

export interface DictionaryNewsletter {
  title: string;
  description: string;
  placeholder: string;
  button: string;
  success: string;
  error: string;
}

export interface DictionaryBanner {
  acceptText: string;
  cookies: string;
  close: string;
}

export interface DictionaryFAQ {
  title: string;
  subtitle: string;
  description: string;
  whatIsPica: { question: string; answer: string };
  whatIsFija: { question: string; answer: string };
  vsMastermind: { question: string; answer: string };
  howManyDigits: { question: string; answer: string };
  canRepeatDigits: { question: string; answer: string };
  bestStrategy: { question: string; answer: string };
  minimumAttempts: { question: string; answer: string };
  isThereTimeLimit: { question: string; answer: string };
}

export interface DictionaryMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    siteName: string;
  };
  pages: {
    comoJugar: {
      title: string;
      description: string;
      keywords: string[];
    };
    jugar: {
      title: string;
      description: string;
      keywords: string[];
    };
    humanoHumano: {
      title: string;
      description: string;
      keywords: string[];
    };
    maquinaAdivina: {
      title: string;
      description: string;
      keywords: string[];
    };
    maquinaPistas: {
      title: string;
      description: string;
      keywords: string[];
    };
    faq: {
      title: string;
      description: string;
      keywords: string[];
    };
    privacidad: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}

export interface DictionaryStructuredData {
  general: {
    disambiguatingDescription: string;
    alternateName: string[];
    applicationCategory: string;
    applicationSubCategory: string;
    applicationSuite: string;
    browserRequirements: string;
    availableOnDevice: string;
    operatingSystem: string;
    softwareVersion: string;
    featureList: string[];
    memoryRequirements: string;
    storageRequirements: string;
    permissions: string;
    releaseNotes: string;
    isAccessibleForFree: boolean;
    isFamilyFriendly: boolean;
    keywords: string;
    genre: string[];
    gamePlatform: string[];
    playMode: string[];
    gameEdition: string;
    numberOfPlayersValue: string;
    gameLocation: string;
    characterAttribute: string[];
    gameItem: string[];
    quest: string[];
    dateCreated: string;
    datePublished: string;
    license: string;
    aboutName: string;
    aboutDescription: string;
    contentRating: string;
    typicalAgeRange: string;
    audienceType: string;
    suggestedMinAge: number;
    suggestedMaxAge: number;
    educationalUse: string;
    teaches: string[];
    screenshot: string[];
    fileSize: string;
    softwareRequirements: string;
    processorRequirements: string;
    countriesSupported: string;
    interactivityType: string;
    accessibilityFeature: string[];
    actor: string[];
    director: string[];
    musicBy: string[];
    cheatCode: string[];
    gameServer: string[];
    gameTip: string[];
    trailer: string[];
    softwareAddOn: string[];
    softwareHelpName: string;
    softwareHelpPath: string;
    supportingData: string[];
    countriesNotSupported: string;
    aggregateRating: null;
    award: null;
  };
  article: {
    articleSection: string;
    wordCount: number;
    aboutName: string;
    aboutDescription: string;
  };
  organization: {
    name: string;
    description: string;
    contactType: string;
    availableLanguage: string[];
  };
  faq: {
    aboutName: string;
    aboutDescription: string;
    websiteName: string;
  };
}

export interface DictionaryNotFound {
  title: string;
  description: string;
  backHome: string;
}

// Main Dictionary interface
export interface Dictionary {
  navigation: DictionaryNavigation;
  languages: DictionaryLanguages;
  hero: DictionaryHero;
  gameInfo: DictionaryGameInfo;
  howToStart: DictionaryHowToStart;
  features: DictionaryFeatures;
  history: DictionaryHistory;
  comoJugar: DictionaryComoJugar;
  gamePage: DictionaryGamePage;
  gameContent: DictionaryGameContent;
  gameMode: DictionaryGameMode;
  footer: DictionaryFooter;
  newsletter: DictionaryNewsletter;
  banner: DictionaryBanner;
  notFound: DictionaryNotFound;
  faq: DictionaryFAQ;
  metadata: DictionaryMetadata;
  game: DictionaryGame;
  structuredData: DictionaryStructuredData;
}
