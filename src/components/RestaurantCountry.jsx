import React from "react";
import { LANGUAGES, PAGE, isExistArrayAndNotEmpty } from "../utils";
import "./RestaurantCountry.scss";

function RestaurantCountry(props) {
  const { data, language, page } = props;
  const [listCountryLabel, setlistCountryLabel] = React.useState([]);

  React.useEffect(() => {
    let result = [];
    if (isExistArrayAndNotEmpty(data)) {
      data.map((item) => {
        if (language === LANGUAGES.VI) {
          result.push(item.countryData.valueVi);
          return result;
        }
        result.push(item.countryData.valueEn);
        return result;
      });
    }

    if (page === PAGE.HOMEPAGE) {
      setlistCountryLabel([...new Set(result)].slice(0, 2));
    } else {
      setlistCountryLabel([...new Set(result)]);
    }
  }, [data, language, page]);

  return (
    <>
      {listCountryLabel.map((item) => {
        return (
          <>
            {item}
            <span className="comma">,&nbsp;</span>
          </>
        );
      })}
    </>
  );
}

export default RestaurantCountry;
