function binaryToDecimal(e: Event): any {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const binaryNumber = formData.get("binary-number")?.toString();
    return binaryNumber?.split('').reverse().reduce((carryValue , item, index) => {
        return item === "1" ? carryValue + Math.pow(2, index) : carryValue;
    }, 0);
}

const calculatorForm = document.querySelector("#binary-calculator");

if (calculatorForm) {
    calculatorForm.addEventListener("submit", (e) => {
       const convertedValue = binaryToDecimal(e);
       const resultContainer = document.querySelector("#result");

       if (!convertedValue || !resultContainer) return;

       resultContainer.innerHTML = convertedValue;
    });
}


