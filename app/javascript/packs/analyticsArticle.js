import initCharts from '../analytics/dashboard';

// Inititalizes charts for a dashboard article
function initDashboardArticle() {
  const article = document.getElementById('article');
  const { articleId, organizationId } = article.dataset;
  initCharts({ articleId, organizationId });
}

window.InstantClick.on('change', () => {
  initDashboardArticle();
});

initDashboardArticle();
