import { daysInMonth } from "./dateUtilities";
import { luhnCheck } from "./luhn";

export class PersonalIdentityNumber {
  static PERSONAL_IDENTITY_NUMBER_REGEX = /^(\d{2}){0,1}(\d{2})(\d{2})(\d{2})([+\-\s]?)(\d{3})(\d)/;

  private constructor(
    readonly dateOfBirth: Date,
    readonly digits: number,
    readonly gender: "Male" | "Female",
    readonly isTemporaryNumber: boolean = false,
  ) {}

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
      return new PersonalIdentityNumber(new Date(parsedYear, parsedMonth, parsedDay), parseInt(digits), gender);
    }

    const birthDay = parsedDay - 60;

    if (birthDay <= 0 || birthDay > daysInBirthMonth) {
      throw new Error(`The number '${personalIdentityNumber}' is not a valid social security number.`);
    }

    return new PersonalIdentityNumber(new Date(parsedYear, parsedMonth, birthDay), parseInt(digits), gender, true);
  }

  static tryParse(personalIdentityNumber: string): PersonalIdentityNumber | null {
    try {
      return PersonalIdentityNumber.parse(personalIdentityNumber);
    } catch (error) {
      return null;
    }
  }

  toString(): string {
    if (this.isTemporaryNumber) {
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
  toShortString = (): string => this.toString().slice(2);
}
