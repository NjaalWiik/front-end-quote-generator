const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const spinner = document.getElementById('spinner');

// Show spinner
const loading = () => {
  spinner.hidden = false;
  quoteContainer.hidden = true;
};

// Complete loading
const complete = () => {
  if (!spinner.hidden) {
    quoteContainer.hidden = false;
    spinner.hidden = true;
  }
};

// Get quote from API
const getQuote = async () => {
  loading();
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

    complete();
  } catch (error) {
    getQuote();
  }
};

// Tweet quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
};

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();
