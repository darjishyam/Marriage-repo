// Test script for password regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const testCases = [
    { password: "password123!", expected: false, desc: "Lowercase only" },
    { password: "PASSWORD123!", expected: false, desc: "Uppercase only (missing lowercase)" },
    { password: "Password123!", expected: true, desc: "Valid password" },
    { password: "Pass1!", expected: false, desc: "Too short" },
    { password: "Passwordno", expected: false, desc: "No number/special" },
    { password: "Password123", expected: false, desc: "No special char" },
];

console.log("Running Regex Tests...\n");

testCases.forEach(({ password, expected, desc }) => {
    const result = passwordRegex.test(password);
    const status = result === expected ? "PASS" : "FAIL";
    console.log(`[${status}] ${desc}: "${password}" -> ${result} (Expected: ${expected})`);
});
