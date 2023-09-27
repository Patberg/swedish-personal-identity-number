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

  it.each(["199911232388", "19991123-2388", "9911232388", "19991123-2388"])("should be able to parse a valid personal number", (input) => {
    const personalNumber = PersonalIdentityNumber.parse(input);
    expect(personalNumber.dateOfBirth).toEqual(new Date(1999, 10, 23));
    expect(personalNumber.digits).toEqual(2388);
    expect(personalNumber.isTemporaryNumber).toEqual(false);
  });
});
