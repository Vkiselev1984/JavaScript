const divElement = document.querySelector('div')
console.log(divElement.childNodes.length)
console.log(divElement.children.length)

Array.from(divElement.childNodes).forEach((childNode) => {
    console.log('childNode "%s" of type "%d"', childNode.nodeName, childNode.nodeType)
})
console.log('end')

const allParagraphElements = divElement.querySelectorAll('p')
console.log('Static NodeList length up to: %d', allParagraphElements.length)
console.log('Dynamic NodeList length up to: %d', divElement.childNodes.length)
console.log('HTMLCollection length up to: %d', divElement.children.length)
const fourthParagraphElement = document.createElement('p')
fourthParagraphElement.textContent = 'Fourth paragraph'
divElement.appendChild(fourthParagraphElement)
console.log('Static NodeList length after: %d', allParagraphElements.length)
console.log('Dynamic NodeList length after: %d', divElement.childNodes.length)
console.log('HTMLCollection length after: %d', divElement.children.length)

