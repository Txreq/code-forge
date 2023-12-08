import {
  calcPasswordStrength
} from "../src/lib/index"

import { expect, test } from 'vitest'


test('Password Strength Meter', () => {
  expect(calcPasswordStrength("test")).toBe(1)
  expect(calcPasswordStrength("@StrongPassword2023!")).toBe(6)
})