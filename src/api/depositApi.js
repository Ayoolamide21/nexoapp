// src/api/depositApi.js

import { apiFetch } from "/src/api/client";


export const fetchPaymentGateways = async () => {
  return await apiFetch("/api/payment-gateways", {
    method: "GET",
  });
};

export const makeDeposit = async (amount, paymentMethod, currency = null) => {
  const body = {
    amount,
    payment_method: paymentMethod,
  };

  // Only add currency if using nowpayment
  if (paymentMethod === "nowpayment") {
    body.currency = currency || "btc";
  }

  return await apiFetch("/api/deposit", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const fetchTotalDeposits = async () => {
  return await apiFetch("/api/deposits/total", {
    method: "GET",
  });
};
