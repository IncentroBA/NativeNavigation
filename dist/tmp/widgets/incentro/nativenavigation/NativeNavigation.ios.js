import { Dimensions, PixelRatio, SafeAreaView, Pressable, Image, Text } from 'react-native';
import { useState, useEffect, createElement } from 'react';
import Big from 'big.js';

const {
  height,
  width
} = Dimensions.get("window");
const pixelRatio = PixelRatio.get();
/**
 *
 * Adjust the font size based on the screen size
 *
 * @param   {number}    size   Font size
 *
 * @return  {number} Returns adjusted font size
 */
function adjustFont(size) {
  if (pixelRatio === 2) {
    // iphone 5s and older Androids
    if (width < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (height < 667) {
      return size;
    }
    // iphone 6-6s
    else if (height >= 667 && height <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (pixelRatio === 3) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (width <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (height < 667) {
      return size * 1.15;
    }
    // catch in-between size Androids and scale font up
    if (height >= 667 && height <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note
    return size * 1.27;
  }
  if (pixelRatio === 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (width <= 360) {
      return size;
    }
    // Catch other smaller android height sizings
    if (height < 667) {
      return size * 1.2;
    }
    // catch in-between size Androids and scale font up
    if (height >= 667 && height <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  // if older device ie pixelRatio !== 2 || 3 || 3.5
  return size;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var dist = {};

var common$2 = {};

Object.defineProperty(common$2, "__esModule", {
  value: true
});
common$2.ensure = void 0;
function ensure(arg) {
  if (arg == null) {
    throw new Error("Did not expect an argument to be undefined");
  }
  return arg;
}
common$2.ensure = ensure;

var common$1 = {};

Object.defineProperty(common$1, "__esModule", {
  value: true
});
common$1.extractStyles = common$1.mergeNativeStyles = void 0;
function mergeNativeStyles(defaultStyle, overrideStyles) {
  const styles = [defaultStyle, ...overrideStyles.filter(object => object !== undefined)];
  return Object.keys(defaultStyle).reduce((flattened, currentKey) => {
    const styleItems = styles.map(object => object[currentKey]);
    return Object.assign(Object.assign({}, flattened), {
      [currentKey]: flattenObjects(styleItems)
    });
  }, {});
}
common$1.mergeNativeStyles = mergeNativeStyles;
function flattenObjects(objects) {
  return objects.reduce((merged, object) => Object.assign(Object.assign({}, merged), object), {});
}
function extractStyles(source, extractionKeys) {
  if (!source) {
    return [{}, {}];
  }
  return Object.entries(source).reduce(([extracted, rest], [key, value]) => {
    if (extractionKeys.includes(key)) {
      extracted[key] = value;
    } else {
      rest[key] = value;
    }
    return [extracted, rest];
  }, [{}, {}]);
}
common$1.extractStyles = extractStyles;

var common = {};

Object.defineProperty(common, "__esModule", {
  value: true
});
common.parseInlineStyle = void 0;
function parseInlineStyle(style = "") {
  try {
    return style.split(";").reduce((styleObject, line) => {
      const pair = line.split(":");
      if (pair.length === 2) {
        const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
        styleObject[name] = pair[1].trim();
      }
      return styleObject;
    }, {});
  } catch (_) {
    return {};
  }
}
common.parseInlineStyle = parseInlineStyle;

var typings = {};

var PageEditor = {};

Object.defineProperty(PageEditor, "__esModule", {
  value: true
});

(function (exports) {

	var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  Object.defineProperty(o, k2, {
	    enumerable: true,
	    get: function () {
	      return m[k];
	    }
	  });
	} : function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  o[k2] = m[k];
	});
	var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
	  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__exportStar(PageEditor, exports);
} (typings));

var utils = {};

var PageEditorUtils = {};

Object.defineProperty(PageEditorUtils, "__esModule", {
  value: true
});
PageEditorUtils.moveProperty = PageEditorUtils.transformGroupsIntoTabs = PageEditorUtils.changePropertyIn = PageEditorUtils.hideNestedPropertiesIn = PageEditorUtils.hidePropertiesIn = PageEditorUtils.hidePropertyIn = void 0;
function hidePropertyIn(propertyGroups, _value, key, nestedPropIndex, nestedPropKey) {
  modifyProperty((_, index, container) => container.splice(index, 1), propertyGroups, key, nestedPropIndex, nestedPropKey);
}
PageEditorUtils.hidePropertyIn = hidePropertyIn;
function hidePropertiesIn(propertyGroups, _value, keys) {
  keys.forEach(key => modifyProperty((_, index, container) => container.splice(index, 1), propertyGroups, key, undefined, undefined));
}
PageEditorUtils.hidePropertiesIn = hidePropertiesIn;
function hideNestedPropertiesIn(propertyGroups, _value, key, nestedPropIndex, nestedPropKeys) {
  nestedPropKeys.forEach(nestedKey => hidePropertyIn(propertyGroups, _value, key, nestedPropIndex, nestedKey));
}
PageEditorUtils.hideNestedPropertiesIn = hideNestedPropertiesIn;
function changePropertyIn(propertyGroups, _value, modify, key, nestedPropIndex, nestedPropKey) {
  modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey);
}
PageEditorUtils.changePropertyIn = changePropertyIn;
function transformGroupsIntoTabs(properties) {
  const groups = [];
  properties.forEach(property => {
    if (property.propertyGroups) {
      groups.push(...property.propertyGroups);
      property.propertyGroups = [];
    }
  });
  properties.push(...groups);
}
PageEditorUtils.transformGroupsIntoTabs = transformGroupsIntoTabs;
function modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey) {
  propertyGroups.forEach(propGroup => {
    var _a;
    if (propGroup.propertyGroups) {
      modifyProperty(modify, propGroup.propertyGroups, key, nestedPropIndex, nestedPropKey);
    }
    (_a = propGroup.properties) === null || _a === void 0 ? void 0 : _a.forEach((prop, index, array) => {
      if (prop.key === key) {
        if (nestedPropIndex === undefined || nestedPropKey === undefined) {
          modify(prop, index, array);
        } else if (prop.objects) {
          modifyProperty(modify, prop.objects[nestedPropIndex].properties, nestedPropKey);
        } else if (prop.properties) {
          modifyProperty(modify, prop.properties[nestedPropIndex], nestedPropKey);
        }
      }
    });
  });
}
function moveProperty(fromIndex, toIndex, properties) {
  if (fromIndex >= 0 && toIndex >= 0 && fromIndex < properties.length && toIndex < properties.length && fromIndex !== toIndex) {
    properties.splice(toIndex, 0, ...properties.splice(fromIndex, 1));
  }
}
PageEditorUtils.moveProperty = moveProperty;

(function (exports) {

	var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  Object.defineProperty(o, k2, {
	    enumerable: true,
	    get: function () {
	      return m[k];
	    }
	  });
	} : function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  o[k2] = m[k];
	});
	var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
	  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__exportStar(PageEditorUtils, exports);
} (utils));

