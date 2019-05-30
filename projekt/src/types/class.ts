import Horse from '@/types/horse';

interface Class {
    id: number;
    numer: number;
    kat: string;
    czempionat?: number;
    komisja: number[];
    zamknieta: boolean;
    horse?: Horse;
    horses?: Horse[];
}

export default Class;
