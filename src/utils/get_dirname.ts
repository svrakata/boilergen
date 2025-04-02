import { dirname } from "path";
import { fileURLToPath } from "url";

const getDirname = (url: string) => {
    const __dirname = fileURLToPath(dirname(url));
    return __dirname;
};

export default getDirname;
