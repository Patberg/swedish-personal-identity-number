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
    "valid temporary personal number %s should not throw error",
    (personalNumber) => {
      expect(() => PersonalIdentityNumber.parse(personalNumber)).not.toThrow();
    },
  );

  it.each(["199911232388", "19991123-2388", "9911232388", "19991123-2388"])("should be able to parse a valid personal number", (input) => {
    const personalNumber = PersonalIdentityNumber.parse(input);
    expect(personalNumber.dateOfBirth).toEqual(new Date(1999, 10, 23));
    expect(personalNumber.digits).toEqual(2388);
    expect(personalNumber.isTemporaryNumber).toEqual(false);
  });

  it.each(["19920873-2389", "199208732389", "9208732389", "920873-2389"])(
    "should be able to parse a valid temporary personal number",
    (input) => {
      const personalNumber = PersonalIdentityNumber.parse(input);
      expect(personalNumber.dateOfBirth).toEqual(new Date(1992, 7, 13));
      expect(personalNumber.digits).toEqual(2389);
      expect(personalNumber.isTemporaryNumber).toEqual(true);
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
      expect(personalNumber!.isTemporaryNumber).toEqual(false);
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
});
