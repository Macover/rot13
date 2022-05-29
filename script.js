"use strict"

const messageInputDE = document.getElementById('messageInputDE');
const rotInputDE = document.getElementById('rotInputDE');


/* CONSTANTS */
const LATIN_ALPHABET = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

messageInputDE.addEventListener('input',(e)=>{

    const ORIGINAL_MESSAGE = e.target.value;
    /* call the method to return the new string and insert it into the rotInputDE's value */
    const decorderRotMessage = decodeRot(ORIGINAL_MESSAGE);
    rotInputDE.value = decorderRotMessage;

});

const decodeRot = ORIGINAL_MESSAGE =>{
    let decorderRotNewMessage = '';
    for (let i = 0; i < ORIGINAL_MESSAGE.length; i++) {        
        decorderRotNewMessage += newLetterRot(ORIGINAL_MESSAGE[i]);    
    }
    return decorderRotNewMessage;    
}
const newLetterRot = letter =>{
    let newLetter = '';
    for (let i = 0; i < LATIN_ALPHABET.length; i++) {
        if(letter === LATIN_ALPHABET[i]){       
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
