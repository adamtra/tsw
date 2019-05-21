import Judge from '@/types/judge';
import Horse from '@/types/horse';
import Class from '@/types/class';

interface State {
    judges: Judge[];
    horses: Horse[];
    classes: Class[];
    token: string | null;
}
export default State;
