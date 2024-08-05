export function getElementBySelector( selector ) {
    return document.querySelector( selector );
}

export function triggerEvent( element, type ) {
    const evt = new Event( type, { bubbles: true });
    element.dispatchEvent( evt );
}