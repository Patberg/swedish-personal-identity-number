import { daysInMonth } from "./dateUtilities";
import { luhnCheck } from "./luhn";
import { PlaceOfBirth, getPlaceOfBirth } from "./placeOfBirth";

/**
 * Represents a Swedish personal identity number.
 */
export class PersonalIdentityNumber {
  static PERSONAL_IDENTITY_NUMBER_REGEX = /^(\d{2}){0,1}(\d{2})(\d{2})(\d{2})([+\-\s]?)(\d{3})(\d)/;

  /**
   * Date of birth of the person.
   */
  readonly dateOfBirth: Date;

  /**
   * Four-digit personal code.
   */
  readonly digits: number;

  /**
   * Gender of the person, can be either "Male" or "Female".
   */
  readonly gender: "Male" | "Female";

  /**
   * The region or municipality of birth.
   */
  readonly placeOfBirth: PlaceOfBirth;

  /**
   * Indicates if the personal identity number is a co-ordination number.
   */
  readonly isCoordinationNumber: boolean;

  private constructor(
    dateOfBirth: Date,
    digits: number,
    gender: "Male" | "Female",
    placeOfBirth: PlaceOfBirth = "Unknown",
    isCoordinationNumber: boolean = false,
  ) {
    this.dateOfBirth = dateOfBirth;
    this.digits = digits;
    this.gender = gender;
    this.placeOfBirth = placeOfBirth;
    this.isCoordinationNumber = isCoordinationNumber;
  }

  /**
   * Parses a string representation of a personal identity number and returns a new `PersonalIdentityNumber` instance.
   * Throws an error if the provided string is not a valid personal identity number.
   *
   * @param personalIdentityNumber - The string representation of a personal identity number. The string can be in any of the following formats: YYYYMMDD-XXXX, YYMMDD-XXXX, YYYYMMDDXXXX, YYMMDDXXXX, YYMMDD+XXXX, YYMMDD XXXX, YYMMDDXXXX.
   * @returns A new `PersonalIdentityNumber` instance.
   * @throws {Error} Throws an error if the argument is not a valid personal identity number.
   */
  static parse(personalIdentityNumber: string): PersonalIdentityNumber {
    if (personalIdentityNumber === undefined) {
      throw new Error("personalIdentityNumber is undefined");
    }

    const match = personalIdentityNumber.match(PersonalIdentityNumber.PERSONAL_IDENTITY_NUMBER_REGEX);

    if (match === null) {
      throw new Error("personalIdentityNumber is not valid");
    }

    if (match.length < 1 || match.length < 7) {
      throw new Error("personalIdentityNumber is not valid");
    }

    const decade = parseInt(match[2]);

    let century: string;

    if (match[1]) {
      century = match[1];
    } else {
      let born = new Date().getFullYear() - decade;
      if (match[5].length !== 0 && match[5] === "+") {
        born -= 100;
      }

      century = born.toString().substring(0, 2);
    }

    const month = match[3];
    const day = match[4];
    const digits = `${match[6]}${match[7]}`;

    if (!luhnCheck(`${decade}${month}${day}${digits}`)) {
      throw new Error(`The checksum ${digits} is not a valid checksum for the social seurity number ${personalIdentityNumber}`);
    }

    const parsedDay = parseInt(day);
    const parsedYear = parseInt(`${century}${decade}`);
    const parsedMonth = parseInt(month) - 1;

    const daysInBirthMonth = daysInMonth(parsedYear, parsedMonth);

    const gender = parseInt(digits[2]) % 2 === 0 ? "Female" : "Male";

    if (parsedDay <= daysInBirthMonth) {
      return new PersonalIdentityNumber(
        new Date(parsedYear, parsedMonth, parsedDay),
        parseInt(digits),
        gender,
        parsedYear < 1990 ? getPlaceOfBirth(digits) : "Unknown",
      );
    }

    const birthDay = parsedDay - 60;

    if (birthDay <= 0 || birthDay > daysInBirthMonth) {
      throw new Error(`The number '${personalIdentityNumber}' is not a valid social security number.`);
    }

    return new PersonalIdentityNumber(new Date(parsedYear, parsedMonth, birthDay), parseInt(digits), gender, "Unknown", true);
  }

  /**
   *
   * @param personalIdentityNumber - The string representation of a personal identity number. The string can be in any of the following formats: YYYYMMDD-XXXX, YYMMDD-XXXX, YYYYMMDDXXXX, YYMMDDXXXX, YYMMDD+XXXX, YYMMDD XXXX, YYMMDDXXXX.
   * @returns A new `PersonalIdentityNumber` instance or null if the argument is not a valid personal identity number.
   */
  static tryParse(personalIdentityNumber: string): PersonalIdentityNumber | null {
    try {
      return PersonalIdentityNumber.parse(personalIdentityNumber);
    } catch (error) {
      return null;
    }
  }

  /**
   * Returns a string representation of the personal identity number in the format YYYYMMDD-XXXX.
   *
   */

  toString(): string {
    if (this.isCoordinationNumber) {
      const formattedDate = `${this.dateOfBirth.getFullYear()}${(this.dateOfBirth.getMonth() + 1).toString().padStart(2, "0")}`;
      const day = this.dateOfBirth.getDate() + 60;
      const checkSum = this.digits.toString().padStart(4, "0");
      return `${formattedDate}${day}-${checkSum}`;
    } else {
      const formattedDate = `${this.dateOfBirth.getFullYear()}${(this.dateOfBirth.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${this.dateOfBirth.getDate().toString().padStart(2, "0")}`;
      const checkSum = this.digits.toString().padStart(4, "0");
      return `${formattedDate}-${checkSum}`;
    }
  }

  /*
   * Returns a short string representation of the personal identity number in the format YYMMDD-XXXX.
   */

  toShortString = (): string => this.toString().slice(2);

  equals = (other: PersonalIdentityNumber): boolean => this.toString() === other.toString();
}
