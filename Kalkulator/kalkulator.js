const kalkulator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay(){
    document.querySelector('#displayNumber').innerText = kalkulator.displayNumber;
}

function clearCalculator(){
    kalkulator.displayNumber = '0';
    kalkulator.operator = null;
    kalkulator.firstNumber = null;
    kalkulator.waitingForSecondNumber = false;
}

function inputDigit(digit){
    if(kalkulator.displayNumber === '0'){
        kalkulator.displayNumber = digit;
    } else {
        kalkulator.displayNumber += digit;
    }
}

function inverseNumber(){
    if(kalkulator.displayNumber === '0'){
        return;
    }
    kalkulator.displayNumber = kalkulator.displayNumber * -1;
}

function handleOperator(operator){
    if(!kalkulator.waitingForSecondNumber){
        kalkulator.operator = operator;
        kalkulator.waitingForSecondNumber = true;
        kalkulator.firstNumber = kalkulator.displayNumber;

        // mengatur nilai kembali ke 0 agar siap diisi angka kedua
        kalkulator.displayNumber = '0';
    } else {
        alert('Operator sudah ditekan');
    }
}

function performKalkulasi(){
    if(kalkulator.displayNumber == null || kalkulator.operator == null){
        alert('Anda belum memasukan angka ataupun operator');
        return;
    }

    let hasil = 0;
    if(kalkulator.operator === '+'){
        hasil = parseInt(kalkulator.firstNumber) + parseInt(kalkulator.displayNumber);
    } else {
        hasil = parseInt(kalkulator.firstNumber) - parseInt(kalkulator.displayNumber);
    }
     // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: kalkulator.firstNumber,
        secondNumber: kalkulator.displayNumber,
        operator: kalkulator.operator,
        result: hasil
    }

    putHistory(history);
    kalkulator.displayNumber = hasil;
    renderHistory();

}

const tombol = document.querySelectorAll('.tombol');
for (let button of tombol){
    button.addEventListener('click', function(event){
        // mendapatkan elemen objek yang di klik
        const angka = event.target;

        // jika menekan tombol CE (clear)
        if(angka.classList.contains('clear')){
            clearCalculator();
            updateDisplay();
            return;
        }
        
        // jika menekan tombol negative
        if(angka.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return;
        }
        
        // jika menekan tombol sama dengan
        if(angka.classList.contains('equals')){
            performKalkulasi();
            updateDisplay();
            return;
        }

        // jika menekan tombol operator
        if(angka.classList.contains('operator')){
            handleOperator(angka.innerText);
            return;
        }

        inputDigit(angka.innerText);
        updateDisplay();
    })
}