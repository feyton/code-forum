import "dotenv/config";
const serverUrl = process.env.SERVER_URL || "http://127.0.0.1:3500";
const serverName = process.env.SERVER_NAME || "LOCAL HOST";
export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REDIT Clone",
      version: "1.0.0",
      description: "The Documentation for Redit Clone",
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
      contact: {
        name: "ALU Team",
        url: "https://us05web.zoom.us/j/6443492874?pwd=VWFPY1phVjJCWEd6N05FcmZVTDIxQT09",
      },
    },
    servers: [
      {
        url: serverUrl,
        description: serverName,
      },
    ],
  },
  apis: ["src/**/*.js"],
};

export const optionsToCustomizeSwagger = {
  customCssUrl: "/swagger.css",
  customSiteTitle: "ATLP DOCS",
  customfavIcon:
    "https://feyton.github.io/atpl_capstone_fabrice/assets/favicon.png",
};
