import { describe, expect, it } from "vitest";
import { PersonalIdentityNumber } from "./personalIdentityNumber";

describe("personalIdentityNumber", () => {
  it("undefined argument should throw error", () => {
    expect(() => PersonalIdentityNumber.parse(undefined!)).toThrow("personalIdentityNumber is undefined");
  });

  it("empty string argument should throw error", () => {
    expect(() => PersonalIdentityNumber.parse("")).toThrow("personalIdentityNumber is not valid");
  });

  it.each(["191212121212", "19121212-1212", "1212121212", "121212-1212"])(
    "valid personal number %s should not throw error",
    (personalNumber) => {
      expect(() => PersonalIdentityNumber.parse(personalNumber)).not.toThrow();
    },
  );

  it.each(["19920873-2389", "199208732389", "9208732389", "920873-2389"])(
    "valid co-ordination number %s should not throw error",
    (personalNumber) => {
      expect(() => PersonalIdentityNumber.parse(personalNumber)).not.toThrow();
    },
  );

  it.each(["199911232388", "19991123-2388", "9911232388", "19991123-2388", "991123 2388"])(
    "should be able to parse a valid personal number",
    (input) => {
      const personalNumber = PersonalIdentityNumber.parse(input);
      expect(personalNumber.dateOfBirth).toEqual(new Date(1999, 10, 23));
      expect(personalNumber.digits).toEqual(2388);
      expect(personalNumber.isCoordinationNumber).toEqual(false);
    },
  );

  it.each(["19920873-2389", "199208732389", "9208732389", "920873-2389"])(
    "should be able to parse a valid co-ordination number",
    (input) => {
      const personalNumber = PersonalIdentityNumber.parse(input);
      expect(personalNumber.dateOfBirth).toEqual(new Date(1992, 7, 13));
      expect(personalNumber.digits).toEqual(2389);
      expect(personalNumber.isCoordinationNumber).toEqual(true);
    },
  );

  it.each(["199911232388", "19991123-2388", "9911232388", "991123-2388"])(
    "should be able to convert valid personal numbers to a string uniform string format",
    (input) => {
      const personalNumber = PersonalIdentityNumber.parse(input);
      expect(personalNumber.toString()).toEqual("19991123-2388");
    },
  );

  it.each(["19920873-2389", "199208732389", "9208732389", "920873-2389"])(
    "should be able to convert valid temporary personal numbers to a string uniform string format",
    (input) => {
      const personalNumber = PersonalIdentityNumber.parse(input);
      expect(personalNumber.toString()).toEqual("19920873-2389");
    },
  );
  it.each(["", "foobar", "110873-1319"])("should return null for invalid personal identity numbers when using tryParse", (input) => {
    const personalNumber = PersonalIdentityNumber.tryParse(input);
    expect(personalNumber).toEqual(null);
  });

  it.each(["199911232388", "19991123-2388", "9911232388", "19991123-2388"])(
    "should be able to safely parse a valid personal number using tryparse",
    (input) => {
      const personalNumber = PersonalIdentityNumber.tryParse(input);
      expect(personalNumber!.dateOfBirth).toEqual(new Date(1999, 10, 23));
      expect(personalNumber!.digits).toEqual(2388);
      expect(personalNumber!.isCoordinationNumber).toEqual(false);
    },
  );

  it("should detect Male gender", () => {
    const personalNumber = PersonalIdentityNumber.parse("121212-1212");
    expect(personalNumber!.gender).toEqual("Male");
  });

  it("should detect Female gender", () => {
    const personalNumber = PersonalIdentityNumber.parse("19991123-2388");
    expect(personalNumber!.gender).toEqual("Female");
  });

  it("should be able to return a correct short string", () => {
    const personalNumber = PersonalIdentityNumber.parse("19991123-2388");
    expect(personalNumber!.toShortString()).toEqual("991123-2388");
  });

  it("should return unknown birth place if born in 1990 or later", () => {
    const personalNumber = PersonalIdentityNumber.parse("19991123-2388");
    expect(personalNumber!.placeOfBirth).toEqual("Unknown");
  });

  it("should return birth place if born before 1990", () => {
    const personalNumber = PersonalIdentityNumber.parse("198912242388");
    expect(personalNumber!.placeOfBirth).toEqual("Östergötlands län");
  });

  it("should return uknown birth place for a co-ordination even if the person was born before 1990", () => {
    const personalNumber = PersonalIdentityNumber.parse("197802662390");
    expect(personalNumber!.placeOfBirth).toEqual("Unknown");
  });

  it("equality should return true for instances with the same personal identity number", () => {
    const firstPersonalNumber = PersonalIdentityNumber.parse("198912242388");
    const secondPersonalNumber = PersonalIdentityNumber.parse("891224-2388");

    expect(firstPersonalNumber.equals(secondPersonalNumber)).toEqual(true);
  });

  it("equality should return false for instances with different personal identity numbers", () => {
    const firstPersonalNumber = PersonalIdentityNumber.parse("198912242388");
    const secondPersonalNumber = PersonalIdentityNumber.parse("19991123-2388");

    expect(firstPersonalNumber.equals(secondPersonalNumber)).toEqual(false);
  });

  it("should support '+' notation for persons older than 100 years", () => {
    const personalIdentityNumber = PersonalIdentityNumber.parse("121212+1212");
    expect(personalIdentityNumber.dateOfBirth.getFullYear()).toEqual(1912);
  });
});
