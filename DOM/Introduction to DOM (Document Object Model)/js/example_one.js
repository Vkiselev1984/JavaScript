// Example № 1

document.addEventListener('DOMContentLoaded', function () {
    // We get a link to the first paragraph from a div with id "block"
    const firstParagraphInBlock = document.querySelector('#block p');
    console.log('First paragraph from a div with id "block":', firstParagraphInBlock);

    // We get a link to the first paragraph with the class "www"
    const firstParagraphWithClassWWW = document.querySelector('.www');
    console.log('First paragraph with the class "www":', firstParagraphWithClassWWW);
});


