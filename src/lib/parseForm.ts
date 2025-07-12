import { IncomingMessage } from "http";
import { IncomingForm, Files, Fields } from "formidable";

export function parseForm(
  req: IncomingMessage,
): Promise<{ fields: Fields; files: Files }> {
  const form = new IncomingForm({
    keepExtensions: true,
    multiples: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
}
