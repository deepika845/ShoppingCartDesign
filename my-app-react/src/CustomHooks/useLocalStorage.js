import { useState } from "react";

function useLocalStorage(initialItem, initialValue) {
    const [initialState, setState] = useState({ initialItem: initialValue });
    localStorage.setItem(initialItem, initialValue);
    function setLocalStorageState(param) {
        localStorage.getItem()
    }
}
