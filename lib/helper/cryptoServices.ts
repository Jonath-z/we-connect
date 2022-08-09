import cryptojs from "crypto-js";
import { CRYPTO_SECRET_KEY } from "lib/constants";

class CryptoService {
  encrypt(data: string) {
    if (data)
      return cryptojs.AES.encrypt(data, CRYPTO_SECRET_KEY as string).toString();
  }

  decrypt(data: string) {
    if (data)
      return cryptojs.AES.decrypt(data, CRYPTO_SECRET_KEY as string).toString(
        cryptojs.enc.Utf8
      );
  }
}

const cryptoServices = new CryptoService();

export default cryptoServices;
