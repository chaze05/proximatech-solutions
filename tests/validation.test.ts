import test from "node:test";
import assert from "node:assert/strict";
import {
  validateContact,
  validateShipping,
  validatePayment,
} from "../src/lib/validation.ts";

const goodContact = {
  firstName: "Rani",
  lastName: "Rubillos",
  email: "rani@example.com",
  phone: "+63 976 339 4297",
  subject: "RFID inquiry",
  message: "We need RFID tracking for two warehouses.",
};

test("valid contact returns no errors", () => {
  assert.deepEqual(validateContact(goodContact), {});
});

test("whitespace-only name rejected", () => {
  const errors = validateContact({ ...goodContact, firstName: "   " });
  assert.ok(errors.firstName);
});

test("bad email rejected", () => {
  const errors = validateContact({ ...goodContact, email: "a@b" });
  assert.ok(errors.email);
});

test("short message rejected", () => {
  const errors = validateContact({ ...goodContact, message: "hi" });
  assert.ok(errors.message);
});

test("phone rejects junk and accepts PH formats", () => {
  assert.ok(validateContact({ ...goodContact, phone: "abc" }).phone);
  assert.equal(
    validateContact({ ...goodContact, phone: "0284040644" }).phone,
    undefined
  );
  assert.equal(
    validateContact({ ...goodContact, phone: "09763394297" }).phone,
    undefined
  );
});

test("shipping validation", () => {
  assert.deepEqual(
    validateShipping({
      address: "12 Mabini St",
      city: "Sta. Rosa",
      province: "Laguna",
      postalCode: "4026",
    }),
    {}
  );
  assert.ok(
    validateShipping({
      address: "",
      city: "Sta. Rosa",
      province: "Laguna",
      postalCode: "4026",
    }).address
  );
  assert.ok(
    validateShipping({
      address: "12 Mabini",
      city: "Sta. Rosa",
      province: "Laguna",
      postalCode: "40",
    }).postalCode
  );
});

test("payment validation", () => {
  const good = {
    cardName: "Rani M Rubillos",
    cardNumber: "4111 1111 1111 1111",
    expiry: "09/29",
    cvc: "123",
  };
  assert.deepEqual(validatePayment(good), {});
  assert.ok(validatePayment({ ...good, expiry: "13/28" }).expiry);
  assert.ok(validatePayment({ ...good, cvc: "12" }).cvc);
  assert.ok(validatePayment({ ...good, cardNumber: "1234" }).cardNumber);
});

import { validateCheckoutContact } from "../src/lib/validation.ts";

test("checkout contact validation (subset)", () => {
  assert.ok(validateCheckoutContact({ firstName: "", lastName: "R", email: "x", phone: "1" }).firstName);
  assert.deepEqual(
    validateCheckoutContact({
      firstName: "Rani",
      lastName: "Rubillos",
      email: "rani@example.com",
      phone: "+63 976 339 4297",
    }),
    {}
  );
});

test("payment rejects expired cards", () => {
  const base = {
    cardName: "Rani M Rubillos",
    cardNumber: "4111 1111 1111 1111",
    cvc: "123",
  };
  assert.ok(validatePayment({ ...base, expiry: "09/20" }).expiry);
  assert.ok(validatePayment({ ...base, expiry: "01/25" }).expiry);
  assert.deepEqual(validatePayment({ ...base, expiry: "09/29" }), {});
});
