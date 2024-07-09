import transliterate from "transliterate";

const toUrlFriendly = (str) => {
    return transliterate(str).replace(/\s+/g, '-').toLowerCase();
};

export { toUrlFriendly };
