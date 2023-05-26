export const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`.${attr}`);
    return wrapper;
};

export const setValueToMockStore = (key, value) => {
    localStorage.setItem(key, value);
};
