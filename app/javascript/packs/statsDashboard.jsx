import PropTypes from 'prop-types';

import { h, render } from 'preact';

const StatsDash = props => {
  const {
    visits,
    dailyVisits,
    dailyTime,
    articles,
    words,
    dailyArticles,
    dailyWords,
    comments,
  } = props;
  return (
    <section className="stats-info">
      <article>
        <p>Number of total visits to the site:</p>
        <span>{visits}</span>
      </article>
      <article>
        <p>Number of visits per day:</p>
        <span>{dailyVisits}</span>
      </article>
      <article>
        <p>Average active time on pages per day:</p>
        <span>{dailyTime}</span>
      </article>
      <article>
        <p>Total articles read:</p>
        <span>{articles}</span>
      </article>
      <article>
        <p>Total words read:</p>
        <span>{words}</span>
      </article>
      <article>
        <p>Average articles per day:</p>
        <span>{dailyArticles}</span>
      </article>
      <article>
        <p>Average words per day:</p>
        <span>{dailyWords}</span>
      </article>
      <article>
        <p>Number of comments:</p>
        <span>{comments}</span>
      </article>
    </section>
  );
};

const loadStatsDash = () => {
  const root = document.getElementById('stats-dash');
  render(<StatsDash {...root.dataset} />, root);
};

loadStatsDash();

StatsDash.propTypes = {
  visits: PropTypes.number.isRequired,
  dailyVisits: PropTypes.number.isRequired,
  dailyTime: PropTypes.number.isRequired,
  articles: PropTypes.number.isRequired,
  words: PropTypes.number.isRequired,
  dailyArticles: PropTypes.number.isRequired,
  dailyWords: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
};
