const generateUUID = (): string => {
  let uuid = "";
  let i = 0;
  let random: number;

  for (i; i < 32; i++) {
    random = (Math.random() * 16) | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }

    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuid;
};

export { generateUUID };
