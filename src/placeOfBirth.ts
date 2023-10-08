/**
 * Represents the possible places of birth for a person in Sweden.
 */
export type PlaceOfBirth =
  | "Stockholms stad"
  | "Stockholms län"
  | "Uppsala län"
  | "Södermanlands län"
  | "Östergötlands län"
  | "Jönköpings län"
  | "Kronobergs län"
  | "Kalmar län"
  | "Gotlands län"
  | "Blekinge län"
  | "Kristianstads län"
  | "Malmöhus län"
  | "Hallands län"
  | "Göteborgs och Bohus län"
  | "Älvsborgs län"
  | "Skaraborgs län"
  | "Värmlands län"
  | "Örebro län"
  | "Västmanlands län"
  | "Kopparbergs län"
  | "Gävleborgs län"
  | "Västernorrlands län"
  | "Jämtlands län"
  | "Västerbottens län"
  | "Norrbottens län"
  | "Unknown";

export function getPlaceOfBirth(digits: string): PlaceOfBirth {
  if (digits.length < 2) throw new Error("Digits must be at least 2 characters long");

  const placeOfBirthDigits = parseInt(digits.substring(0, 2));

  if (placeOfBirthDigits >= 0 && placeOfBirthDigits <= 9) return "Stockholms stad";
  else if (placeOfBirthDigits >= 10 && placeOfBirthDigits <= 13) return "Stockholms län";
  else if (placeOfBirthDigits >= 14 && placeOfBirthDigits <= 15) return "Uppsala län";
  else if (placeOfBirthDigits >= 16 && placeOfBirthDigits <= 18) return "Södermanlands län";
  else if (placeOfBirthDigits >= 19 && placeOfBirthDigits <= 23) return "Östergötlands län";
  else if (placeOfBirthDigits >= 24 && placeOfBirthDigits <= 26) return "Jönköpings län";
  else if (placeOfBirthDigits >= 27 && placeOfBirthDigits <= 28) return "Kronobergs län";
  else if (placeOfBirthDigits >= 29 && placeOfBirthDigits <= 31) return "Kalmar län";
  else if (placeOfBirthDigits === 32) return "Gotlands län";
  else if (placeOfBirthDigits >= 33 && placeOfBirthDigits <= 34) return "Blekinge län";
  else if (placeOfBirthDigits >= 35 && placeOfBirthDigits <= 38) return "Kristianstads län";
  else if (placeOfBirthDigits >= 39 && placeOfBirthDigits <= 45) return "Malmöhus län";
  else if (placeOfBirthDigits >= 46 && placeOfBirthDigits <= 47) return "Hallands län";
  else if (placeOfBirthDigits >= 48 && placeOfBirthDigits <= 54) return "Göteborgs och Bohus län";
  else if (placeOfBirthDigits >= 55 && placeOfBirthDigits <= 58) return "Älvsborgs län";
  else if (placeOfBirthDigits >= 59 && placeOfBirthDigits <= 61) return "Skaraborgs län";
  else if (placeOfBirthDigits >= 62 && placeOfBirthDigits <= 64) return "Värmlands län";
  else if (placeOfBirthDigits >= 66 && placeOfBirthDigits <= 68) return "Örebro län";
  else if (placeOfBirthDigits >= 69 && placeOfBirthDigits <= 70) return "Västmanlands län";
  else if (placeOfBirthDigits >= 71 && placeOfBirthDigits <= 73) return "Kopparbergs län";
  else if (placeOfBirthDigits >= 75 && placeOfBirthDigits <= 77) return "Gävleborgs län";
  else if (placeOfBirthDigits >= 78 && placeOfBirthDigits <= 81) return "Västernorrlands län";
  else if (placeOfBirthDigits >= 82 && placeOfBirthDigits <= 84) return "Jämtlands län";
  else if (placeOfBirthDigits >= 85 && placeOfBirthDigits <= 88) return "Västerbottens län";
  else if (placeOfBirthDigits >= 89 && placeOfBirthDigits <= 92) return "Norrbottens län";
  else return "Unknown";
}
