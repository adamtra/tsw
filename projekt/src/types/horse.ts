import Detail from '@/types/detail';
import Note from '@/types/note';

interface Horse {
    id: number;
    numer: number;
    nazwa: string;
    kraj: string;
    rocznik: number;
    masc: string;
    plec: string;
    hodowca: Detail;
    rodowod: {
        o: Detail;
        m: Detail;
        om: Detail;
    };
    wynik: {
        rozjemca?: number;
        suma?: number;
        ruchSuma?: number;
        typSuma?: number;
        noty: Note[];
        oceniono: boolean;
        draw?: boolean;
    };
    czempionat?: {
        id: number;
        wyniki: {
            zloto: number[];
            srebro: number[];
            braz: number[];
        }
        draw?: boolean;
    };
}

export default Horse;
