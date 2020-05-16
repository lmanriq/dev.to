// <p>Number of total visits to the site: <span id="total-visits"></span></p>
// <p>Number of visits per day: <span id="daily-visits"></span></p>
// <p>Average active time on pages per day: <span id="avg-daily-time"></span></p>
// <p>Total articles read: <span id="total-articles"></span></p>
// <p>Total words read: <span id="total-words"></span></p>
// <p>Average articles & words per day: <span id="avg-daily-articles-words"></span></p>
// <p>Number of comments: <span id="total-comments"></span></p>

// const totalVisits = document
import PropTypes from 'prop-types';
// import { userPropTypes } from '../src/components/common-prop-types';

import { h, render } from 'preact';

const StatsDash = props => {
  const { visits } = props;
  return (
    <section className="stats-info">
      <article>
        <p>Number of total visits to the site:</p>
        <span>{visits}</span>
      </article>
      <article>
        <p>Number of visits per day:</p>
        <span>2</span>
      </article>
      <article>
        <p>Average active time on pages per day:</p>
        <span>4</span>
      </article>
      <article>
        <p>Total articles read:</p>
        <span>5</span>
      </article>
      <article>
        <p>Total words read:</p>
        <span>3</span>
      </article>
      <article>
        <p>Average articles & words per day:</p>
        <span>4</span>
      </article>
      <article>
        <p>Number of comments:</p>
        <span>3</span>
      </article>
    </section>
  );
};

const loadStatsDash = () => {
  const root = document.getElementById('stats-dash');
  render(<StatsDash visits={root.dataset.visits} />, root);
};

loadStatsDash();

StatsDash.propTypes = {
  visits: PropTypes.number.isRequired,
};
