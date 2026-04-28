import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';

export type Language = 'cs' | 'en' | 'de';

const STORAGE_KEY = 'atelier-language';

// -------------------- Czech (source) --------------------
const cs = {
  general: {
    title: 'Ateliér Tomandlová',
  },
  error: {
    somethingWentWrong: 'Něco se pokazilo',
    goBack: 'Obnovit',
    pageTitle: 'Chyba',
  },
  menu: {
    about: 'o nás',
    events: 'akce',
    contact: 'kontakt',
    gallery: 'galerie',
    home: 'domů',
    homeAria: 'Ateliér Tomandlová — domů',
    openMenu: 'Otevřít menu',
    closeMenu: 'Zavřít menu',
    languageLabel: 'Jazyk',
  },
  header: {
    metaTagOne: 'autorské oděvy',
    metaTagTwo: 'ruční výroba',
    tagline:
      'Krejčovský ateliér v historickém centru Chebu. Autorské oděvy z přírodních materiálů, šité ručně na míru.',
  },
  ourWork: {
    eyebrow: 'Atelier',
    ourWork: 'Naši práci charakterizuje...',
    designHeading: 'Jedinečný design',
    designText:
      'Komfortní oděv vzniká promyšleným výběrem tkaniny, individuálně voleným tvarem, hrou barev a kompozicí výtvarného detailu.',
    qualityHeading: 'Kvalitní materiály',
    qualityText:
      'Podstatnou složkou je kvalitní přírodní materiál, jeho krása, jedinečnost a specifické vlastnosti, blahodárné pro lidské tělo.',
    handmadeHeading: 'Ruční výroba',
    handmadeText:
      'Naše oděvy by nebyly, jaké jsou, bez mistrovského krejčovského zpracování.',
    learnMore: 'Více o nás',
  },
  events: {
    eyebrow: 'Program',
    upcomingEvents: 'Nadcházející akce',
    moreEvents: 'Všechny akce',
    pastEvents: 'Minulé akce',
    noEvents: 'Další události plánujeme brzy.',
    loadMore: 'Načíst další',
    fields: {
      place: 'Místo',
      when: 'Kdy',
      time: 'Čas',
    },
    posterAltPrefix: 'plakát akce',
    viewPoster: 'Zobrazit plakát',
    closePoster: 'Zavřít plakát',
    eyebrowAkce: 'Akce',
  },
  about: {
    eyebrow: 'O nás',
    peopleEyebrow: 'Lidé v ateliéru',
    eventsEyebrow: 'Akce',
    people: 'Lidé',
    introLede:
      'Autorské oděvy z přírodních materiálů, šité ručně na míru v historickém centru Chebu.',
    aboutUsText: `Lenka Tomandlová vystudovala Libereckou textilní fakultu, oděvní tvorbě se věnuje téměř
      30 let. Ateliér sídlí v historickém centru Chebu a je dnes už neoddělitelnou součástí
      starého města.`,
    quoteLenka: `„Středem mého zájmu i samotnou inspirací je mi přírodní materiál, jeho krása, jedinečnost a
      specifické vlastnosti, blahodárné pro lidské tělo.”`,
    founderAttribution: '— Lenka Tomandlová, zakladatelka',
    quotePeople: `„Komfortní oděv vzniká promyšleným výběrem tkaniny, individuálně voleným tvarem, hrou barev,
      kompozicí výtvarného detailu a v neposlední řadě mistrovským krejčovským zpracováním Olgy
      Dražanové a Nelly Kaiseršotové.“`,
    eventsInfo: `Pravidelně pořádáme prodejní výstavy a přehlídky. Aktuální informace o akcích naleznete vždy v sekci`,
    eventsCta: 'Aktuální akce',
    ladaInfo: 'V našem ateliéru najdete kromě naší tvorby i nádherné autorské šperky a sklo od',
    ladaVosejpkova: 'Lady Vosejpkové',
    evaInfo: 'Dlouhodobě spolupracujeme i s fotografkou',
    evaHajsmanova: 'Evou Hajšmanovou',
    atelierImageAlt: 'Ateliér Tomandlová — interiér krejčovské dílny v Chebu',
    atelierImageCaption: 'Ateliér v Židovské ulici, Cheb',
    peopleImageAlt: 'Lada Vosejpková, Lenka Tomandlová a Eva Hajšmanová',
    peopleImageCaption: 'Lada Vosejpková, Lenka Tomandlová a Eva Hajšmanová',
    roles: {
      tailoring: 'Krejčovské zpracování',
      jewelry: 'Autorské šperky & sklo',
      photography: 'Fotografie',
    },
    tailorsName: 'Olga Dražanová & Nelly Kaiseršotová',
    tailorsText:
      'Mistrovské krejčovství, které stojí za každým kouskem, jenž z ateliéru odchází.',
  },
  gallery: {
    heading: 'Galerie',
    noImages: 'Zatím zde nemáme žádné obrázky',
    viewImage: 'Zobrazit obrázek',
    closeImage: 'Zavřít obrázek',
    previousImage: 'Předchozí obrázek',
    nextImage: 'Další obrázek',
  },
  contact: {
    eyebrow: 'Kontakt',
    placeEyebrow: 'Místo',
    mapTitle: 'Ateliér Tomandlová na mapě',
    address: {
      street: 'Židovská 412/9',
      city: 'Cheb, 350 02',
    },
    email: 'info@ateliertomandlova.cz',
    openingHours: {
      monday: 'Po:',
      mondayTime: '11 - 13 a 14 - 17',
      tuesday: 'Út:',
      tuesdayTime: '10 - 12 a 14 - 17',
      wednesday: 'St:',
      wednesdayTime: '10 - 12 a 14 - 16',
      thursday: 'Čt:',
      thursdayTime: '10 - 12 a 14 - 17',
      friday: 'Pá:',
      fridayTime: '11 - 12 a 14 - 16',
      openingHoursNote: 'Do odvolání polední pauza denně od 12 do 14 hodin.',
    },
    contactUs: 'Kontaktujte nás',
    contactUsText:
      'Pokud máte dotaz ohledně našich služeb nebo potřebujete poradit, neváhejte se na nás obrátit.',
    whereToFindUs: 'Kde nás najdete',
    form: {
      name: 'Jméno',
      email: 'Email',
      message: 'Zpráva',
      submit: 'Odeslat',
      generalError: 'Něco se pokazilo, zkuste to prosím znovu.',
      successMessage: 'Děkujeme, zpráva byla úspěšně odeslána. Brzy se ozveme zpět.',
      nameMissing: 'Prosím vyplňte vaše jméno',
      emailMissing: 'Prosím vyplňte váš email',
      messageMissing: 'Prosím vyplňte zprávu, kterou nám chcete poslat',
      nameTooLong: 'Jméno je příliš dlouhé',
      emailInvalid: 'Email není ve správném formátu',
      messageTooLong: 'Zpráva je příliš dlouhá',
    },
  },
  footer: {
    subtitle: 'Krejčovský ateliér · Cheb',
    addressLine: 'Židovská 412/9 · Cheb',
  },
};

