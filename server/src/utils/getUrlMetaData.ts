import urlMetadata from "url-metadata";
import { LinkMeta } from "../types";

const getUrlMetadata = (url: string): Promise<LinkMeta | null> => {
  return urlMetadata(url).then(
    (metadata) => {
      return {
        url: metadata.url,
        title: metadata.title,
        image: metadata.image,
        description: metadata.description,
      };
    },
    (err) => {
      console.log("Metadata err", err.message);
      return null;
    }
  );
};

export default getUrlMetadata;
