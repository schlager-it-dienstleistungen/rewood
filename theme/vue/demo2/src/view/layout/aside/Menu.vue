<template>
  <ul class="menu-nav">
    <li
      aria-haspopup="true"
      data-menu-toggle="hover"
      class="menu-item menu-item-open"
    >
      <a
        href="#/dashboard"
        class="menu-link router-link-exact-active router-link-active"
      >
        <i class="menu-icon flaticon2-architecture-and-city"></i>
        <span class="menu-text">Dashboard</span>
      </a>
    </li>

    <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
      <a href="#/builder" class="menu-link">
        <i class="menu-icon flaticon2-expand"></i>
        <span class="menu-text">Layout Builder</span>
      </a>
    </li>

    <li class="menu-section">
      <h4 class="menu-text">Components</h4>
      <i class="menu-icon flaticon-more-v2"></i>
    </li>

    <li
      aria-haspopup="true"
      data-menu-toggle="hover"
      class="menu-item menu-item-submenu"
    >
      <a
        href="#/dashboard"
        class="menu-link router-link-exact-active router-link-active menu-toggle"
      >
        <i class="menu-icon flaticon2-digital-marketing"></i>
        <span class="menu-text">Vue Bootstrap</span>
        <i class="menu-arrow"></i>
      </a>
      <div class="menu-submenu" kt-hidden-height="920">
        <span class="menu-arrow"></span>
        <ul class="menu-subnav">
          <li aria-haspopup="true" class="menu-item menu-item-parent">
            <span class="menu-link">
              <span class="menu-text">Vue Bootstrap</span>
            </span>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/alert" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Alert</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/badge" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Badge</span>
            </a>
          </li>
          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
          >
            <a
              href="#/dashboard"
              class="menu-link router-link-exact-active router-link-active menu-toggle"
            >
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Buttons</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu">
              <span class="menu-arrow"></span>
              <ul class="menu-subnav">
                <li aria-haspopup="true" class="menu-item menu-item-parent">
                  <span class="menu-link">
                    <span class="menu-text"></span>
                  </span>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/button" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Button</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/button-group" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Button Group</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/button-toolbar" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Button Toolbar</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/card" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Card</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/carousel" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Carousel</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/collapse" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Collapse</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/dropdown" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Dropdown</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/embed" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Embed</span>
            </a>
          </li>
          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
          >
            <a
              href="#/dashboard"
              class="menu-link router-link-exact-active router-link-active menu-toggle"
            >
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Form</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu">
              <span class="menu-arrow"></span>
              <ul class="menu-subnav">
                <li aria-haspopup="true" class="menu-item menu-item-parent">
                  <span class="menu-link">
                    <span class="menu-text"></span>
                  </span>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/form" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Form</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/form-checkbox" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Form Checkbox</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/form-file" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Form File</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/form-group" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Form Group</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/form-input" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Form Input</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/form-radio" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Form Radio</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/form-select" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Form Select</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/form-textarea" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Form Textarea</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/image" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Image</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/input-group" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Input Group</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/jumbotron" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Jumbotron</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/layout-grid-system" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Layout and Grid System</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/link" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Link</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/list-group" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">List group</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/media" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Media</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/modal" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Modal</span>
            </a>
          </li>
          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
          >
            <a
              href="#/dashboard"
              class="menu-link router-link-exact-active router-link-active menu-toggle"
            >
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Navigation</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu">
              <span class="menu-arrow"></span>
              <ul class="menu-subnav">
                <li aria-haspopup="true" class="menu-item menu-item-parent">
                  <span class="menu-link">
                    <span class="menu-text"></span>
                  </span>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/nav" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Nav</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/navbar" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Navbar</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
          >
            <a
              href="#/dashboard"
              class="menu-link router-link-exact-active router-link-active menu-toggle"
            >
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Pagination</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu">
              <span class="menu-arrow"></span>
              <ul class="menu-subnav">
                <li aria-haspopup="true" class="menu-item menu-item-parent">
                  <span class="menu-link">
                    <span class="menu-text"></span>
                  </span>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/pagination" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Pagination</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/pagination-nav" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Pagination Nav</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
          >
            <a
              href="#/dashboard"
              class="menu-link router-link-exact-active router-link-active menu-toggle"
            >
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Notify</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu">
              <span class="menu-arrow"></span>
              <ul class="menu-subnav">
                <li aria-haspopup="true" class="menu-item menu-item-parent">
                  <span class="menu-link">
                    <span class="menu-text"></span>
                  </span>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/popover" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Popover</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/toasts" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Toasts</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/tooltip" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Tooltip</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
          >
            <a
              href="#/dashboard"
              class="menu-link router-link-exact-active router-link-active menu-toggle"
            >
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Progress</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu">
              <span class="menu-arrow"></span>
              <ul class="menu-subnav">
                <li aria-haspopup="true" class="menu-item menu-item-parent">
                  <span class="menu-link">
                    <span class="menu-text"></span>
                  </span>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/progress" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Progress</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vue-bootstrap/spinner" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Spinner</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/table" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Table</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vue-bootstrap/tabs" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Tabs</span>
            </a>
          </li>
        </ul>
      </div>
    </li>

    <li
      aria-haspopup="true"
      data-menu-toggle="hover"
      class="menu-item menu-item-submenu"
    >
      <a
        href="#/dashboard"
        class="menu-link router-link-exact-active router-link-active menu-toggle"
      >
        <i class="menu-icon flaticon-web"></i>
        <span class="menu-text">Vuetify</span>
        <i class="menu-arrow"></i>
      </a>
      <div
        class="menu-submenu"
        kt-hidden-height="560"
        style="display: none; overflow: hidden;"
      >
        <span class="menu-arrow"></span>
        <ul class="menu-subnav">
          <li aria-haspopup="true" class="menu-item menu-item-parent">
            <span class="menu-link">
              <span class="menu-text">Vuetify</span>
            </span>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/alerts" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Alerts</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/avatars" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Avatars</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/badges" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Badges</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/buttons" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Buttons</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/calendars" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Calendars</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/cards" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Cards</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/chips" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Chips</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/dialog" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Dialog</span>
            </a>
          </li>
          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
          >
            <a
              href="#/dashboard"
              class="menu-link router-link-exact-active router-link-active menu-toggle"
            >
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Forms</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu">
              <span class="menu-arrow"></span>
              <ul class="menu-subnav">
                <li aria-haspopup="true" class="menu-item menu-item-parent">
                  <span class="menu-link">
                    <span class="menu-text"></span>
                  </span>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vuetify/autocompletes" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Autocompletes</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vuetify/file-inputs" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">File Inputs</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vuetify/forms" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Forms</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vuetify/selection-controls" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Selection Controls</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vuetify/selects" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Selects</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vuetify/textareas" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Textareas</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vuetify/text-fields" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Text Fields</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li
            aria-haspopup="true"
            data-menu-toggle="hover"
            class="menu-item menu-item-submenu"
          >
            <a
              href="#/dashboard"
              class="menu-link router-link-exact-active router-link-active menu-toggle"
            >
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Tables</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="menu-submenu">
              <span class="menu-arrow"></span>
              <ul class="menu-subnav">
                <li aria-haspopup="true" class="menu-item menu-item-parent">
                  <span class="menu-link">
                    <span class="menu-text"></span>
                  </span>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vuetify/simple-tables" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Simple Tables</span>
                  </a>
                </li>
                <li
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                  class="menu-item"
                >
                  <a href="#/vuetify/data-tables" class="menu-link">
                    <i class="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span class="menu-text">Data Tables</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/tabs" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Tabs</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/timelines" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Timelines</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/tooltips" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Tooltips</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/vuetify/treeview" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Treeview</span>
            </a>
          </li>
        </ul>
      </div>
    </li>

    <li class="menu-section">
      <h4 class="menu-text">Custom</h4>
      <i class="menu-icon flaticon-more-v2"></i>
    </li>

    <li
      aria-haspopup="true"
      data-menu-toggle="hover"
      class="menu-item menu-item-submenu"
    >
      <a
        href="#/dashboard"
        class="menu-link router-link-exact-active router-link-active menu-toggle"
      >
        <i class="menu-icon flaticon2-list-2"></i>
        <span class="menu-text">Error Pages</span>
        <i class="menu-arrow"></i>
      </a>
      <div class="menu-submenu">
        <span class="menu-arrow"></span>
        <ul class="menu-subnav">
          <li aria-haspopup="true" class="menu-item menu-item-parent">
            <span class="menu-link">
              <span class="menu-text">Error Pages</span>
            </span>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/error/error-1" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Error 1</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/error/error-2" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Error 2</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/error/error-3" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Error 3</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/error/error-4" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Error 4</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/error/error-5" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Error 5</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/error/error-6" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Error 6</span>
            </a>
          </li>
        </ul>
      </div>
    </li>

    <li
      aria-haspopup="true"
      data-menu-toggle="hover"
      class="menu-item menu-item-submenu"
    >
      <a
        href="#/dashboard"
        class="menu-link router-link-exact-active router-link-active menu-toggle"
        ><i class="menu-icon flaticon2-mail-1"></i>
        <span class="menu-text">Wizard</span>
        <i class="menu-arrow"></i>
      </a>
      <div class="menu-submenu">
        <span class="menu-arrow"></span>
        <ul class="menu-subnav">
          <li aria-haspopup="true" class="menu-item menu-item-parent">
            <span class="menu-link">
              <span class="menu-text">Wizard</span>
            </span>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/wizard/wizard-1" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Wizard 1</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/wizard/wizard-2" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Wizard 2</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/wizard/wizard-3" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Wizard 3</span>
            </a>
          </li>
          <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
            <a href="#/wizard/wizard-4" class="menu-link">
              <i class="menu-bullet menu-bullet-dot">
                <span></span>
              </i>
              <span class="menu-text">Wizard 4</span>
            </a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "KTMenu"
};
</script>