export type Translations = typeof cs;

// -------------------- English --------------------
const en: Translations = {
  general: {
    title: 'Ateliér Tomandlová',
  },
  error: {
    somethingWentWrong: 'Something went wrong',
    goBack: 'Reload',
    pageTitle: 'Error',
  },
  menu: {
    about: 'about',
    events: 'events',
    contact: 'contact',
    gallery: 'gallery',
    home: 'home',
    homeAria: 'Ateliér Tomandlová — home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageLabel: 'Language',
  },
  header: {
    metaTagOne: 'original clothing',
    metaTagTwo: 'handmade',
    tagline:
      'A tailor’s atelier in the historic centre of Cheb. Original clothing made by hand from natural materials.',
  },
  ourWork: {
    eyebrow: 'Atelier',
    ourWork: 'Our work is shaped by…',
    designHeading: 'Distinctive design',
    designText:
      'A comfortable garment grows from a thoughtful choice of fabric, individually shaped silhouette, play of colours and a careful composition of detail.',
    qualityHeading: 'Quality materials',
    qualityText:
      'A core ingredient is fine natural fabric — its beauty, singularity and specific properties, kind to the human body.',
    handmadeHeading: 'Handmade',
    handmadeText:
      'Our garments would not be what they are without masterful tailoring.',
    learnMore: 'More about us',
  },
  events: {
    eyebrow: 'Programme',
    upcomingEvents: 'Upcoming events',
    moreEvents: 'All events',
    pastEvents: 'Past events',
    noEvents: 'More events are coming soon.',
    loadMore: 'Load more',
    fields: {
      place: 'Where',
      when: 'When',
      time: 'Time',
    },
    posterAltPrefix: 'event poster',
    viewPoster: 'View poster',
    closePoster: 'Close poster',
    eyebrowAkce: 'Events',
  },
  about: {
    eyebrow: 'About us',
    peopleEyebrow: 'People in the atelier',
    eventsEyebrow: 'Events',
    people: 'People',
    introLede:
      'Original clothing from natural materials, hand-tailored in the historic centre of Cheb.',
    aboutUsText: `Lenka Tomandlová graduated from the Liberec textile faculty and has been making clothing for almost 30 years. The atelier sits in the historic centre of Cheb and is by now an inseparable part of the old town.`,
    quoteLenka: `„At the centre of my interest, and the source of my inspiration, are natural materials — their beauty, their singularity, and the specific qualities they offer the human body.”`,
    founderAttribution: '— Lenka Tomandlová, founder',
    quotePeople: `„A comfortable garment grows from a thoughtful choice of fabric, an individually shaped silhouette, play of colours, careful detail and — not least — the masterful tailoring of Olga Dražanová and Nelly Kaiseršotová.“`,
    eventsInfo: `We regularly host trunk shows and exhibitions. You can always find the latest news in the section`,
    eventsCta: 'Current events',
    ladaInfo: 'Beyond our own work, in the atelier you will also find beautiful original jewellery and glass by',
    ladaVosejpkova: 'Lada Vosejpková',
    evaInfo: 'We have a long-standing collaboration with the photographer',
    evaHajsmanova: 'Eva Hajšmanová',
    atelierImageAlt: 'Ateliér Tomandlová — interior of the tailor’s atelier in Cheb',
    atelierImageCaption: 'The atelier on Židovská street, Cheb',
    peopleImageAlt: 'Lada Vosejpková, Lenka Tomandlová and Eva Hajšmanová',
    peopleImageCaption: 'Lada Vosejpková, Lenka Tomandlová and Eva Hajšmanová',
    roles: {
      tailoring: 'Tailoring',
      jewelry: 'Original jewellery & glass',
      photography: 'Photography',
    },
    tailorsName: 'Olga Dražanová & Nelly Kaiseršotová',
    tailorsText:
      'The masterful tailoring behind every piece that leaves the atelier.',
  },
  gallery: {
    heading: 'Gallery',
    noImages: 'No images here yet',
    viewImage: 'View image',
    closeImage: 'Close image',
    previousImage: 'Previous image',
    nextImage: 'Next image',
  },
  contact: {
    eyebrow: 'Contact',
    placeEyebrow: 'Where',
    mapTitle: 'Ateliér Tomandlová on the map',
    address: {
      street: 'Židovská 412/9',
      city: 'Cheb, 350 02',
    },
    email: 'info@ateliertomandlova.cz',
    openingHours: {
      monday: 'Mon:',
      mondayTime: '11 – 13 and 14 – 17',
      tuesday: 'Tue:',
      tuesdayTime: '10 – 12 and 14 – 17',
      wednesday: 'Wed:',
      wednesdayTime: '10 – 12 and 14 – 16',
      thursday: 'Thu:',
      thursdayTime: '10 – 12 and 14 – 17',
      friday: 'Fri:',
      fridayTime: '11 – 12 and 14 – 16',
      openingHoursNote: 'Until further notice, lunch break daily from 12 to 14.',
    },
    contactUs: 'Contact us',
    contactUsText:
      'If you have a question about our work or want to ask for advice, please get in touch.',
    whereToFindUs: 'Where to find us',
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send',
      generalError: 'Something went wrong, please try again.',
      successMessage: 'Thank you, your message was sent. We will be in touch soon.',
      nameMissing: 'Please enter your name',
      emailMissing: 'Please enter your email',
      messageMissing: 'Please enter the message you want to send us',
      nameTooLong: 'The name is too long',
      emailInvalid: 'The email is not in a valid format',
      messageTooLong: 'The message is too long',
    },
  },
  footer: {
    subtitle: 'Tailor’s atelier · Cheb',
    addressLine: 'Židovská 412/9 · Cheb',
  },
};

