const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const spinner = document.getElementById('spinner');

const showLoadingSpinner = () => {
  spinner.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  if (!spinner.hidden) {
    quoteContainer.hidden = false;
    spinner.hidden = true;
  }
};

// Get quote from API
const getQuote = async () => {
  showLoadingSpinner();

  const proxyUrl = 'https://powerful-brook-49363.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    data.quoteAuthor ? (authorText.innerText = data.quoteAuthor) : 'Unknown';

    data.quoteText.length > 120
      ? quoteText.classList.add('long-quote')
      : quoteText.classList.remove('long-quote');

    quoteText.innerText = data.quoteText;

    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
};

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
};

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();
