export function makeObservable<T>(target: T) {
    let listeners: ((value: T) => void)[] = [];
    let value = target;

    function get() {
        return value;
    }

    function set(newValue: T) {
        if (value === newValue) return;
        value = newValue;
        listeners.forEach((l) => l(value));
    }

    function subscribe(listenerFunc: (value: T) => void) {
        listeners.push(listenerFunc);
        return () => unsubscribe(listenerFunc); // will be used inside React.useEffect
    }

    function unsubscribe(listenerFunc: (value: T) => void) {
        listeners = listeners.filter((l) => l !== listenerFunc);
    }

    return {
        get,
        set,
        subscribe,
    };
}
