const stepTypes = {
    START: 'STEP_TYPE_START',
    QUESTION: 'STEP_TYPE_QUESTION',
    END: 'STEP_TYPE_END',
};

const answerTypes = {
    OPEN: 'ANSWER_TYPE_OPEN',
    MULTI: 'ANSWER_TYPE_MULTI',
    RADIO: 'ANSWER_TYPE_RADIO',
    YESNO: 'ANSWER_TYPE_YESNO',
};

const systemMessages = {
    // start: 'Welcome to The Voice of KNAB. Please say "start" to begin.',
    start: 'Welcome',
    yourChoice: 'You have chosen "{{var1}}"',
    isThisCorrect: 'Is this correct?',
    youHaveChosen: 'You have chosen',
    didntUnderstand: 'I did not get that. Could you please repeat.',
    anotherOption: 'Choose another option.',
    anotherAddress: 'Ok, Choose another address.',
    end: 'You have completed the questionnaire. The amount to pay is {{var1}}',
};

const getSystemMessage = (key, vars = []) => {
    let msg = systemMessages[key];
    vars.forEach((val, i) => {
        msg = msg.replace(`{{var${i}}}`, val);
    });

    return msg;
};

const steps = [
    {
        id: 0,
        type: stepTypes.START,
        keywords: ['start', 'begin', 'initiate'],
    },
    {
        id: 1,
        type: stepTypes.QUESTION,
        answer: answerTypes.OPEN,
        title: 'Please enter your address.',
    },
    {
        id: 2,
        type: stepTypes.QUESTION,
        answer: answerTypes.RADIO,
        title: 'What is your house type',
        options: [
            {
                label: 'Apartment',
                keywords: ['one', 'first', 'apartment', '1'],
                weight: 2.5,
            },
            {
                label: 'Villa',
                keywords: ['two', 'second', 'villa', '2'],
                weight: 3.5,
            },
            {
                label: 'Canal house',
                keywords: ['three', 'third', 'canal', 'canal house', '3'],
                weight: 0.5,
            },
        ],
    },
    {
        id: 3,
        type: stepTypes.QUESTION,
        answer: answerTypes.YESNO,
        title: 'Is your Foundation with Piling? ',
        options: [
            {
                label: 'Yes',
                keywords: ['yes', 'affirmative'],
                weight: 250,
            },
            {
                label: 'No',
                keywords: ['no', 'denied'],
                weight: 0,
            },
        ],
    },

];

const voices = speechSynthesis.getVoices();

module.exports = {
    steps,
    answerTypes,
    getSystemMessage,
    stepTypes,
    voices,
}