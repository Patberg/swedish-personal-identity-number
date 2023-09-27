export function luhnCheck(cardNumber: string): boolean {
  // Remove any non-digit characters
  cardNumber = cardNumber.replace(/\D/g, "");

  // Convert the card number string into an array of digits
  const digits: number[] = cardNumber.split("").map(Number);

  // Double every second digit from right to left
  for (let i = digits.length - 2; i >= 0; i -= 2) {
    let doubleDigit = digits[i] * 2;

    // If doubling results in a number greater than 9, subtract 9
    if (doubleDigit > 9) {
      doubleDigit -= 9;
    }

    digits[i] = doubleDigit;
  }

  // Sum all the digits
  const sum: number = digits.reduce((acc, digit) => acc + digit, 0);

  // If the sum is divisible by 10, the card number is valid
  return sum % 10 === 0;
}
