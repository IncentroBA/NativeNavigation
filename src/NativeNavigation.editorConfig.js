/**
 * @typedef Property
 * @type {object}
 * @property {string} key
 * @property {string} caption
 * @property {string} description
 * @property {string[]} objectHeaders
 * @property {ObjectProperties[]} objects
 * @property {Properties[]} properties
 */

/**
 * @typedef ObjectProperties
 * @type {object}
 * @property {PropertyGroup[]} properties
 * @property {string[]} captions
 */

/**
 * @typedef PropertyGroup
 * @type {object}
 * @property {string} caption
 * @property {PropertyGroup[]} propertyGroups
 * @property {Property[]} properties
 */

/**
 * @typedef Properties
 * @type {PropertyGroup}
 */

/**
 * @typedef Problem
 * @type {object}
 * @property {string} property
 * @property {("error" | "warning" | "deprecation")} severity
 * @property {string} message
 * @property {string} studioMessage
 * @property {string} url
 * @property {string} studioUrl
 */

/**
 * @param {object} values
 * @param {Properties} defaultProperties
 * @param {("web"|"desktop")} target
 * @returns {Properties}
 */
export function getProperties(values, defaultProperties, target) {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    /* Example
    if (values.myProperty === "custom") {
        delete defaultProperties.properties.myOtherProperty;
    }
    */
    return defaultProperties;
}

// /**
//  * @param {Object} values
//  * @returns {Problem[]} returns a list of problems.
//  */
// export function check(values) {
//    /** @type {Problem[]} */
//    const errors = [];
//    // Add errors to the above array to throw errors in Studio and Studio Pro.
//    /* Example
//    if (values.myProperty !== "custom") {
//        errors.push({
//            property: `myProperty`,
//            message: `The value of 'myProperty' is different of 'custom'.`,
//            url: "https://github.com/myrepo/mywidget"
//        });
//    }
//    */
//    return errors;
// }

// /**
//  * @param {object} values
//  * @param {boolean} isDarkMode
//  * @returns {object}
//  */
// export function getPreview(values, isDarkMode) {
//     // Customize your pluggable widget appearance for Studio Pro.
//     return {
//         type: "Container",
//         children: []
//     };
// }
export function getPreview(values) {
    const container = {
        type: "Container",
        children: [
            {
                type: "Text",
                fontSize: 10,
                content: "Native Navigation"
            },
            {
                type: "Container",
                padding: 4,
                children: []
            },
            {
                type: "RowLayout",
                columnSize: "grow",
                borders: true,
                children: []
            }
        ]
    };

    const mySvgImage = `<svg width="40" height="40"><circle fill="#FE5000" cx="20" cy="20" r="20"/></svg>`;

    for (const item of values.navList) {
        container.children[2].children.push({
            type: "Selectable",
            object: item,
            child: {
                type: "RowLayout",
                columnSize: "grow",
                borders: true,
                children: [
                    {
                        type: "Container",
                        backgroundColor: item.conditionalVisible ? "#aeedaa" : "transparent",
                        grow: 0,
                        padding: 2,
                        children: [
                            {
                                type: "Text",
                                content: item.conditionalVisible ? " " : null
                            }
                        ]
                    },
                    {
                        type: "Container",
                        grow: 1,
                        padding: 4,
                        children: [
                            {
                                type: "RowLayout",
                                columnSize: "grow",
                                children: [
                                    {
                                        type: "Container" // fills space on the left
                                    },
                                    {
                                        type: "Image",
                                        document: mySvgImage,
                                        property: item.icon,
                                        width: 24,
                                        height: 24
                                    },
                                    {
                                        type: "Container" // fills space on the left
                                    }
                                ]
                            },
                            {
                                type: "RowLayout",
                                columnSize: "grow",
                                children: [
                                    {
                                        type: "Container" // fills space on the left
                                    },
                                    {
                                        type: "Text",
                                        fontColor: "#000",
                                        content: item.caption,
                                        grow: 0
                                    },
                                    {
                                        type: "Container" // fills space on the left
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        });
    }
    return container;
}

// /**
//  * @param {Object} values
//  * @param {("web"|"desktop")} platform
//  * @returns {string}
//  */
// export function getCustomCaption(values, platform) {
//     return "NativeNavigation";
// }
