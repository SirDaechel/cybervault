type UserData = {
  privateKey: string;
  publicKey: string;
  passcode: string;
  seedPhrase: string;
  addresses: object;
  balances: object;
};

type Balance = { crypto: string; value: number; investment: number };
