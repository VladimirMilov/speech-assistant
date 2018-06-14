const answerTypes = {
    OPEN: 'ANSWER_TYPE_OPEN',
    MULTI: 'ANSWER_TYPE_MULTI',
    RADIO: 'ANSWER_TYPE_RADIO',
    YESNO: 'ANSWER_TYPE_YESNO',
}

const systemMessages = {
    start: 'Welcome to The Voice of KNAB. Please say "start" to begin.',
    yourChoice: 'You have chosen "{{var1}}"',
    isThisCorrect: 'Is this correct?',
    youHaveChosen: 'You have chosen',
    didntUnderstand: 'I did not get that. Could you please repeat.',
    anotherOption: 'I did not get that. Could you please repeat.',
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
        component: 'Start',
        keywords: ['start', 'begin', 'initiate'],
    },
    {
        id: 1,
        component: 'Question',
        answer: answerTypes.RADIO,
        title: 'Multichoice question?',
        options: [
            {
                label: 'Option 1',
                keywords: ['option one', 'first',  'real answer'],
                weight: 2.5,
            },
            {
                label: 'Option 2',
                keywords: ['option two', 'second', 'purple unicorn'],
                weight: 3.5,
            },
            {
                label: 'Option 3',
                keywords: ['option three', 'third', 'green apple'],
                weight: 0.5,
            },
        ],
    },
    {
        id: 2,
        component: 'Question',
        answer: answerTypes.YESNO,
        title: 'Yes or no question?',
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
    {
        id: 3,
        component: 'Question',
        type: answerTypes.OPEN,
        title: 'Lorem ipsum dolor',
    },
    {
        id: 4,
        component: 'End',
        title: 'Lorem ipsum dolor',
    },
]

module.exports = {
    steps,
    answerTypes,
    getSystemMessage,
}