const fs = require('fs');

const readFileCallback = async (error, data) => {
    if(error) {
        console.log("Gagal membaca berkas...");
        return
    }

    console.log(`menggunakan callback function : \n ${data} \n`);
}


fs.readFile('notes.txt', 'utf-8', readFileCallback)
const data = fs.readFileSync('./notes.txt', 'utf-8')

console.log(`menggunakan package fs bawaan : \n ${data} \n`);