// -------------------- German --------------------
const de: Translations = {
  general: {
    title: 'Ateliér Tomandlová',
  },
  error: {
    somethingWentWrong: 'Etwas ist schiefgelaufen',
    goBack: 'Neu laden',
    pageTitle: 'Fehler',
  },
  menu: {
    about: 'über uns',
    events: 'termine',
    contact: 'kontakt',
    gallery: 'galerie',
    home: 'start',
    homeAria: 'Ateliér Tomandlová — Startseite',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    languageLabel: 'Sprache',
  },
  header: {
    metaTagOne: 'Autorenmode',
    metaTagTwo: 'handgefertigt',
    tagline:
      'Schneideratelier im historischen Stadtkern von Eger (Cheb). Autorenmode aus Naturmaterialien, von Hand maßgefertigt.',
  },
  ourWork: {
    eyebrow: 'Atelier',
    ourWork: 'Unsere Arbeit zeichnet aus…',
    designHeading: 'Eigenständiges Design',
    designText:
      'Ein bequemes Kleidungsstück entsteht aus der durchdachten Wahl des Stoffes, der individuell gewählten Silhouette, dem Spiel mit Farben und einer feinen Komposition der Details.',
    qualityHeading: 'Hochwertige Materialien',
    qualityText:
      'Wesentlicher Bestandteil ist hochwertiges Naturmaterial — seine Schönheit, Einzigartigkeit und seine besonderen, dem Körper zuträglichen Eigenschaften.',
    handmadeHeading: 'Handarbeit',
    handmadeText:
      'Unsere Mode wäre nicht, was sie ist, ohne meisterhafte Schneiderarbeit.',
    learnMore: 'Mehr über uns',
  },
  events: {
    eyebrow: 'Programm',
    upcomingEvents: 'Kommende Termine',
    moreEvents: 'Alle Termine',
    pastEvents: 'Vergangene Termine',
    noEvents: 'Weitere Termine folgen in Kürze.',
    loadMore: 'Mehr laden',
    fields: {
      place: 'Ort',
      when: 'Wann',
      time: 'Uhrzeit',
    },
    posterAltPrefix: 'Plakat zur Veranstaltung',
    viewPoster: 'Plakat anzeigen',
    closePoster: 'Plakat schließen',
    eyebrowAkce: 'Termine',
  },
  about: {
    eyebrow: 'Über uns',
    peopleEyebrow: 'Menschen im Atelier',
    eventsEyebrow: 'Termine',
    people: 'Menschen',
    introLede:
      'Autorenmode aus Naturmaterialien, von Hand gefertigt im historischen Stadtkern von Eger (Cheb).',
    aboutUsText: `Lenka Tomandlová absolvierte die Textilfakultät in Liberec und entwirft seit fast 30 Jahren Mode. Das Atelier befindet sich im historischen Stadtkern von Eger (Cheb) und ist heute ein fester Bestandteil der Altstadt.`,
    quoteLenka: `„Im Mittelpunkt meines Interesses und meiner Inspiration steht das Naturmaterial — seine Schönheit, seine Einzigartigkeit und seine besonderen, dem menschlichen Körper zuträglichen Eigenschaften.”`,
    founderAttribution: '— Lenka Tomandlová, Gründerin',
    quotePeople: `„Ein bequemes Kleidungsstück entsteht aus der durchdachten Wahl des Stoffes, der individuell gewählten Silhouette, dem Spiel mit Farben, der Komposition der Details und nicht zuletzt der meisterhaften Schneiderarbeit von Olga Dražanová und Nelly Kaiseršotová.“`,
    eventsInfo: `Regelmäßig veranstalten wir Verkaufsausstellungen und Modenschauen. Aktuelle Informationen finden Sie stets im Bereich`,
    eventsCta: 'Aktuelle Termine',
    ladaInfo: 'Neben unseren eigenen Arbeiten finden Sie im Atelier auch wunderschönen Autorenschmuck und Glas von',
    ladaVosejpkova: 'Lada Vosejpková',
    evaInfo: 'Wir arbeiten langfristig auch mit der Fotografin',
    evaHajsmanova: 'Eva Hajšmanová',
    atelierImageAlt: 'Ateliér Tomandlová — Innenraum des Schneideateliers in Eger',
    atelierImageCaption: 'Das Atelier in der Židovská-Straße, Eger',
    peopleImageAlt: 'Lada Vosejpková, Lenka Tomandlová und Eva Hajšmanová',
    peopleImageCaption: 'Lada Vosejpková, Lenka Tomandlová und Eva Hajšmanová',
    roles: {
      tailoring: 'Schneiderarbeit',
      jewelry: 'Autorenschmuck & Glas',
      photography: 'Fotografie',
    },
    tailorsName: 'Olga Dražanová & Nelly Kaiseršotová',
    tailorsText:
      'Die meisterhafte Schneiderarbeit hinter jedem Stück, das das Atelier verlässt.',
  },
  gallery: {
    heading: 'Galerie',
    noImages: 'Hier sind noch keine Bilder',
    viewImage: 'Bild anzeigen',
    closeImage: 'Bild schließen',
    previousImage: 'Vorheriges Bild',
    nextImage: 'Nächstes Bild',
  },
  contact: {
    eyebrow: 'Kontakt',
    placeEyebrow: 'Wo',
    mapTitle: 'Ateliér Tomandlová auf der Karte',
    address: {
      street: 'Židovská 412/9',
      city: 'Cheb (Eger), 350 02',
    },
    email: 'info@ateliertomandlova.cz',
    openingHours: {
      monday: 'Mo:',
      mondayTime: '11 – 13 und 14 – 17',
      tuesday: 'Di:',
      tuesdayTime: '10 – 12 und 14 – 17',
      wednesday: 'Mi:',
      wednesdayTime: '10 – 12 und 14 – 16',
      thursday: 'Do:',
      thursdayTime: '10 – 12 und 14 – 17',
      friday: 'Fr:',
      fridayTime: '11 – 12 und 14 – 16',
      openingHoursNote: 'Bis auf Weiteres täglich Mittagspause von 12 bis 14 Uhr.',
    },
    contactUs: 'Kontaktieren Sie uns',
    contactUsText:
      'Wenn Sie eine Frage zu unseren Leistungen haben oder Beratung wünschen, schreiben Sie uns gern.',
    whereToFindUs: 'So finden Sie uns',
    form: {
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      submit: 'Senden',
      generalError: 'Etwas ist schiefgelaufen, bitte versuchen Sie es erneut.',
      successMessage: 'Vielen Dank, Ihre Nachricht wurde gesendet. Wir melden uns bald.',
      nameMissing: 'Bitte tragen Sie Ihren Namen ein',
      emailMissing: 'Bitte tragen Sie Ihre E-Mail-Adresse ein',
      messageMissing: 'Bitte schreiben Sie uns Ihre Nachricht',
      nameTooLong: 'Der Name ist zu lang',
      emailInvalid: 'Die E-Mail-Adresse ist nicht im richtigen Format',
      messageTooLong: 'Die Nachricht ist zu lang',
    },
  },
  footer: {
    subtitle: 'Schneideratelier · Eger',
    addressLine: 'Židovská 412/9 · Eger',
  },
};

