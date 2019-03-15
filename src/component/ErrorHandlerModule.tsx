import {Exception, Model, APIException, ErrorListener} from "framework";
import {SagaIterator} from "redux-saga";

export default class ErrorHandlerModule extends Model<{}> implements ErrorListener {
    *onError(error: Exception): SagaIterator {
        if (error instanceof APIException) {
            if (error.statusCode === 404) {
                this.setHistory("/not-found");
            }
        }
    }
}
