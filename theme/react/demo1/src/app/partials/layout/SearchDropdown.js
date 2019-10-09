import React, { createRef } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import SearchResult from "./SearchResult";
import { toAbsoluteUrl } from "../../../_metronic";
import { Dropdown } from "react-bootstrap";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle";
import { ReactComponent as SearchIcon } from "../../../_metronic/layout/assets/layout-svg-icons/Search.svg";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

const fakeData = [
  {
    type: 0,
    text: "Documents"
  },
  {
    type: 1,
    text: "Annual finance report",
    iconClassName: "flaticon-interface-3 kt-font-warning"
  },
  {
    type: 1,
    text: "Company meeting schedule",
    iconClassName: "flaticon-share kt-font-success"
  },
  {
    type: 1,
    text: "Project quotations",
    iconClassName: "flaticon-paper-plane kt-font-info"
  },
  {
    icon: "",
    text: "Customers",
    type: 0
  },
  {
    type: 1,
    text: "Amanda Anderson",
    iconImage: toAbsoluteUrl("/media/users/user1.jpg")
  },
  {
    type: 1,
    text: "Kennedy Lloyd",
    iconImage: toAbsoluteUrl("/media/users/user2.jpg")
  },
  {
    type: 1,
    text: "Megan Weldon",
    iconImage: toAbsoluteUrl("/media/users/user3.jpg")
  },
  {
    type: 1,
    text: "Marc-André ter Stegen",
    iconImage: toAbsoluteUrl("/media/users/user4.jpg")
  },
  {
    type: 0,
    text: "Files"
  },
  {
    type: 1,
    text: "Revenue report",
    iconClassName: "flaticon-lifebuoy kt-font-warning"
  },
  {
    type: 1,
    text: "Anual finance report",
    iconClassName: "flaticon-coins kt-font-primary"
  },
  {
    type: 1,
    text: "Tax calculations",
    iconClassName: "flaticon-calendar kt-font-danger"
  }
];

export default class SearchDropdown extends React.Component {
  buttonRef = createRef();
  state = { loading: false, data: null, searchValue: "" };

  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  handleSearchChange = event => {
    this.setState({ data: null, searchValue: event.target.value });

    if (event.target.value.length > 2) {
      this.clearTimeout();

      this.setState({ loading: true });

      // simulate getting search result
      this.timeoutId = setTimeout(() => {
        this.setState({ data: fakeData, loading: false });
      }, 500);
    }
  };

  clear = () => {
    this.setState({ data: null, searchValue: "" });
  };

  componentWillUnmount() {
    this.clearTimeout();
  }

  render() {
    const { data, loading, searchValue } = this.state;
    const { useSVG, icon, iconType } = this.props;
    return (
      <Dropdown
        alignRight
        className="kt-header__topbar-item kt-header__topbar-item--search"
        drop="down"
        onToggle={() => {
          this.setState({
            data: null,
            loading: false,
            searchValue: ""
          });
        }}
      >
        <Dropdown.Toggle as={HeaderDropdownToggle} id="dropdown-toggle-search">
          <span
            className={clsx("kt-header__topbar-icon", {
              [`kt-header__topbar-icon--${iconType}`]: iconType
            })}
          >
            {!useSVG ? (
              <i className={icon} />
            ) : (
              <span className="kt-svg-icon">
                <SearchIcon />
              </span>
            )}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-lg">
          <div
            id="kt_quick_search_dropdown"
            className={clsx(
              "kt-quick-search kt-quick-search--dropdown kt-quick-search--result-compact",
              {
                "kt-quick-search--has-result": data && data.length
              }
            )}
          >
            <form className="kt-quick-search__form">
              <div
                className={clsx("input-group", {
                  "kt-spinner kt-spinner--input kt-spinner--sm kt-spinner--brand kt-spinner--right": loading
                })}
              >
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="flaticon2-search-1" />
                  </span>
                </div>

                <input
                  type="text"
                  autoFocus={true}
                  placeholder="Search..."
                  value={searchValue}
                  onChange={this.handleSearchChange}
                  className="form-control kt-quick-search__input"
                />

                <div className="input-group-append">
                  <span className="input-group-text">
                    <i
                      style={{ display: "flex" }}
                      onClick={this.clear}
                      hidden={!data || (data && !data.length)}
                      className="la la-close kt-quick-search__close"
                    />
                  </span>
                </div>
              </div>
            </form>
            <PerfectScrollbar
              className="kt-quick-search__wrapper kt-scroll"
              data-height="325"
              data-mobile-height="200"
              data-scroll="true"
              options={perfectScrollbarOptions}
              style={{ maxHeight: "40vh"}}
            >
              <SearchResult data={data} />
            </PerfectScrollbar>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