const dictionaries: Record<Language, Translations> = { cs, en, de };

// -------------------- Locale codes used by Intl APIs --------------------
const localeMap: Record<Language, string> = {
  cs: 'cs-CZ',
  en: 'en-GB',
  de: 'de-DE',
};

export const availableLanguages: { code: Language; label: string }[] = [
  { code: 'cs', label: 'CS' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
];

function isLanguage(value: unknown): value is Language {
  return value === 'cs' || value === 'en' || value === 'de';
}

function readInitial(): Language {
  if (!browser) return 'cs';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) return stored;
  } catch {
    // ignore — private mode etc.
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith('en')) return 'en';
    if (nav.startsWith('de')) return 'de';
  }
  return 'cs';
}

// Active language store. Persisted to localStorage.
export const language = writable<Language>(readInitial());

if (browser) {
  language.subscribe((value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = value;
    }
  });
}

/**
 * Reactive translations dictionary. Use as `$t.path.to.string` in templates,
 * or subscribe in script blocks.
 */
export const t = derived(language, ($lang) => dictionaries[$lang]);

/**
 * Active Intl locale string (e.g. `cs-CZ`, `en-GB`, `de-DE`) for date/number
 * formatting. Reactive.
 */
export const locale = derived(language, ($lang) => localeMap[$lang]);

export function setLanguage(lang: Language) {
  language.set(lang);
}

/**
 * Synchronous snapshot of the current dictionary. Use sparingly — prefer the
 * reactive `t` store. Useful for one-off non-reactive contexts (eg. analytics).
 */
export function getTranslations(): Translations {
  return get(t);
}

// Backwards-compat default export — points at the current snapshot. Most call
// sites have been migrated to `import { t }`; legacy imports still resolve to
// a sensible (but non-reactive) value.
export default cs;
