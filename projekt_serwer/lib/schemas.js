const judgeSchema = {
    id: '/Judge',
    type: 'object',
    properties: {
        id: { type: 'number' },
        sedzia: {type: 'string'},
        kraj: {type: 'string'},
    },
    required: ['sedzia', 'kraj'],
};

const classSchema = {
    id: '/Class',
    type: 'object',
    properties: {
        id: { type: 'number' },
        numer: {type: 'number'},
        kat: {type: 'string'},
        czempionat: {type: 'number'},
        komisja: {
            type: 'array',
            items: {type: 'number'},
        },
    },
    required: ['numer', 'kat', 'komisja'],
};

const horseSchema = {
    id: '/Horse',
    type: 'object',
    properties: {
        id: { type: 'number' },
        numer: {type: 'number'},
        nazwa: {type: 'string'},
        kraj: {type: 'string'},
        rocznik: {type: 'number'},
        masc: {type: 'string'},
        plec: {type: 'string'},
        hodowca: {'$ref': '/Detail'},
        rodowod: {
            type: 'object',
            properties: {
                o: {'$ref': '/Detail'},
                m: {'$ref': '/Detail'},
                om: {'$ref': '/Detail'},
            },
            required: ['o', 'm', 'om'],
        },
        wynik: {
            type: 'object',
            properties: {
                rozjemca: {type: 'number'},
                noty: {
                    type: 'array',
                    items: {'$ref': '/Note'},
                },
            },
            required: ['noty'],
        }
    },
    required: ['numer', 'nazwa', 'kraj', 'rocznik', 'masc', 'plec', 'hodowca', 'rodowod'],
};

const noteSchema = {
    id: '/Note',
    type: 'object',
    properties: {
        typ: { type: 'number'},
        glowa: { type: 'number'},
        kloda: { type: 'number'},
        nogi: { type: 'number'},
        ruch: { type: 'number'},
    },
    required: ['typ', 'glowa', 'kloda', 'nogi' , 'ruch'],
};

const detailSchema = {
    id: '/Detail',
    type: 'object',
    properties: {
        nazwa: { type: 'string'},
        kraj: { type: 'string'},
    },
    required: ['nazwa', 'kraj'],
};

const userSchema = {
    id: '/User',
    type: 'object',
    properties: {
        email: { type: 'string'},
        password: { type: 'string'},
    },
    required: ['email', 'password'],
};

module.exports = {
    judge: judgeSchema,
    class: classSchema,
    horse: horseSchema,
    detail: detailSchema,
    note: noteSchema,
    user: userSchema,
};
