import java.util.*;
public class vigenereCipher {

    public static final String ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    public static String SYMBOLS = "~!@#$%^&*()_-+=*/+-|\\}]{[';:\"/.,<>?\\";
    
    public static String encrypt(String message, String key) {
        StringBuilder encrypted = new StringBuilder();
        key = key.toUpperCase(); // Ensure key is uppercase

        int j = 0;
        for (char c : message.toCharArray()) {
            if (Character.isLetter(c)) {
                //index of letter in key in ALPHABET string
                int keyIndex = key.charAt(j % key.length()) - 'A';

                //index of letter in message in ALPHABET string
                int charIndex = ALPHABET.indexOf(c);

                int newCharIndex = (charIndex + keyIndex) % ALPHABET.length();
                encrypted.append(ALPHABET.charAt(newCharIndex));
                j++;
            } 
            else if (Character.isDigit(c)) {
                //key index from the first character of the key
                int keyIndex = (key.charAt(0) - 'A') % 10;

                int digitValue = Character.getNumericValue(c);
                int newDigitValue = (digitValue + keyIndex) % 10;
                encrypted.append(newDigitValue);
                j++;
            } 
            else if (isSymbol(c)) {
                
                int keyIndex =(key.charAt(0) - 'A') % SYMBOLS.length();
                int symbolIndex = SYMBOLS.indexOf(c);
                int newSymbolIndex = (symbolIndex + keyIndex) % SYMBOLS.length();
                encrypted.append(SYMBOLS.charAt(newSymbolIndex));
                j++;
            } else {
                encrypted.append(c);
            }
        }
        return encrypted.toString();
    }


    public static String decrypt(String ciphertext, String key) {
        StringBuilder decrypted = new StringBuilder();
        key = key.toUpperCase(); 
    
        int j = 0;
        for (char c : ciphertext.toCharArray()) {

            if (Character.isLetter(c)) {
                int keyIndex = key.charAt(j % key.length()) - 'A';
                int charIndex = ALPHABET.indexOf(c);
                int originalCharIndex = (charIndex - keyIndex + ALPHABET.length()) % ALPHABET.length();
                decrypted.append(ALPHABET.charAt(originalCharIndex));
                j++;
            } 

            else if (Character.isDigit(c)) {
                //key index from the first character of the key
                int keyIndex = (key.charAt(0) - 'A') % 10;

                int encryptedDigitValue = Character.getNumericValue(c);
                int decryptedDigitValue = (encryptedDigitValue - keyIndex + 10) % 10;
            
                decrypted.append(decryptedDigitValue);
                j++;
            }

            else if (isSymbol(c)) {
                int keyIndex = (key.charAt(0) - 'A') % SYMBOLS.length();
                int symbolIndex = SYMBOLS.indexOf(c);
                int originalSymbolIndex = (symbolIndex - keyIndex + SYMBOLS.length()) % SYMBOLS.length();
                decrypted.append(SYMBOLS.charAt(originalSymbolIndex));
                j++;
            } else {
                decrypted.append(c); 
            }
        }
        return decrypted.toString();
    }
    


    private static boolean isSymbol(char c) {
        String SYMBOLS = "~!@#$%^&*()_-+=*/+-|\\}]{[';:\"/.,<>?\\";
        return SYMBOLS.indexOf(c) != -1;
    }

    /* 

    // below code encrypts the message into characters which are not within the range of printable characters which makes it hard to decrypt
    public static String encrypt(String message, String key)
    {
        StringBuilder encrypted = new StringBuilder();
        key = key.toUpperCase();
        int j=0;
        for (int i = 0; i < message.length(); i++) {
            char c = message.charAt(i);
    
                int keyIndex = key.charAt(j % key.length()) - 'A';
                int charAscii = (int) c;
                int newCharAscii = (charAscii + keyIndex) % 128; 
                encrypted.append((char) newCharAscii);
                j++;
           
        }        
        return encrypted.toString();
    }

    public static String decrypt(String encrypted,String key)
    {
        StringBuilder decrypted=new StringBuilder();
        key=key.toUpperCase();
        int j=0;
        for(int i=0;i<key.length();i++)
        {
            char c = encrypted.charAt(i);
            int keyIndex=key.charAt(j%key.length())-'A';
            int charAscii=(int)c;
            int newCharAscii = (charAscii - keyIndex + 128) % 128;
            decrypted.append((char)newCharAscii);
        }

        return decrypted.toString();
    }
    */


    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter the message to encrypt: ");
        String message = sc.nextLine();

       System.out.print("Enter the key for encryption: ");
        String key = sc.nextLine();

        String encrypted = encrypt(message, key);
        System.out.println("Encrypted message: " + encrypted);

        System.out.print("Do you want to decrypt the encrypted message (y/n)? ");
        String choice = sc.nextLine().toLowerCase(); // Convert input to lowercase for easier comparison

        if (choice.equals("y")) {
            System.out.print("Enter the encrypted message to decrypt: ");
            String encryptedMessage = sc.nextLine();

            String decrypted = decrypt(encryptedMessage, key);
            System.out.println("Decrypted message: " + decrypted);
        } else {
            System.out.println("Encryption complete.");
        }

        sc.close();
    }
}