// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import { getUrl } from "./utils";

export const SITE_TITLE = "Barry Portal";
export const SITE_DESCRIPTION = "Welcome to my website!";

export const DATE_DIVIDER = ".";

export const menuList = [
  {
    label: "Home",
    url: getUrl("/"),
  },
  {
    label: "Project",
    url: getUrl("/project"),
  },
  {
    label: "Snippet",
    url: getUrl("/snippet"),
  },
  {
    label: "Blog",
    url: getUrl("/blog"),
  },
];
