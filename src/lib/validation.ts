export type ContactInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ShippingInput = {
  address: string;
  city: string;
  province: string;
  postalCode: string;
};

export type PaymentInput = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

type Errors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^(\+?63|0)\d{9,11}$/;
const EXPIRY = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVC = /^\d{3,4}$/;
const POSTAL = /^\d{4}$/;

function tooShort(value: string, label: string, min = 2): string | undefined {
  return value.trim().length < min ? `${label} is required.` : undefined;
}

export function validateContact(input: ContactInput): Errors<ContactInput> {
  const errors: Errors<ContactInput> = {};

  const first = tooShort(input.firstName, "First name");
  if (first) errors.firstName = first;

  const last = tooShort(input.lastName, "Last name");
  if (last) errors.lastName = last;

  if (!EMAIL.test(input.email.trim())) errors.email = "Enter a valid email.";

  if (!PHONE.test(input.phone.replace(/[^\d+]/g, ""))) {
    errors.phone = "Enter a valid PH phone number.";
  }

  const subject = tooShort(input.subject, "Subject", 4);
  if (subject) errors.subject = subject;

  const message = tooShort(input.message, "Message", 10);
  if (message) errors.message = message;

  return errors;
}

export function validateShipping(input: ShippingInput): Errors<ShippingInput> {
  const errors: Errors<ShippingInput> = {};

  const address = tooShort(input.address, "Address", 4);
  if (address) errors.address = address;

  const city = tooShort(input.city, "City");
  if (city) errors.city = city;

  const province = tooShort(input.province, "Province");
  if (province) errors.province = province;

  if (!POSTAL.test(input.postalCode.trim())) {
    errors.postalCode = "Enter a valid 4-digit postal code.";
  }

  return errors;
}

export function validatePayment(input: PaymentInput): Errors<PaymentInput> {
  const errors: Errors<PaymentInput> = {};

  const name = tooShort(input.cardName, "Name on card");
  if (name) errors.cardName = name;

  const digits = input.cardNumber.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(digits)) {
    errors.cardNumber = "Enter a valid card number.";
  }

  if (!EXPIRY.test(input.expiry.trim())) {
    errors.expiry = "Use MM/YY with month 01–12.";
  }

  if (!CVC.test(input.cvc.trim())) {
    errors.cvc = "CVC must be 3–4 digits.";
  }

  return errors;
}
