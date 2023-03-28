//get list, add item, remove
//импорт файла с данными
import users from '../data/users';
import { v4 as uuid } from 'uuid';

export default class DataRequest {
    static models = {
        users
    };

    static getData(modelName) {
        const data = localStorage.getItem([modelName]);
        return data ? JSON.parse(data) : DataRequest.models[modelName].map(item => (
                {...item, rowId: uuid()}
            )
        );
    }

    static saveData(modelName, data) {
        try {
            localStorage.setItem([modelName], JSON.stringify(data));
        } catch (error) {
            console.log(error.message);
        }
    }
}

// new DataRequest(users);