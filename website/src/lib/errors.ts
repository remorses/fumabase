import { captureException, flush, init } from "sentries";

init({
  dsn: "https://a1e3b7db82f65c933f5bf718ba836c23@o4509638447005696.ingest.de.sentry.io/4509638450217040",

  integrations: [],
  tracesSampleRate: 0.01,
  profilesSampleRate: 0.01,
  beforeSend(event) {
    if (process.env.NODE_ENV === "development") {
      return null;
    }
    if (process.env.BYTECODE_RUN) {
      return null;
    }
    if (event?.["name"] === "AbortError") {
      return null;
    }

    return event;
  },
});

export async function notifyError(error: any, msg?: string) {

  console.error(msg || '"no notifyError message"', error?.stack || error);
  captureException(error, { extra: { msg } });
  await flush(1000);
}

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AppError";
  }
}
