import { HttpClient } from "./httpClient.js";

// const UET_API = "http://uet-api.fundsflow.digital/pool_events";
export const getPoolEvents = async (poolIds) => {
  const events = await HttpClient.get(``)
    .then((res) => res.data)
    .catch((error) => {
      console.error(
        `Error in uetClient.getPoolEvents(): ${poolIds} `,
        error.message
      );
      return null;
    });

  console.log(events);
};
