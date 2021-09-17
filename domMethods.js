export const querySelectElement = (selector) => document.querySelector(selector)

export const createElement = (htmlString = "", className, id) => {
    const element = document.createElement(htmlString);

    (id) ? element.setAttribute("id", id) : null;

    (className) ? element.setAttribute("class", className) : null;

    return element;
}