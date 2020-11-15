import { Matches } from "class-validator";

export function NoLeadingOrLailingSpace() {
  return Matches(/(^[^\s]).*([^\s]$)/, { message: '$property should not have leading or tailing space' });
}
