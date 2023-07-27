/*
 * Base64 Lib
 */
class Base64 {
    static Encode(a) {
        return btoa(a);
    }

    //Decode string
    static Decode(a) {
        return atob(a);
    }
}