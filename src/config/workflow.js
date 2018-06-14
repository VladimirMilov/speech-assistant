export const questionTypes = {
    OPEN: 'QUESTION_TYPE_OPEN',
    MULTI: 'MULTI',
    RADIO: 'RADIO',
}

export const steps = [
    {
        id: 0,
        component: 'Start',

    },
    {
        id: 1,
        component: 'Question',
        type: questionTypes.OPEN,
        title: 'Lorem ipsum dolor',
        options: ['first', 'second', 'third']
    },
    {
        id: 2,
        component: 'Question',
        type: questionTypes.RADIO,
        title: 'Lorem ipsum dolor',
        options: ['first', 'second', 'third']
    },
    {
        id: 3,
        component: 'Result',
        title: 'Lorem ipsum dolor',
        ammount: 25730,
    },
]