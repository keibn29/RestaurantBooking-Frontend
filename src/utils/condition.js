import { LANGUAGES, USER_ROLE } from "./constant";

export const isExistArrayAndNotEmpty = (array) => {
  if (array && array.length > 0) {
    return true;
  }
  return false;
};

export const buildProvinceReactSelect = (listProvince, language) => {
  let newListProvince = [];
  if (isExistArrayAndNotEmpty(listProvince)) {
    listProvince.map((item) => {
      let obj = {
        label: language === LANGUAGES.VI ? item.valueVi : item.valueEn,
        value: item.keyMap,
      };

      newListProvince.push(obj);
      return newListProvince;
    });
  }

  return newListProvince;
};

export const buildRestaurantReactSelect = (
  listRestaurant,
  language,
  userInfo
) => {
  let newListRestaurant = [];
  if (!isExistArrayAndNotEmpty(listRestaurant)) {
    return newListRestaurant;
  }

  if (userInfo?.roleId === USER_ROLE.RESTAURANT_MANAGER) {
    const restaurantOfManager = listRestaurant.find(
      (item) => item.managerId === userInfo.id
    );
    newListRestaurant.push({
      label:
        language === LANGUAGES.VI
          ? restaurantOfManager.nameVi
          : restaurantOfManager.nameEn,
      value: restaurantOfManager.id,
    });

    return newListRestaurant;
  }

  listRestaurant.map((item) => {
    let obj = {
      label: language === LANGUAGES.VI ? item.nameVi : item.nameEn,
      value: item.id,
    };

    newListRestaurant.push(obj);
    return newListRestaurant;
  });

  return newListRestaurant;
};