(function (exports) {

	var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  Object.defineProperty(o, k2, {
	    enumerable: true,
	    get: function () {
	      return m[k];
	    }
	  });
	} : function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  o[k2] = m[k];
	});
	var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
	  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__exportStar(common$2, exports);
	__exportStar(common$1, exports);
	__exportStar(common, exports);
	__exportStar(typings, exports);
	__exportStar(utils, exports);
} (dist));

const defaultStyle = {
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: "#a7a6a8"
  },
  button: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    paddingTop: 8,
    paddingBottom: 4,
    minWidth: 28,
    minHeight: 28
  },
  caption: {
    color: "#3a3a3a",
    fontSize: adjustFont(10),
    marginTop: 8
  },
  image: {
    tintColor: "#3a3a3a",
    height: 20,
    width: 20
  }
};
function NativeNavigation({
  colorSelected,
  navList,
  selectedItem,
  style
}) {
  const [currentItem, setCurrentItem] = useState(null);
  const styles = dist.mergeNativeStyles(defaultStyle, style);
  const [canRender, setCanRender] = useState(false);
  function selectedCaption(index) {
    return currentItem === index ? {
      color: colorSelected.value
    } : null;
  }
  function selectedImage(index) {
    return currentItem === index ? {
      tintColor: colorSelected.value
    } : null;
  }
  function onPress(index) {
    const action = navList[index].buttonAction;
    selectedItem.setValue(Big(index));
    setCurrentItem(index);
    if (action && action.canExecute) {
      action.execute();
    }
  }
  useEffect(() => {
    if (selectedItem && selectedItem.status === "available") {
      setCurrentItem(Number(selectedItem.value));
    }
    return () => {
      setCanRender(true);
    };
  }, [selectedItem]);
  if (canRender) {
    return createElement(SafeAreaView, {
      style: styles.container
    }, navList.map((listItem, index) => !listItem.conditionalVisible || listItem.conditionalVisible && listItem.conditionalVisible.value === true ? createElement(Pressable, {
      key: `${index}_${listItem.caption.value}`,
      style: styles.button,
      onPress: () => onPress(index)
    }, createElement(Image, {
      source: listItem.icon.value,
      style: [styles.image, selectedImage(index)]
    }), createElement(Text, {
      style: [styles.caption, selectedCaption(index)]
    }, listItem.caption.value)) : null));
  } else {
    return createElement(SafeAreaView, {
      style: styles.container
    }, createElement(Pressable, {
      style: styles.button
    }));
  }
}

export { NativeNavigation };
