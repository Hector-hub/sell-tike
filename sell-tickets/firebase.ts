import { getDatabase, ref, set} from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
   
const firebaseConfig = {
    apiKey: "AIzaSyBXSxANHdI0dVAKfKKreD1LKD7LxOhsDxE",
    authDomain: "sell-tike.firebaseapp.com",
    databaseURL: "https://sell-tike-default-rtdb.firebaseio.com",
    projectId: "sell-tike",
    storageBucket: "sell-tike.appspot.com",
    messagingSenderId: "416073735217",
    appId: "1:416073735217:web:0139ca46e908d828ec0910",
    measurementId: "G-5KQ34PH776"
  };

const app = initializeApp(firebaseConfig);
const database =getDatabase(app);
export const analytics = getAnalytics(app);

export default database;

