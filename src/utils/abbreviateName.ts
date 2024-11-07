export function abbreviateLastName(fullName: string) {
  const nameParts = fullName.split(" ");

  if (nameParts.length < 2) {
    // If the full name doesn't contain at least two parts, return the full name as is
    return fullName;
  }

  const firstName = nameParts[0];
  const lastName = nameParts[1];

  // Abbreviate the last name to its first letter followed by a period
  const abbreviatedLastName = lastName.charAt(0).toUpperCase() + ".";

  return `${firstName} ${abbreviatedLastName}`;
}
