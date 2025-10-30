import apiService from "../services/api";
import CryptoJS from "crypto-js";

const { apiEndpoints, essApi } = apiService;

const SECRET_KEY = "Kh&3#hd@9HmedGhd"; // Your AES Key
const INIT_VECTOR = "P3@1Gh!&laT#$rfe"; // Your AES IV

// Encrypt Function
function encryptData(data) {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(INIT_VECTOR);

  const encrypted = CryptoJS.AES.encrypt(data, key, {
    keySize: 16,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return encrypted.toString(); // Base64
}

// Decrypt Function
function decryptData(encryptedData) {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(INIT_VECTOR);

  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    keySize: 16,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

// Login function with encryption - Using FETCH (not axios)
export const loginUser = async (userName, password) => {
  try {
    const payload = {
      userName: userName,
      password: password,
      currentTimeMillis: new Date().getTime(),
    };

    console.log("What I sent", payload);

    // Encrypt the entire payload object as JSON string
    const encryptedPayload = encryptData(JSON.stringify(payload));
    console.log("Encrypted Payload:", encryptedPayload);
    
    const decryptedCheck = decryptData(encryptedPayload);
    console.log("Decrypted payload:", decryptedCheck);

const response = await fetch(
  apiEndpoints.loginV2(),
  {
    method: "POST",
    headers: essApi.defaults.headers,
    body: encryptedPayload
  }
);
console.log(response);

    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const responseData = await response.json();

    const { statusCode, message, response: userData } = responseData;
const decryptedResponse = decryptData(userData);
console.log(decryptedResponse, 'decryptedresponse')
    
    // Parse decrypted response if it's a JSON string
    let parsedData;
    try {
      parsedData = JSON.parse(decryptedResponse);
    } catch (e) {
      parsedData = decryptedResponse;
    }

    if (statusCode === "ESS-000" && message === "Success") {
      return { success: true, data: parsedData || userData };
    }

    return { success: false, message: message || "Login failed" };
  } catch (error) {
   
    return { success: false,  };
  }
};
