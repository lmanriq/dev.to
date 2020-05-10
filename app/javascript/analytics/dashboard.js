import { callHistoricalAPI, callReferrersAPI } from './client';

function resetActive(activeButton) {
  // Selects all of the time range buttons and removes the selected class
  const buttons = document.getElementsByClassName('timerange-button');
  for (let i = 0; i < buttons.length; i += 1) {
    const button = buttons[i];
    button.classList.remove('selected');
  }
  // Adds the selected class to the button being clicked on 
  activeButton.classList.add('selected');
}

// Returns the sum of whatever datapoint is being passed in 
function sumAnalytics(data, key) {
  return Object.entries(data).reduce((sum, day) => sum + day[1][key].total, 0);
}

// Displays a header and stat 
function cardHTML(stat, header) {
  return `
    <h4>${header}</h4>
    <div class="featured-stat">${stat}</div>
  `;
}

function writeCards(data, timeRangeLabel) {
  // Finds the sum analystics for page_views, reactions, comments, and follows
  const readers = sumAnalytics(data, 'page_views');
  const reactions = sumAnalytics(data, 'reactions');
  const comments = sumAnalytics(data, 'comments');
  const follows = sumAnalytics(data, 'follows');

  // Selects the HTML to be modified 
  const reactionCard = document.getElementById('reactions-card');
  const commentCard = document.getElementById('comments-card');
  const followerCard = document.getElementById('followers-card');
  const readerCard = document.getElementById('readers-card');

  //Changes the innerHTML of the cards to display the following headers and stats
  readerCard.innerHTML = cardHTML(readers, `Readers ${timeRangeLabel}`);
  commentCard.innerHTML = cardHTML(comments, `Comments ${timeRangeLabel}`);
  reactionCard.innerHTML = cardHTML(reactions, `Reactions ${timeRangeLabel}`);
  followerCard.innerHTML = cardHTML(follows, `Followers ${timeRangeLabel}`);
}


// Chart.js function 
function drawChart({ canvas, title, labels, datasets }) {
  const options = {
    legend: {
      position: 'bottom',
    },
    responsive: true,
    title: {
      display: true,
      text: title,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            precision: 0,
          },
        },
      ],
    },
  };

  import("chart.js").then(({ Chart }) => {
    // eslint-disable-next-line no-new
    new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets,
        options,
      },
    });
  });
}


function drawCharts(data, timeRangeLabel) {
  const labels = Object.keys(data);
  // Object.entries stringifies key value pairs
  // parsedData grabs whatever is at the second entry slot for each bit of data
  const parsedData = Object.entries(data).map(date => date[1]);
  // these variables are pulling out different values from that data
  const comments = parsedData.map(date => date.comments.total);
  const reactions = parsedData.map(date => date.reactions.total);
  const likes = parsedData.map(date => date.reactions.like);
  const readingList = parsedData.map(date => date.reactions.readinglist);
  const unicorns = parsedData.map(date => date.reactions.unicorn);
  const followers = parsedData.map(date => date.follows.total);
  const readers = parsedData.map(date => date.page_views.total);

  // Chart JS to fill out charts for the data extracted in the variables above 
  drawChart({
    canvas: document.getElementById('reactions-chart'),
    title: `Reactions ${timeRangeLabel}`,
    labels,
    datasets: [
      {
        label: 'Total',
        data: reactions,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        lineTension: 0.1,
      },
      {
        label: 'Likes',
        data: likes,
        fill: false,
        borderColor: 'rgb(229, 100, 100)',
        lineTension: 0.1,
      },
      {
        label: 'Unicorns',
        data: unicorns,
        fill: false,
        borderColor: 'rgb(157, 57, 233)',
        lineTension: 0.1,
      },
      {
        label: 'Bookmarks',
        data: readingList,
        fill: false,
        borderColor: 'rgb(10, 133, 255)',
        lineTension: 0.1,
      },
    ],
  });

  drawChart({
    canvas: document.getElementById('comments-chart'),
    title: `Comments ${timeRangeLabel}`,
    labels,
    datasets: [
      {
        label: 'Comments',
        data: comments,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        lineTension: 0.1,
      },
    ],
  });

  drawChart({
    canvas: document.getElementById('followers-chart'),
    title: `New Followers ${timeRangeLabel}`,
    labels,
    datasets: [
      {
        label: 'Followers',
        data: followers,
        fill: false,
        borderColor: 'rgb(10, 133, 255)',
        lineTension: 0.1,
      },
    ],
  });

  drawChart({
    canvas: document.getElementById('readers-chart'),
    title: `Reads ${timeRangeLabel}`,
    labels,
    datasets: [
      {
        label: 'Reads',
        data: readers,
        fill: false,
        borderColor: 'rgb(157, 57, 233)',
        lineTension: 0.1,
      },
    ],
  });
}

function renderReferrers(data) {
  // grabs the referrers container div
  const container = document.getElementById('referrers-container');
  // prints a table row with the referrer domain and count for each referrer object 
  const tableBody = data.domains
    .filter(referrer => referrer.domain)
    .map(referrer => {
      return `
      <tr>
        <td>${referrer.domain}</td>
        <td>${referrer.count}</td>
      </tr>
    `;
    });

  // add referrers with empty domains if present
  const emptyDomainReferrer = data.domains.filter(
    referrer => !referrer.domain,
  )[0];
  // If there are referrers with empty domains, it prints a table row stating how many miscellanious referrers there are 
  if (emptyDomainReferrer) {
    tableBody.push(`
      <tr>
        <td>All other external referrers</td>
        <td>${emptyDomainReferrer.count}</td>
      </tr>
    `);
  }

  container.innerHTML = tableBody.join('');
}

function callAnalyticsAPI(date, timeRangeLabel, { organizationId, articleId }) {
  // Makes an API call for the specified date to the user data
  callHistoricalAPI(date, { organizationId, articleId }, data => {
    writeCards(data, timeRangeLabel);
    drawCharts(data, timeRangeLabel);
  });

  // Makes an API call to get referrer data for a given date and renders it 
  callReferrersAPI(date, { organizationId, articleId }, data => {
    renderReferrers(data);
  });
}

// Shows data for the past week
function drawWeekCharts({ organizationId, articleId }) {
  resetActive(document.getElementById('week-button'));
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  callAnalyticsAPI(oneWeekAgo, 'this Week', { organizationId, articleId });
}

// Shows data for the past month
function drawMonthCharts({ organizationId, articleId }) {
  resetActive(document.getElementById('month-button'));
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  callAnalyticsAPI(oneMonthAgo, 'this Month', { organizationId, articleId });
}

// Shows data for all history
function drawInfinityCharts({ organizationId, articleId }) {
  resetActive(document.getElementById('infinity-button'));
  // April 1st is when the DEV analytics feature went into place
  const beginningOfTime = new Date('2019-4-1');
  callAnalyticsAPI(beginningOfTime, '', { organizationId, articleId });
}

// initializes the charts with the week, month, and infinity button options 
export default function initCharts({ organizationId, articleId }) {
  const weekButton = document.getElementById('week-button');
  weekButton.addEventListener(
    'click',
    drawWeekCharts.bind(null, { organizationId, articleId }),
  );

  const monthButton = document.getElementById('month-button');
  monthButton.addEventListener(
    'click',
    drawMonthCharts.bind(null, { organizationId, articleId }),
  );

  const infinityButton = document.getElementById('infinity-button');
  infinityButton.addEventListener(
    'click',
    drawInfinityCharts.bind(null, { organizationId, articleId }),
  );

  // draw week charts by default
  drawWeekCharts({ organizationId, articleId });
}
