const axios = require("axios");
const lightspeedApi = "https://api.lightspeedapp.com/API";
import NodeCache from "node-cache";

const tokenCache = new NodeCache();
let token = null;

export default async function refreshToken() {
  const body = {
    grant_type: "refresh_token",
    client_id: process.env.LIGHTSPEED_ID,
    client_secret: process.env.LIGHTSPEED_SECRET,
    refresh_token: process.env.LIGHTSPEED_REFRESH_TOKEN,
  };

  const cachedToken = await tokenCache.get("tokenData");

  if (cachedToken != undefined && cachedToken.expires_in > 30) {
    token = cachedToken.access_token;
    return token;
  }

  if (cachedToken === undefined || cachedToken.expires_in < 30) {
    try {
      const response = await axios({
        url: "https://cloud.lightspeedapp.com/oauth/access_token.php",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(body),
      });

      const tokenData = await response.data;

      tokenCache.set("tokenData", tokenData, {
        checkperiod: tokenData.expires_in,
      });

      token = tokenData.access_token;

      return token;
    } catch (error) {
      if (error)
        console.error(
          "We have a problem! Could not get token.",
          error.response.data
        );
    }
  }
}
