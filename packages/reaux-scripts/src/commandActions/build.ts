import buildClient from "./build-client";
import buildServer from "./build-server";

export default async () => {
    await Promise.all([buildClient(), buildServer()]);
};
