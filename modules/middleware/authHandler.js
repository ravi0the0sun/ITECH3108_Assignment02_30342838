import sodium from "https://deno.land/x/sodium@0.2.0/basic.ts";

await sodium.ready;

export function pwHashing(pw) {
    return sodium.crypto_pwhash_str(pw, sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE, sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE);
}

export function pwVerify(pw, pwHash) {
    return sodium.crypto_pwhash_str_verify(pw, pwHash);
}

// const pwHash = pwHashing('hello');
// console.log(pwHash);
// console.log(pwVerify('$argon2id$v=19$m=65536,t=2,p=1$eO90vcH43hWLh/NPvIzbWw$5GE09iJZMyAEe7jG2b6luprv8CI4LnqFfRK94Ohsn+A', 'hello'))