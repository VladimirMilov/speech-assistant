const answerTypes = {
    OPEN: 'ANSWER_TYPE_OPEN',
    MULTI: 'ANSWER_TYPE_MULTI',
    RADIO: 'ANSWER_TYPE_RADIO',
    YESNO: 'ANSWER_TYPE_YESNO',
}

const steps = [
    {
        id: 0,
        component: 'Start',
        keywords: {
            'en-GB': ['start', 'begin'],
            'nl-NL': ['begin', 'beginnen'],
        },
    },
    {
        id: 1,
        component: 'Question',
        answer: answerTypes.RADIO,
        title: 'Multichoice question?',
        options: [
            {
                label: 'Option 1',
                keywords: ['one', '1'],
                weight: 2.5,
            },
            {
                label: 'Option 2',
                keywords: ['two', '2'],
                weight: 3.5,
            },
            {
                label: 'Option 3',
                keywords: ['three', '3'],
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
}