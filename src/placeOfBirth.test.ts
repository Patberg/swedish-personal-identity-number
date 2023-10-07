import { describe, expect, it } from "vitest";
import { getPlaceOfBirth } from "./placeOfBirth";

describe("getPlaceOfBirth", () => {
  it("should return 'Stockholms stad' for digits 00", () => {
    expect(getPlaceOfBirth("00")).toBe("Stockholms stad");
  });

  it("should return 'Stockholms län' for digits 10-13", () => {
    expect(getPlaceOfBirth("10")).toBe("Stockholms län");
    expect(getPlaceOfBirth("11")).toBe("Stockholms län");
    expect(getPlaceOfBirth("12")).toBe("Stockholms län");
    expect(getPlaceOfBirth("13")).toBe("Stockholms län");
  });

  it("should return 'Uppsala län' for digits 14-15", () => {
    expect(getPlaceOfBirth("14")).toBe("Uppsala län");
    expect(getPlaceOfBirth("15")).toBe("Uppsala län");
  });

  it("should return 'Södermanlands län' for digits 16-18", () => {
    expect(getPlaceOfBirth("16")).toBe("Södermanlands län");
    expect(getPlaceOfBirth("17")).toBe("Södermanlands län");
    expect(getPlaceOfBirth("18")).toBe("Södermanlands län");
  });

  it("should return 'Östergötlands län' for digits 19-23", () => {
    expect(getPlaceOfBirth("19")).toBe("Östergötlands län");
    expect(getPlaceOfBirth("20")).toBe("Östergötlands län");
    expect(getPlaceOfBirth("21")).toBe("Östergötlands län");
    expect(getPlaceOfBirth("22")).toBe("Östergötlands län");
    expect(getPlaceOfBirth("23")).toBe("Östergötlands län");
  });

  it("should return 'Jönköpings län' for digits 24-26", () => {
    expect(getPlaceOfBirth("24")).toBe("Jönköpings län");
    expect(getPlaceOfBirth("25")).toBe("Jönköpings län");
    expect(getPlaceOfBirth("26")).toBe("Jönköpings län");
  });

  it("should return 'Kronobergs län' for digits 27-28", () => {
    expect(getPlaceOfBirth("27")).toBe("Kronobergs län");
    expect(getPlaceOfBirth("28")).toBe("Kronobergs län");
  });

  it("should return 'Kalmar län' for digits 29-31", () => {
    expect(getPlaceOfBirth("29")).toBe("Kalmar län");
    expect(getPlaceOfBirth("30")).toBe("Kalmar län");
    expect(getPlaceOfBirth("31")).toBe("Kalmar län");
  });

  it("should return 'Gotlands län' for digit 32", () => {
    expect(getPlaceOfBirth("32")).toBe("Gotlands län");
  });

  it("should return 'Blekinge län' for digits 33-34", () => {
    expect(getPlaceOfBirth("33")).toBe("Blekinge län");
    expect(getPlaceOfBirth("34")).toBe("Blekinge län");
  });

  it("should return 'Kristianstads län' for digits 35-38", () => {
    expect(getPlaceOfBirth("35")).toBe("Kristianstads län");
    expect(getPlaceOfBirth("36")).toBe("Kristianstads län");
    expect(getPlaceOfBirth("37")).toBe("Kristianstads län");
    expect(getPlaceOfBirth("38")).toBe("Kristianstads län");
  });

  it("should return 'Malmöhus län' for digits 39-45", () => {
    expect(getPlaceOfBirth("39")).toBe("Malmöhus län");
    expect(getPlaceOfBirth("40")).toBe("Malmöhus län");
    expect(getPlaceOfBirth("41")).toBe("Malmöhus län");
    expect(getPlaceOfBirth("42")).toBe("Malmöhus län");
    expect(getPlaceOfBirth("43")).toBe("Malmöhus län");
    expect(getPlaceOfBirth("44")).toBe("Malmöhus län");
    expect(getPlaceOfBirth("45")).toBe("Malmöhus län");
  });

  it("should return 'Hallands län' for digits 46-47", () => {
    expect(getPlaceOfBirth("46")).toBe("Hallands län");
    expect(getPlaceOfBirth("47")).toBe("Hallands län");
  });

  it("should return 'Göteborgs och Bohus län' for digits 48-54", () => {
    expect(getPlaceOfBirth("48")).toBe("Göteborgs och Bohus län");
    expect(getPlaceOfBirth("49")).toBe("Göteborgs och Bohus län");
    expect(getPlaceOfBirth("50")).toBe("Göteborgs och Bohus län");
    expect(getPlaceOfBirth("51")).toBe("Göteborgs och Bohus län");
    expect(getPlaceOfBirth("52")).toBe("Göteborgs och Bohus län");
    expect(getPlaceOfBirth("53")).toBe("Göteborgs och Bohus län");
    expect(getPlaceOfBirth("54")).toBe("Göteborgs och Bohus län");
  });

  it("should return 'Älvsborgs län' for digits 55-58", () => {
    expect(getPlaceOfBirth("55")).toBe("Älvsborgs län");
    expect(getPlaceOfBirth("56")).toBe("Älvsborgs län");
    expect(getPlaceOfBirth("57")).toBe("Älvsborgs län");
    expect(getPlaceOfBirth("58")).toBe("Älvsborgs län");
  });

  it("should return 'Skaraborgs län' for digits 59-61", () => {
    expect(getPlaceOfBirth("59")).toBe("Skaraborgs län");
    expect(getPlaceOfBirth("60")).toBe("Skaraborgs län");
    expect(getPlaceOfBirth("61")).toBe("Skaraborgs län");
  });

  it("should return 'Värmlands län' for digits 62-64", () => {
    expect(getPlaceOfBirth("62")).toBe("Värmlands län");
    expect(getPlaceOfBirth("63")).toBe("Värmlands län");
    expect(getPlaceOfBirth("64")).toBe("Värmlands län");
  });

  it("should return 'Örebro län' for digits 66-68", () => {
    expect(getPlaceOfBirth("66")).toBe("Örebro län");
    expect(getPlaceOfBirth("67")).toBe("Örebro län");
    expect(getPlaceOfBirth("68")).toBe("Örebro län");
  });

  it("should return 'Västmanlands län' for digits 69-70", () => {
    expect(getPlaceOfBirth("69")).toBe("Västmanlands län");
    expect(getPlaceOfBirth("70")).toBe("Västmanlands län");
  });

  it("should return 'Kopparbergs län' for digits 71-73", () => {
    expect(getPlaceOfBirth("71")).toBe("Kopparbergs län");
    expect(getPlaceOfBirth("72")).toBe("Kopparbergs län");
    expect(getPlaceOfBirth("73")).toBe("Kopparbergs län");
  });

  it("should return 'Gävleborgs län' for digits 75-77", () => {
    expect(getPlaceOfBirth("75")).toBe("Gävleborgs län");
    expect(getPlaceOfBirth("76")).toBe("Gävleborgs län");
    expect(getPlaceOfBirth("77")).toBe("Gävleborgs län");
  });

  it("should return 'Västernorrlands län' for digits 78-81", () => {
    expect(getPlaceOfBirth("78")).toBe("Västernorrlands län");
    expect(getPlaceOfBirth("79")).toBe("Västernorrlands län");
    expect(getPlaceOfBirth("80")).toBe("Västernorrlands län");
    expect(getPlaceOfBirth("81")).toBe("Västernorrlands län");
  });

  it("should return 'Jämtlands län' for digits 82-84", () => {
    expect(getPlaceOfBirth("82")).toBe("Jämtlands län");
    expect(getPlaceOfBirth("83")).toBe("Jämtlands län");
    expect(getPlaceOfBirth("84")).toBe("Jämtlands län");
  });

  it("should return 'Västerbottens län' for digits 85-88", () => {
    expect(getPlaceOfBirth("85")).toBe("Västerbottens län");
    expect(getPlaceOfBirth("86")).toBe("Västerbottens län");
    expect(getPlaceOfBirth("87")).toBe("Västerbottens län");
    expect(getPlaceOfBirth("88")).toBe("Västerbottens län");
  });

  it("should return 'Norrbottens län' for digits 89-92", () => {
    expect(getPlaceOfBirth("89")).toBe("Norrbottens län");
    expect(getPlaceOfBirth("90")).toBe("Norrbottens län");
    expect(getPlaceOfBirth("91")).toBe("Norrbottens län");
    expect(getPlaceOfBirth("92")).toBe("Norrbottens län");
  });

  it("should return 'Unknown' for digits outside the valid range", () => {
    expect(getPlaceOfBirth("93")).toBe("Unknown");
    expect(getPlaceOfBirth("99")).toBe("Unknown");
  });

  it("should throw an error if digits is undefined", () => {
    expect(() => getPlaceOfBirth(undefined)).toThrow("Digits is undefined");
  });

  it("should throw an error if digits is less than 2 characters long", () => {
    expect(() => getPlaceOfBirth("")).toThrow("Digits must be at least 2 characters long");
    expect(() => getPlaceOfBirth("1")).toThrow("Digits must be at least 2 characters long");
  });
});
// END: qm8d4b3jv5f7
