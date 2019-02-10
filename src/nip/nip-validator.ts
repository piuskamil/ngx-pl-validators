import { AbstractControl } from "@angular/forms";
import zip from "lodash.zip";

const WEIGHTS = [6, 5, 7, 2, 3, 4, 5, 6, 7];
const MODULE_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export function nipValidator(
  control: AbstractControl
): { [key: string]: string } {
  let value: string = control.value;
  if (value.trim() === "") {
    value = null;
  }
  if (value == null) {
    return;
  }
  value = value.replace(/[\s-]/g, "");
  if (["0000000000"].includes(value)) {
    return { nip: control.value };
  }
  const values: string[] = value.split("");
  if (values.length !== 10) {
    return { nip: control.value };
  }
  const ctrl = values.pop();
  const sum = zip(values, WEIGHTS).reduce(
    (memo: number, val: [string, number]) => memo + val[1] * +val[0],
    0
  );
  value = "" + MODULE_VALUES[sum % MODULE_VALUES.length];
  if (value !== ctrl) {
    return { nip: control.value };
  }
}