"use strict"

const messageInputDE = document.getElementById('messageInputDE');
const rotInputDE = document.getElementById('rotInputDE');
const matrixInputDE = document.getElementById('matrixInputDE');

const rotInputEN = document.getElementById('rotInputEN');
const inverseInputMatrixDE = document.getElementById('inverseInputMatrixDE');


/* CONSTANTS */
const LATIN_ALPHABET = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const USA_ALPHABET = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
const MATRIX = [
    [1, 0, 2],
    [2, -1, 1],
    [1, 3, 0]    
];
const INVERSE_MATRIX = [
    [-3 / 11, 6 / 11, 2 / 11],
    [1 / 11, -2 / 11, 3 / 11],
    [7 / 11, -3 / 11, -1 / 11]
];

messageInputDE.addEventListener('input',(e)=>{

    const ORIGINAL_MESSAGE = e.target.value;    
    
    /* call the method to return the new string and insert it into the rotInputDE's value */
    const encryptedRot13Message = encodeRot13(ORIGINAL_MESSAGE);
    rotInputDE.value = encryptedRot13Message;

    /* call the method to return the new string and insert it into the matrixInputDE's value */
    const encryptedMatrixMessage = encodeMatrix(encryptedRot13Message);
    matrixInputDE.value = encryptedMatrixMessage;

    /* call the method to return the new string and insert it into the inverseInputMatrixDE's value */
    const decryptedMatrixMessage = decodeMatrix(encryptedMatrixMessage);
    inverseInputMatrixDE.value = decryptedMatrixMessage; 

    /* call the method to return the new string and insert it into the matrixInputEN's value */
    const initialMessage = decodeMessageMatrix(decryptedMatrixMessage);
    rotInputEN.value = initialMessage;
});

const decodeNumbers = array =>{
    const newArray = [];
    for (let i = 0; i < INVERSE_MATRIX.length; i++) {
        let sum = 0;
        for (let j = 0; j < array.length; j++) {            
            sum += array[j] * INVERSE_MATRIX[i][j];
        }               
        newArray.push(Math.round(sum));
    }    
    return newArray;
}
const decodeMatrix = encryptedMatrixMessage =>{        
    const decryptedMatrixMessage = [];                 
    for (let i = 0; i < encryptedMatrixMessage.length; i++) {                
        decryptedMatrixMessage.push(decodeNumbers(encryptedMatrixMessage[i]));
    }        
    return decryptedMatrixMessage;    
}
const decodeMessageMatrix = decryptedMatrixMessage =>{
    let initialMessage = '';
    for (let i = 0; i < decryptedMatrixMessage.length; i++) {
        for (let j = 0; j < decryptedMatrixMessage[i].length; j++) {
            initialMessage += getLetter(decryptedMatrixMessage[i][j]);            
        }
    }
    console.log(decryptedMatrixMessage)
    return initialMessage;
}
const getLetter = number =>{
    if(number == 28) return '.';
    else if(number == 0) return ' ';
    else return USA_ALPHABET[number - 1];
}
const getNumber = letter =>{    
    if(letter == " ") return 0;
    if(letter == ".") return 28;
    if(letter == 'a' || letter == 'A') return 1;
    if(USA_ALPHABET.indexOf(letter.toString().toLowerCase())) return USA_ALPHABET.indexOf(letter.toString().toLowerCase()) + 1;        
}
const stringToStringNumbers = string =>{
    let stringNumbers = '';    
    for (let i = 0; i < string.length; i++) {        
        if(i == string.length - 1) stringNumbers += getNumber(string[i]);
        else stringNumbers += getNumber(string[i]) + ",";     
    }    
    return stringNumbers;
}
const encodeNumbers = array =>{
    const newArray = [];
    for (let i = 0; i < MATRIX.length; i++) {
        let sum = 0;
        for (let j = 0; j < array.length; j++) {            
            sum += array[j] * MATRIX[i][j];
        }               
        newArray.push(sum);
    }    
    return newArray;
}
const encodeMatrix = (encryptedRot13Message) =>{
    
    const stringNumbers = stringToStringNumbers(encryptedRot13Message);
    const arrayNumbers = stringNumbers.split(",");    
    const encryptedMatrixMessage = [];
    let accountant = 0;
    
    for (let i = 0; i < arrayNumbers.length; i++) {        
        const newArray = arrayNumbers.slice(accountant, accountant + 3);
        accountant += 3;        
        if(newArray.length != 0){
            encryptedMatrixMessage.push(encodeNumbers(newArray));         
        }        
    }    
    return encryptedMatrixMessage;
}
const encodeRot13 = ORIGINAL_MESSAGE =>{    
    let decorderRotNewMessage = '';
    for (let i = 0; i < ORIGINAL_MESSAGE.length; i++) {        
        decorderRotNewMessage += newLetterRot(ORIGINAL_MESSAGE[i]);    
    }
    return decorderRotNewMessage;    
}
const newLetterRot = letter =>{
    let newLetter = '';
    for (let i = 0; i < LATIN_ALPHABET.length; i++) {
        if(letter === LATIN_ALPHABET[i] || letter === LATIN_ALPHABET[i].toUpperCase()){       
            if(LATIN_ALPHABET.includes(LATIN_ALPHABET[i + 13])){
                newLetter = LATIN_ALPHABET[i + 13];        
            }else{
                let position = LATIN_ALPHABET.length - LATIN_ALPHABET.indexOf(LATIN_ALPHABET[i]);                
                newLetter = LATIN_ALPHABET[13 - position];
            }                     
        }             
        if(letter === ' ') newLetter = ' ';
        if(letter === 'ñ') newLetter = 'ñ';
    }
    return newLetter;
}
