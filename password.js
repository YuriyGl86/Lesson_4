function getPasswordChecker(password) {
    const correctPassword = password;
    function passwordChecker(passwordTry){
        return passwordTry === correctPassword
    };
    return passwordChecker
};

pas1 = getPasswordChecker('qwerty');
console.log(pas1('Qwerty')) // false
console.log(pas1('qwert'))  // false
console.log(pas1('qwerty1'))  // false
console.log(pas1('qwerty'))  // true