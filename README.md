# Swedish Personal Identity Number Library

![CI](https://github.com/Patberg/swedish-personal-identity-number/actions/workflows/main.yml/badge.svg) ![CD](https://github.com/Patberg/swedish-personal-identity-number/actions/workflows/publish.yml/badge.svg) ![npm](https://img.shields.io/npm/v/swedish-personal-identity-number?logo=npm)

## Overview

This library, named `swedish-personal-identity-number`, offers a robust solution for managing Swedish personal identity numbers. It ensures that input data matches the expected format and offers detailed insights about the parsed number, including date of birth, gender, and place of birth.

For a deeper understanding of Swedish personal identity numbers, refer to the [Wikipedia documentation](<https://en.wikipedia.org/wiki/Personal_identity_number_(Sweden)>).

## Installation

To use this library, you can install it using npm, yarn, or pnpm:

### npm

```bash
npm install swedish-personal-identity-number
```

### Yarn

```bash
yarn add swedish-personal-identity-number
```

### pnpm

```bash
pnpm add swedish-personal-identity-number
```

## Module Support

This library supports both **ES Modules** and **CommonJS**.

Then, depending on your environment and setup, you can import it:

```javascript
// Using ES Modules
import { PersonalIdentityNumber } from "swedish-personal-identity-number";

// Using CommonJS
const { PersonalIdentityNumber } = require("swedish-personal-identity-number");
```

## Key Features

1. **Regex Based Validation** - Uses a regular expression to quickly validate the format of a given personal identity number.
2. **Luhn Algorithm Check** - Ensures that the checksum of the number is valid.
3. **Gender Identification** - Determines gender based on the personal identity number.
4. **Date and Place of Birth** - Parses the date of birth and potentially the place of birth if it's available.
5. **Coordination Number Identification** - Determines if a number is a coordination number rather than a standard personal identity number.

## Supported Formats

The `parse` and `tryParse` methods of the `PersonalIdentityNumber` class can handle a variety of formats commonly used for Swedish personal identity numbers. Specifically, the library supports the following formats:

1. Full with century and without hyphen: `YYYYMMDDXXXX`  
   Example: `199911232388`

2. Full with century and with hyphen: `YYYYMMDD-XXXX`  
   Example: `19991123-2388`

3. Short without century and without hyphen: `YYMMDDXXXX`  
   Example: `9911232388`

4. Short without century and with hyphen: `YYMMDD-XXXX`  
   Example: `991123-2388`

It's crucial to ensure that the provided personal identity number adheres to one of these formats for correct parsing and processing.

---

## API Documentation

### Class: PersonalIdentityNumber

#### Static Methods

##### `parse(personalIdentityNumber: string): PersonalIdentityNumber`

- Parses the given Swedish personal identity number string.
- Throws an error if the input number is invalid or doesn't pass the Luhn check.
- Returns an instance of `PersonalIdentityNumber`.

##### `tryParse(personalIdentityNumber: string): PersonalIdentityNumber | null`

- Tries to parse the given string.
- Returns an instance of `PersonalIdentityNumber` if successful, otherwise returns null.

#### Instance Methods

##### `toString(): string`

- Converts the current instance of `PersonalIdentityNumber` to a string representation with century and with hyphen: `YYYYMMDD-XXXX`  
  Example: `19991123-2388`

##### `toShortString(): string`

- Returns a shortened string representation of the personal identity number by slicing off the century part.
  Example: `991123-2388`

##### `equals(other: PersonalIdentityNumber): boolean`

- Compares the current instance with another `PersonalIdentityNumber` instance.
- Returns `true` if both instances represent the same number, otherwise `false`.

#### Properties

- `dateOfBirth: Date` - Represents the date of birth extracted from the personal identity number.
- `digits: number` - The last four digits of the personal identity number.
- `gender: "Male" | "Female"` - Gender derived from the personal identity number.
- `placeOfBirth: PlaceOfBirth` - Represents the place of birth which might be unknown for numbers after 1990.
- `isCoordinationNumber: boolean` - Indicates if the number is a coordination number.

The supported places of birth include:

    Stockholms stad
    Stockholms län
    Uppsala län
    Södermanlands län
    Östergötlands län
    Jönköpings län
    Kronobergs län
    Kalmar län
    Gotlands län
    Blekinge län
    Kristianstads län
    Malmöhus län
    Hallands län
    Göteborgs och Bohus län
    Älvsborgs län
    Skaraborgs län
    Värmlands län
    Örebro län
    Västmanlands län
    Kopparbergs län
    Gävleborgs län
    Västernorrlands län
    Jämtlands län
    Västerbottens län
    Norrbottens län

Additionally, there is an "Unknown" option that is used when the place of birth is not determined.

## Usage Example

```javascript
import { PersonalIdentityNumber } from "path-to-library";

const pin = "YYMMDD-XXXX";

const result = PersonalIdentityNumber.tryParse(pin);

if (result) {
  console.log("Date of Birth:", result.dateOfBirth);
  console.log("Gender:", result.gender);
  console.log("Place of Birth:", result.placeOfBirth);
  console.log("Is Coordination Number:", result.isCoordinationNumber);
} else {
  console.error("Invalid Personal Identity Number.");
}
```

## Repository & Author

- **GitHub Repository**: [swedish-personal-identity-number](https://github.com/Patberg/swedish-personal-identity-number.git)
- **Author**: [Patrik Bergström](https://github.com/svenheden)
- **License**: MIT

## Contribution

For any issues, improvements, or feature requests, please create an issue or pull request on the [GitHub repository](https://github.com/Patberg/swedish-personal-identity-number.git). Feedback is highly appreciated!

---
