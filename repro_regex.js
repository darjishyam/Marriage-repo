const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const testCases = [
    "123456",
    "abcdef",
    "123456ab",
    "123456!",
    "abcdef!",
    "123456abc!", // Valid
    "1a!", // Too short
    "password",
    "Password123", // No special
    "Password123!", // Valid
];

testCases.forEach(pwd => {
    const isValid = passwordRegex.test(pwd);
    console.log(`Password: "${pwd}" -> Valid: ${isValid}`);
});
