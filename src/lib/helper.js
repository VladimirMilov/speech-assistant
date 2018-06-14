export const phraseMatches = (phrase, keywords) => {
    console.log(phrase, keywords);
    let found = false;
    phrase.split(' ').forEach(word => {
        if (keywords.indexOf(word.toLowerCase()) !== -1) {
            found = true;
        }
    });
    console.log('found', found);
    return found;
};
