'use strict';

// When we are on the dashboards page, that page has this attribute: data-current-page="dashboards-show"

function getCurrentPage(classString) {
  return (
    document.querySelectorAll("[data-current-page='" + classString + "']")
      .length > 0
  );
}
